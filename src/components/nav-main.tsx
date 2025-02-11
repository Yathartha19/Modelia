"use client";

import { type LucideIcon, Plus } from "lucide-react";
import { SearchForm } from "@/components/search-form";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const handleNewChat = () => {
    console.log("Add new Chat");
  };

  return (
    <SidebarGroup>
      <div className="flex justify-center m-4">
        <SearchForm />
      </div>
      <div className="flex justify-center m-4">
        <button
          onClick={handleNewChat}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus size={16} className="mr-2" />
          New Chat
        </button>
      </div>
      <SidebarGroupLabel>Chats</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton asChild tooltip={item.title}>
              <a href={item.url}>
                <span className="pl-2">{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
