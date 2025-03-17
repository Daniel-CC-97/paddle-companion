"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin"); // Redirect if no token
    } else {
      setAuthenticated(true);
    }
  }, [router]);

  return authenticated;
}
