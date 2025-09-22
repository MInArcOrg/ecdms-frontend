import { ReactNode, ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "src/hooks/useAuth";

interface GuestGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const GuestGuard = ({ children, fallback }: GuestGuardProps) => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    // If user is authenticated, redirect to dashboard (or home)
    if (auth.user && window.localStorage.getItem("userData")) {
      router.replace("/");
    }
  }, [auth.user, router]);

  if (auth.loading) {
    return fallback;
  }

  // Only render children if user is NOT authenticated
  if (!auth.user) {
    return <>{children}</>;
  }

  // Optionally, render nothing or a spinner while redirecting
  return null;
};

export default GuestGuard;
