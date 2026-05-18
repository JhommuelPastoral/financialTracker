"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
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
          []
        </div>
      </header>
    );
  }
  return (
    <header className="text-white w-full flex items-center justify-between">
      <h1 className="text-xl font-bold">{normalizePathName(pathName)}</h1>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={session?.user?.image || ""} alt="Profile" />
          <AvatarFallback className="bg-[#9F2D00] text-white text-sm font-bold">{session?.user?.name?.[0] || ""}</AvatarFallback>
          <AvatarBadge />
        </Avatar>
        <div className="text-sm">
          <p>{session?.user?.name}</p>
          <p className="text-muted-foreground">asd</p>
        </div>
      </div>
    </header>

  );
}