import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { verifyToken } from '@/lib/jwt';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token');

        if (!token) {
            return new NextResponse('Token not found, unauthorized', { status: 401 });
        }

        const payload = verifyToken(token.value);

        if (!payload || !(payload as any).id) {
            return new NextResponse('Invalid or expired token', { status: 401 });
        }

        const { db } = await connectToDatabase();
        const user = await db.collection('users').findOne(
            { _id: new ObjectId((payload as any).id) },
            { projection: { password: 0, } }
        );

        if (!user) {
            return new NextResponse('User not found', { status: 404 });
        }

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = await request.json();

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(body)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

        if (!user?.pendingSubscription) {
            return NextResponse.json(
                { error: 'No pending subscription found' },
                { status: 400 }
            );
        }

        await db.collection('users').updateOne(
            { email: user.email },
            {
                $set: {
                    subscription: {
                        plan: user.pendingSubscription.plan,
                        status: 'active',
                        expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Paid expires in 1 year
                    },
                    subscriptionDetails: {
                        startDate: new Date(),
                        orderId: razorpay_order_id,
                        paymentId: razorpay_payment_id,
                    },
                },
                $unset: { pendingSubscription: '' },
            }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Payment verification error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}