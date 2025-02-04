"use client"

import useSidebarStates from "../app/store/store"

import {
  BadgeCheck,
  ChevronsUpDown,
  Sparkles,
  Download,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavUser() {
  const { model, setModel } = useSidebarStates();

  const handleModelSelect = (selectedModel: string) => {
    setModel(selectedModel);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Sparkles size={40} />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{model || "Select a Model"}</span>
                <span className="truncate text-xs">Powered by Ollama</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side="top"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <BadgeCheck className="h-4"/>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Select a Model</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleModelSelect("llama3.2:3b")}>
                <Sparkles />
                llama3.2:3b {model === "llama3.2:3b" && "✓"}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleModelSelect("deepseek-r1:7b")}>
                <Sparkles />
                deepseek-r1:7b {model === "deepseek-r1:7b" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleModelSelect("deepseek-r1:1.5b")}>
                <Sparkles />
                deepseek-r1:1.5b {model === "deepseek:1.5b" && "✓"}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Download />
              Download Models
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
