"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function VerifyEmail() {
  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setVerificationStatus("error");
        return;
      }

      try {
        const response = await fetch(`/api/auth/verify?token=${token}`);
        if (response.ok) {
          setVerificationStatus("success");
        } else {
          setVerificationStatus("error");
        }
      } catch (error) {
        setVerificationStatus("error");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center space-y-4">
          {verificationStatus === "loading" && (
            <>
              <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
              <h2 className="text-2xl font-semibold">
                Verifying your email...
              </h2>
              <p className="text-gray-500 text-center">
                Please wait while we verify your email address.
              </p>
            </>
          )}

          {verificationStatus === "success" && (
            <>
              <CheckCircle2 className="h-12 w-12 text-green-500" />
              <h2 className="text-2xl font-semibold">Email Verified!</h2>
              <p className="text-gray-500 text-center">
                Your email has been successfully verified. You can now log In
                to your account.
              </p>
              <Button
                onClick={() => router.push("/auth/login")}
                className="w-full"
              >
                Log In
              </Button>
            </>
          )}

          {verificationStatus === "error" && (
            <>
              <XCircle className="h-12 w-12 text-red-500" />
              <h2 className="text-2xl font-semibold">Verification Failed</h2>
              <p className="text-gray-500 text-center">
                The verification link is invalid or has expired. Please try
                signing up again or contact support.
              </p>
              <Button
                onClick={() => router.push("/auth/register")}
                className="w-full"
              >
                Back to Register
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
