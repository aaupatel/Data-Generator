import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const cookieStore = cookies();
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
            { projection: { password: 0 } }
        );

        if (!user) {
            return new NextResponse('User not found', { status: 404 });
        }

        const { newPlan } = await request.json();

        const allowedPlans = ['silver', 'gold', 'free'];

        if (!allowedPlans.includes(newPlan)) {
            return new NextResponse('Invalid plan selected', { status: 400 });
        }

        if (!user.subscription) {
            return NextResponse.json({ error: "User has no existing subscription" }, { status: 400 });
        }

        try {
            await db.collection('users').updateOne(
                { _id: user._id },
                {
                    $set: {
                        subscription: {
                            plan: newPlan,
                            status: 'active',
                            expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                        },
                    },
                }
            );

            return NextResponse.json({ message: `Subscription updated to ${newPlan} plan successfully` });
        } catch (error) {
            console.error('Error updating subscription:', error);
            return new NextResponse('Failed to update subscription', { status: 500 });
        }
    } catch (error) {
        console.error('Error in update subscription route:', error);
        return new NextResponse('Internal server error', { status: 500 });
    }
}