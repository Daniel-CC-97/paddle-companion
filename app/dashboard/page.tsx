"use client";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const authenticated = useAuth();

  if (!authenticated) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome to your Dashboard!</h1>
    </div>
  );
}
