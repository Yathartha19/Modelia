import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Chat } from "@/components/Chat";

export default function Page() {
  return (
    <div className="max-h-screen">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1 ]">
          <AppSidebar />
          <SidebarInset>
            <div className="relative flex flex-1 flex-col gap-4 p-4 mt-8">
              <Chat />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
