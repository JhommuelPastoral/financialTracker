"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Bell } from "lucide-react";
function normalizePathName(pathname: string): string {
  const path = pathname.split("/").filter(Boolean).slice(-1)[0] || "";
  if (path.length === 0) return "Dashboard";
  return path[0].toUpperCase() + path.slice(1);
}

export default function Header() {
  const pathName = usePathname();
  const {data: session} = useSession();
  if(!session){
    return (
      <header className="text-white w-full flex items-center justify-between px-2">
        <h1 className="text-xl font-bold">{normalizePathName(pathName)}</h1>
        <div>
          <p>Failed To load session</p>
        </div>
      </header>
    );
  }
  return (
    <header className="text-white w-full flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold"> {normalizePathName(pathName)}</h1>
        <p className="text-muted-foreground text-sm">Welcome back, {session.user.name} 👋</p>
      </div>
    </header>

  );
}