"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  BookOpen,
  ChartNoAxesColumn,
  LayoutDashboard,
  Settings,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    url: "/dashboard/transactions",
    icon: BookOpen,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardSideBar(props: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  const pathname = usePathname();
  return (
    <Sidebar {...props} collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-center gap-2">
          <ChartNoAxesColumn size={20} />
          {open && (
            <p className="font-bold text-white">
              Zentra
            </p>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white">
            Overview
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                  >
                    <Link
                      href={item.url}
                      className="flex items-center gap-2"
                    >
                      <item.icon size={16} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}