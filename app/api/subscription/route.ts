import { NextResponse } from 'next/server';
import { razorpay } from '@/lib/razorpay';
import { verifyToken } from '@/lib/jwt';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
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
    { projection: { password: 0, } }
  );

  if (!user) {
    return new NextResponse('User not found', { status: 404 });
  }

  const { plan } = await request.json();

  const amount = plan === 'silver' ? 3000 : plan === 'gold' ? 9000 : 0;
  if (amount === 0) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
  }

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
    });

    await db.collection('users').updateOne(
      { email: user.email },
      {
        $set: {
          pendingSubscription: {
            plan,
            orderId: order.id,
            amount
          }
        }
      }
    );

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}



// import { NextResponse } from 'next/server';
// import { razorpay } from '@/lib/razorpay';
// import { verifyToken } from '@/lib/jwt';
// import { connectToDatabase } from '@/lib/mongodb';
// import { ObjectId } from 'mongodb';
// import { cookies } from 'next/headers';

// export async function POST(request: Request) {
//   const cookieStore = cookies();
//   const token = cookieStore.get('auth-token');

//   if (!token) {
//     return new NextResponse('Token not found, unauthorized', { status: 401 });
//   }

//   const payload = verifyToken(token.value);

//   if (!payload || !(payload as any).id) {
//     return new NextResponse('Invalid or expired token', { status: 401 });
//   }

//   const { db } = await connectToDatabase();
//   const user = await db.collection('users').findOne(
//     { _id: new ObjectId((payload as any).id) },
//     { projection: { password: 0, } }
//   );

//   if (!user) {
//     return new NextResponse('User not found', { status: 404 });
//   }

//   const { plan } = await request.json();

//   const validPlans = ['gold', 'silver', 'free'];
//   if (!validPlans.includes(plan)) {
//     return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
//   }

//   const currentPlan = user.subscription?.plan || 'free';
//   const currentExpiry = user.subscription?.expiresAt || null;

//   const now = new Date();
//   let amount = 0;
//   let newExpiryDate = new Date();

//   if (plan === 'gold') {
//     amount = 30000;

//     if (currentPlan === 'silver' && currentExpiry) {
//       const remainingTime = Math.max(0, new Date(currentExpiry).getTime() - now.getTime());
//       const remainingMonths = Math.ceil(remainingTime / (1000 * 60 * 60 * 24 * 30));
//       amount -= Math.floor((remainingMonths * 4000) / 12); // Prorated discount
//     }
//     amount = Math.max(0, amount);
//     newExpiryDate.setFullYear(now.getFullYear() + 1);
//   } else if (plan === 'silver') {
//     amount = 4000;

//     if (currentPlan === 'gold' && currentExpiry) {
//       amount = 0;
//       const remainingTime = Math.max(0, new Date(currentExpiry).getTime() - now.getTime());
//       const remainingMonths = Math.ceil(remainingTime / (1000 * 60 * 60 * 24 * 30));
//       newExpiryDate.setMonth(now.getMonth() + remainingMonths);
//     } else {
//       newExpiryDate.setFullYear(now.getFullYear() + 1);
//     }
//   } else if (plan === 'free') {
//     return NextResponse.json(
//       { warning: 'Switching to free will cancel your current subscription.' },
//       { status: 422 }
//     );
//   } else {
//     return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
//   }

//   try {
//     if (amount > 0) {
//       const order = await razorpay.orders.create({
//         amount: amount * 100, // Amount in paise
//         currency: 'INR',
//         receipt: `order_${Date.now()}`,
//       });

//       await db.collection('users').updateOne(
//         { email: user.email },
//         {
//           $set: {
//             pendingSubscription: {
//               plan,
//               orderId: order.id,
//               amount,
//             },
//           },
//         }
//       );

//       return NextResponse.json({
//         orderId: order.id,
//         amount: order.amount,
//         currency: order.currency,
//       });
//     } else {
//       // Directly update subscription for free or silver plans
//       await db.collection('users').updateOne(
//         { email: user.email },
//         {
//           $set: {
//             subscription: {
//               plan,
//               expiresAt: newExpiryDate.toISOString(),
//             },
//           },
//           $unset: { pendingSubscription: '' },
//         }
//       );

//       return NextResponse.json({
//         message: `Subscription updated to ${plan} plan.`,
//         plan,
//         expiresAt: newExpiryDate.toISOString(),
//       });
//     }
//   } catch (error) {
//     console.error('Error processing subscription:', {
//       email: user.email,
//       plan,
//       error,
//     });
//     return NextResponse.json({ error: 'Failed to process subscription' }, { status: 500 });
//   }
// }