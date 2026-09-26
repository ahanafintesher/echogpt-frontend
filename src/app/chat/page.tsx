import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import ChatLayout from "./ChatLayout";
import ChatSidebar from "../components/chat/ChatSidebar";

export default function ChatPage() {
  return (
    <SidebarProvider>
      <ChatSidebar />

      <SidebarInset className="min-w-0">
        <ChatLayout />
      </SidebarInset>
    </SidebarProvider>
  );
}