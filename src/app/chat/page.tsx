"use client";

import { useState } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import ChatLayout from "./ChatLayout";
import ChatSidebar from "../components/chat/ChatSidebar";
import type { Message } from "../components/chat/ChatMessages";

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

const initialChats: Chat[] = [
  {
    id: "chat-1",
    title: "Build a React dashboard",
    messages: [
      {
        id: "1",
        role: "user",
        content: "How can I build a modern React dashboard?",
      },
      {
        id: "2",
        role: "assistant",
        content:
          "You can build it using React, Tailwind CSS, reusable components, and a clear dashboard layout.",
      },
    ],
  },
  {
    id: "chat-2",
    title: "Portfolio improvement ideas",
    messages: [
      {
        id: "3",
        role: "user",
        content: "Give me some ideas to improve my developer portfolio.",
      },
      {
        id: "4",
        role: "assistant",
        content:
          "Focus on strong project presentation, clear case studies, responsive design, and measurable technical details.",
      },
    ],
  },
  {
    id: "chat-3",
    title: "Debug authentication",
    messages: [
      {
        id: "5",
        role: "user",
        content: "How should I debug a JWT authentication issue?",
      },
      {
        id: "6",
        role: "assistant",
        content:
          "Start by checking token creation, storage, request headers, middleware validation, and token expiration.",
      },
    ],
  },
  {
    id: "chat-4",
    title: "Next.js App Router",
    messages: [
      {
        id: "7",
        role: "user",
        content: "Explain the Next.js App Router.",
      },
      {
        id: "8",
        role: "assistant",
        content:
          "The App Router uses file-system routing with layouts, server components, loading states, and nested routes.",
      },
    ],
  },
  {
    id: "chat-5",
    title: "REST API architecture",
    messages: [
      {
        id: "9",
        role: "user",
        content: "How should I structure a REST API?",
      },
      {
        id: "10",
        role: "assistant",
        content:
          "Separate routes, controllers or services, validation, authentication, database access, and error handling.",
      },
    ],
  },
];

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  const handleNewChat = () => {
    setActiveChatId(null);
  };

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
  };

  const handleMessagesChange = (messages: Message[]) => {
    if (!activeChatId) return;

    setChats((previousChats) =>
      previousChats.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages,
            }
          : chat,
      ),
    );
  };

  return (
    <SidebarProvider>
      <ChatSidebar
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        activeChatId={activeChatId}
      />

      <SidebarInset className="min-w-0">
        <ChatLayout
          messages={activeChat?.messages ?? []}
          onMessagesChange={handleMessagesChange}
          title={activeChat?.title ?? "New Chat"}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}