import { AuthForm } from "@/components/auth/auth-form";

export default function Login() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center px-6">
      <AuthForm type="login" />
    </div>
  );
}
