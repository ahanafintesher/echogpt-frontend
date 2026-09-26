import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ChatSidebar from "../components/chat/ChatSidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <ChatSidebar />

      <main className="flex min-h-svh flex-1 flex-col">
        <header className="flex h-14 items-center border-b px-4">
          <SidebarTrigger />
        </header>

        <div className="flex min-h-0 flex-1 flex-col">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}