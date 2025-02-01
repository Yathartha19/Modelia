"use client"

import * as React from "react"
import {
  Command,
  LifeBuoy,
  Send,
  SquareTerminal,
  FileText,
  MessageSquare,
  LogOut,
  Wrench,
  Logs,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { AlertDialog } from "./ui/alert-dialog"
import { AlertDialogDemo } from "./LogoutAlert"

const data = {
  user: {
    name: "Select a Model",
    email: "Powered by Ollama",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "New Chat",
      url: "#",
      icon: SquareTerminal,
    },
  ],
  navSecondary: [
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
    {
      title: "Download Models",
      url: "#",
      icon: LifeBuoy,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <div className="flex flex-row">

      <div className="w-[3.5rem] pt-[2.5rem] h-full bg-sidebar border-r border-[#1f2c41]">
        <div className="relative flex flex-col items-center justify-start gap-2 h-full">
          <FileText className="mb-4 hover:bg-accent p-[0.35rem] rounded-lg hover:cursor-pointer" size={35} />
          <MessageSquare className="hover:bg-accent p-[0.35rem] rounded-lg hover:cursor-pointer" size={35}/>
          <Wrench className="hover:bg-accent p-[0.35rem] rounded-lg hover:cursor-pointer" size={35}/>
          <SquareTerminal className="hover:bg-accent p-[0.35rem] rounded-lg hover:cursor-pointer" size={35}/>
          <Logs className="hover:bg-accent p-[0.35rem] rounded-lg hover:cursor-pointer" size={35}/>
            <AlertDialogDemo />
        </div>
      </div>

      <Sidebar
        className="ml-[3.5rem] top-[2rem] !h-[calc(100svh-2rem)]"
        {...props}
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Yathartha Aarush</span>
                    <span className="truncate text-xs">Student</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>

    </div>
  )
}
