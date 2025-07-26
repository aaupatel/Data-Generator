"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Database,
  Sparkles,
  User,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

type UserType = {
  name: string;
  email: string;
  subscription: any;
} | null;

function GuestUser() {
  return (
    <>
      <Link href="/auth/login">
        <Button>Log In</Button>
      </Link>
      <Link href="/auth/register">
        <Button>Register</Button>
      </Link>
    </>
  );
}

export default function Navbar() {
  const [user, setUser] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        toast.success("Logged out successfully");
        localStorage.removeItem("data_generator_trial");
        document.cookie =
          "data_generator_trial=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie =
          "auth-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        window.location.href = "/auth/login";
      } else {
        throw new Error("Logout failed.");
      }
    } catch (error:any) {
      console.error(error);
      toast.error(error.message || "An unexpected error occurred.");
    }
  };

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="flex items-center justify-between bg-white/50 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xs md:text-sm text-blue-700 font-medium">
            <Database className="h-3.5 w-3.5" aria-label="Database Icon" />
            <span>Enterprise Data Generator</span>
            <Sparkles className="h-3.5 w-3.5" aria-label="Sparkles Icon" />
          </div>
          <h1 className="text-xs md:text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Database Data Generator
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex space-x-4 ml-6">
          <Link href="/" className="text-sm hover:text-blue-600">
            Home
          </Link>
          <Link href="/about" className="text-sm hover:text-blue-600">
            About
          </Link>
          <Link href="/privacy" className="text-sm hover:text-blue-600">
            Privacy Policy
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {loading ? (
            <span>Loading...</span>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-xs text-gray-800">Subscription</h3>
                  <p className="capitalize">
                    {user.subscription.plan || "Free"}
                  </p>
                </div>
              </DropdownMenuTrigger>
            </DropdownMenu>
          ) : (
            <h1>Guest User</h1>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {loading ? (
            <span>Loading...</span>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex flex-col items-center justify-center">
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/default-avatar.png" alt={user.name} />
                      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                  <h6 className="text-xs text-gray-800">{user.name}</h6>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    {/* <User className="mr-2 h-4 w-4" /> */}
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    {/* <Settings className="mr-2 h-4 w-4" /> */}
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/help" className="cursor-pointer">
                    {/* <HelpCircle className="mr-2 h-4 w-4" /> */}
                    Help
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <GuestUser />
          )}
        </div>
      </div>
    </div>
  );
}
