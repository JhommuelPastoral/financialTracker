"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

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
  SidebarFooter
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  BookOpen,
  ChartNoAxesColumn,
  LayoutDashboard,
  Settings,
  LogOut,
  Wallet,
  Goal,
  ChartArea,
  IdCard,
  ChartBarStacked,
  Bell
} from "lucide-react";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";


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
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Budget",
    url: "/dashboard/budget",
    icon: Wallet,
  },
  {
    title: "Goals",
    url: "/dashboard/goals",
    icon: Goal,
  },
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: ChartArea,
  },
  {
    title: "Accounts",
    url: "/dashboard/accounts",
    icon: IdCard,
  },
  {
    title: "Categories",
    url: "/dashboard/categories",
    icon: ChartBarStacked,
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
  const { data: session } = useSession();
  return (
    <>
      <Sidebar {...props} collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center justify-center gap-2">
            <ChartNoAxesColumn size={24} color="#9F2D00" />
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
              <SidebarMenu>
                <SidebarMenuItem>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <SidebarMenuButton tooltip="Logout" className="cursor-pointer">
                        <LogOut size={16} />
                        <span>Logout</span>
                      </SidebarMenuButton>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="bg-[#1D1816] rounded-[10px]">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You will be signed out of your account.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel className="">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => signOut()}>
                          Logout
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className={`px-2 pb-3 gap-2 flex`}>
          <SidebarMenu className={`${open ? "block" : "hidden"} relative overflow-hidden rounded-[10px] bg-gradient-to-br from-[#9F2D00] to-[#7A2100] p-4 shadow-lg`}>
            {/* Content */}
            <div className="relative flex flex-col gap-3">
              <div className="absolute -bottom-8 -right-8 h-10 w-10 rounded-full bg-white opacity-80 blur-sm" />
              <p className="text-[10px] font-semibold tracking-widest text-white/80">
                ZENTRA
              </p>

              <div>
                <p className="text-sm font-semibold text-white leading-tight">
                  Fast Payments
                </p>
                <p className="text-sm font-semibold text-white leading-tight">
                  for Smarter Finance
                </p>
              </div>

              {/* Short app description */}
              <p className="text-[10px] text-white/70 leading-relaxed">
                Zentra helps you track expenses, manage payments, and gain better control over your finances in one simple dashboard.
              </p>
            </div>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-3">
              <Tooltip>
                <TooltipTrigger>
                  <Avatar>
                    <AvatarImage src={session?.user?.image || ""} alt="Profile" />
                    <AvatarFallback className="bg-[#9F2D00] text-white text-sm font-bold">{session?.user?.name?.[0] || ""}</AvatarFallback>
                    <AvatarBadge />
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="right" className={`${open ? "hidden" : "block"}`}>
                  <p>{session?.user?.name}</p>
                  <p className="text-muted-foreground">{session?.user?.role}</p>
                </TooltipContent>
              </Tooltip>
              <div className={`${open ? "block" : "hidden"} text-xs gap-1`}>
                <p>{session?.user?.name}</p>
                <p className="text-muted-foreground">{session?.user?.role}</p>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        {/* <SidebarRail /> */}
      </Sidebar>
    </>
  );
}