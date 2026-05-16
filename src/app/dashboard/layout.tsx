
"use client";

import { SessionProvider } from "next-auth/react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardSideBar from "./_components/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <DashboardSideBar />
      </TooltipProvider>
      <SidebarTrigger />
      <main>
        <SessionProvider>
          {children}
        </SessionProvider>
      </main>
    </SidebarProvider>
  );
}