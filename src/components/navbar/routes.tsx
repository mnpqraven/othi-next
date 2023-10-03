import { Home, Newspaper } from "lucide-react";
import { ReactNode } from "react";

export interface NavbarItem {
  label?: string;
  path: string;
  icon?: ReactNode;
}

export const routes: NavbarItem[] = [
  { label: "Home", path: "/", icon: <Home /> },
  { label: "Blog", path: "/blog", icon: <Newspaper /> },
];
