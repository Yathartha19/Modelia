import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SearchForm } from "@/components/search-form"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Chat } from "@/components/Chat"

export default function Page() {
  return (
    <div className="max-h-screen">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1 ]">
          <AppSidebar />
          <SidebarInset>
            <div className="relative flex flex-1 flex-col gap-4 p-4">
            <div className="flex flex-row items-center justify-between pt-[2rem]">
                <button className="font-semibold text-xs border border-accent py-2 px-4 rounded-lg bg-[#5889d9] text-accent hover:bg-transparent hover:text-[#5889d9] transition duration-200">+ New Chat</button>
                <SearchForm className="w-full sm:w-auto sm:ml-auto right-0" />
              </div>
              <Chat />  
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}