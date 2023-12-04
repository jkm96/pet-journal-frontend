import Link from "next/link";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Link href={NAVIGATION_LINKS.LOGIN} className="text-red-600">Sign In</Link>
      </main>
  )
}
