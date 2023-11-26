import Link from "next/link";

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Link href="/user/auth/login" className="text-red-600">Sign In</Link>
      </main>
  )
}
