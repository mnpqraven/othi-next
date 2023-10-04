import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <main className="container mt-4">{children}</main>;
}
