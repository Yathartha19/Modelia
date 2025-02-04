"use client"

import { useEffect, useState } from "react"
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
  const { model, setModel } = useSidebarStates()
  const [models, setModels] = useState<string[]>([])

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("http://localhost:11434/api/tags")
        if (!response.ok) throw new Error("Failed to fetch models")
        
        const data = await response.json()
        setModels(data.models.map((m: { name: string }) => m.name))
      } catch (error) {
        console.error("Error fetching models:", error)
      }
    }

    fetchModels()
  }, [])

  const handleModelSelect = (selectedModel: string) => {
    setModel(selectedModel)
  }

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
                  <span className="truncate font-semibold">{model || "Select a Model"}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {models.length > 0 ? (
              <DropdownMenuGroup>
                {models.map((m) => (
                  <DropdownMenuItem key={m} onClick={() => handleModelSelect(m)}>
                    <Sparkles />
                    {m} {model === m ? "" : ""}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            ) : (
              <DropdownMenuItem disabled>
                No models available
              </DropdownMenuItem>
            )}

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
