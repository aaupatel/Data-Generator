"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for trying out our service",
    features: [
      "Limited to 2,000 rows per file",
      "Multiple international languages",
      "Multiple output formats",
      "No daily limit on downloads",
    ],
    highlight: false,
  },
  {
    name: "Silver",
    price: "₹2,000/year",
    description: "Great for regular users",
    features: [
      "Up to 300,000 rows per file",
      "Multiple international languages",
      "Multiple output formats",
      "No daily limit on downloads",
      "Generate 1M records/day",
    ],
    highlight: true,
  },
  {
    name: "Gold",
    price: "₹9,000/year",
    description: "For power users",
    features: [
      "Up to 8M rows per file",
      "Multiple international languages",
      "Multiple output formats",
      "No daily limit on downloads",
      "Unlimited daily records",
    ],
    highlight: false,
  },
];

export default function SubscriptionPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, update } = useSession();

  const handleSubscribe = async (planName: string) => {
    if (planName.toLowerCase() === "free") return;

    setLoading(true);
    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planName.toLowerCase() }),
      });

      if (!res.ok) throw new Error("Failed to create order");

      const { orderId, amount, currency } = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "Data Generator",
        description: `${planName} Plan Subscription`,
        order_id: orderId,
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch("/api/subscription/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (!verifyRes.ok) throw new Error("Payment verification failed");

            await update(); // Update session with new subscription status
            toast.success("Subscription activated successfully!");
            router.refresh();
          } catch (error) {
            toast.error("Failed to verify payment");
          }
        },
        prefill: {
          name: session?.user?.name,
          email: session?.user?.email,
        },
        theme: {
          color: "#0066FF",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error("Failed to process subscription");
    } finally {
      setLoading(false);
    }
  };

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please sign in to manage your subscription.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => router.push("/auth/signin")}
              className="w-full"
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Subscription Plans
          </h2>
          <p className="text-muted-foreground">
            Choose the plan that best fits your needs
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`${plan.highlight ? "border-primary" : ""}`}
            >
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold">{plan.price}</div>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                {(session.user as any).subscription ===
                plan.name.toLowerCase() ? (
                  <Button className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => handleSubscribe(plan.name)}
                    disabled={loading}
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {plan.name === "Free" ? "Current Plan" : "Subscribe"}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
