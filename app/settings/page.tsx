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
import Navbar from "@/components/Navbar";
import Login from "../auth/login/page";
import { plans } from "@/lib/plans-data/subscription-plans";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function SubscriptionPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        toast.error("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSubscription = async (planName: string) => {
    if (!user) return;

    if (planName.toLowerCase() === user.subscription.plan) {
      toast.error("You are already subscribed to this plan.");
      return;
    }

    if (
      planName.toLowerCase() === "free" &&
      user.subscription.plan !== "free"
    ) {
      if (
        !window.confirm(
          "Are you sure you want to downgrade to the Free plan? This may affect your existing benefits."
        )
      ) {
        return;
      }
    }

    setLoading(true);
    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planName.toLowerCase() }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create subscription.");
      }

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

            if (!verifyRes.ok) {
              throw new Error("Payment verification failed.");
            }

            setUser({
              ...user,
              subscription: { plan: planName.toLowerCase(), status: "active" },
            });

            toast.success("Subscription updated successfully!");
          } catch (error) {
            console.error("Error verifying payment:", error);
            toast.error("Failed to verify payment.");
          }
        },
        prefill: {
          name: user?.name || "User",
          email: user?.email || "",
        },
        theme: { color: "#0066FF" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      console.error("Error during subscription:", error);
      toast.error(error.message || "Failed to process subscription.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!user) return <Login />;
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <Navbar />
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : !user ? (
        <Login />
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Subscription Plans</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={plan.highlight ? "border-primary" : ""}
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
                  <Button
                    onClick={() => handleSubscription(plan.name)}
                    disabled={loading}
                  >
                    {loading && <Loader2 className="animate-spin h-4 w-4" />}
                    {user.subscription.plan === plan.name.toLowerCase()
                      ? "Current Plan"
                      : `Subscribe`}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-sm text-center">
            By subscribing, you agree to our{" "}
            <a href="/privacy" className="text-primary underline">
              Privacy Policy
            </a>
            .
          </div>
        </div>
      )}
    </div>
  );
}
