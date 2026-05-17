
"use client";

import { SessionProvider } from "next-auth/react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardSideBar from "./_components/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <DashboardSideBar/>
      </TooltipProvider>
      <div className="flex bg-black">
        <SidebarTrigger className="text-white" />
      </div>
      <main className="bg-black flex-1">
        <SessionProvider>
          {children}
        </SessionProvider>
      </main>
    </SidebarProvider>
  );
}