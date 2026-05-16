import * as React from "react"

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
} from "@/components/ui/sidebar"
import { ChartNoAxesColumn } from "lucide-react"
import {
  LayoutDashboard,
  Settings,
  BookOpen,
} from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "#",
          icon: LayoutDashboard,
          isActive: true,
        },
        {
          title: "Transactions",
          url: "#",
          icon: BookOpen,
          isActive: false,
        },
        {
          title: "Settings",
          url: "#",
          icon: Settings,
          isActive: false,
        },
      ],
    },
  ],
}

export default function DashboardSideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {open} = useSidebar();
  return (
    <Sidebar {...props} collapsible="icon">
      <SidebarHeader >
        <div className="flex w-full items-center gap-2 justify-center">
          <ChartNoAxesColumn size={20}/>
          <p className= {open ? "block" : "hidden"}>Zentra</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive} tooltip={item.title} >
                      <a href={item.url} className="flex items-center gap-2">
                        <item.icon size={16} />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
