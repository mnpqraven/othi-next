"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { routes, usePathCompare } from "./routes";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { status } = useSession();
  const { isSamePath } = usePathCompare();
  const defaultLinkClass =
    "flex items-center gap-1 space-x-1 text-sm font-medium transition-colors hover:text-primary";

  const pathnameClass = (path: string) =>
    cn(defaultLinkClass, isSamePath(path) ? "" : "text-muted-foreground");

  return (
    <div className="sticky top-0 z-50 flex h-12 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        {routes.map(({ icon, label, path }) => (
          <Link href={path} key={path} className={pathnameClass(path)}>
            {icon}
            {label}
          </Link>
        ))}
      </div>

      {status == "authenticated" && (
        <button onClick={() => signOut()}>sign out</button>
      )}
      {status == "unauthenticated" && (
        <button onClick={() => signIn("github")}>sign in</button>
      )}
    </div>
  );
}
