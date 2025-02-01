import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SearchForm } from "@/components/search-form"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function Page() {
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-col gap-4 p-4">
              <SearchForm className="w-full sm:ml-auto sm:w-auto" />
              <div className="h-[85vh] mb-[1rem] rounded-xl bg-muted/50" />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}