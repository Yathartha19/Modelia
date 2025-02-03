"use client"

import { useState } from "react"
import useSidebarStates from "../app/store/store";

import * as React from "react"
import {
  Command,
  LifeBuoy,
  Send,
  SquareTerminal,
  FileText,
  MessageSquare,
  Download,
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
import { AlertDialogDemo } from "./LogoutAlert"

const data = {
  user: {
    name: "Select a Model",
    email: "Powered by Ollama",
    avatar: "/avatars/shadcn.jpg",
  },
  chat: [
    {
      title: "New Chat",
      url: "#",
      icon: SquareTerminal,
    },
  ],
  params: [
    {
      title: "Temperature",
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

  const { chat, setChat, setChatBox, parameters, setParameters, setDownload, setConsole, setLogs } = useSidebarStates()

  const toChat = () => {
    setChat(true)
    setParameters(false)
    setChatBox(true)
  }

  const toParameters = () => {
    setChat(false)
    setParameters(true)
  }

  const toDownload = () => {
    setChatBox(false)
    setDownload(true)
    setConsole(false)
    setLogs(false)
  }

  const toConsole = () => {
    setChatBox(false)
    setDownload(false)
    setConsole(true)
    setLogs(false)
  }

  const toLogs = () => {
    setChatBox(false)
    setDownload(false)
    setConsole(false)
    setLogs(true)
  }

  return (
    <div className="flex flex-row">

      <div className="w-[3.5rem] pt-[2.5rem] h-full bg-sidebar border-r border-[#1f2c41]">
        <div className="relative flex flex-col items-center justify-start gap-2 h-full">
          <FileText className="mb-4 hover:bg-accent p-[0.35rem] rounded-lg hover:cursor-pointer" size={35} />
          <MessageSquare onClick={toChat} className="hover:bg-accent p-[0.35rem] rounded-lg hover:cursor-pointer" size={35}/>
          <Wrench onClick={toParameters} className="hover:bg-accent p-[0.35rem] rounded-lg hover:cursor-pointer" size={35}/>
          <Download onClick={toDownload} className="hover:bg-accent p-[0.35rem] -pt-2 rounded-lg hover:cursor-pointer" size={35}/>
          <SquareTerminal onClick={toConsole} className="hover:bg-accent p-[0.35rem] rounded-lg hover:cursor-pointer" size={35}/>
          <Logs onClick={toLogs} className="hover:bg-accent p-[0.35rem] rounded-lg hover:cursor-pointer" size={35}/>
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

         {chat ? <NavMain items={data.chat} /> : null}
         {parameters ? <NavMain items={data.params} /> : null}

          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
      
    </div>
  )
}
