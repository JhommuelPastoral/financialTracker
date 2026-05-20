

import { SessionProvider } from "next-auth/react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardSideBar from "./_components/sidebar";
import Header from "./_components/header";
import { TooltipProvider } from "@/components/ui/tooltip";
export default function Layout({children}: {children: React.ReactNode}) {

  return (
    <SidebarProvider>
      <SessionProvider>
        <TooltipProvider>
          <DashboardSideBar/>
        </TooltipProvider>
        <div className="flex bg-black">
          <SidebarTrigger className="text-white" />
        </div>
        <main className="bg-black flex-1 p-2 ">
          <div className="animate-slide-up">
            <Header />
            {children}
          </div>
        </main>
      </SessionProvider>
    </SidebarProvider>
  );
}