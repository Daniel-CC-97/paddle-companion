import SignUpPage from "./signup/page";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/signup">Sign Up</Link>
      <Link href="/signin">Sign In</Link>
    </div>
  );
}
