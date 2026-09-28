"use client";

import { useState } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import ChatSidebar from "../components/chat/ChatSidebar";
import type { Message } from "../components/chat/ChatMessages";
import ChatLayout from "./ChatLayout";

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

  const handleCreateChat = (messages: Message[]) => {
    const firstUserMessage = messages.find(
      (message) => message.role === "user",
    );

    const title =
      firstUserMessage?.content.slice(0, 35) || "New Chat";

    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: title.length < (firstUserMessage?.content.length ?? 0)
        ? `${title}...`
        : title,
      messages,
    };

    setChats((previousChats) => [newChat, ...previousChats]);
    setActiveChatId(newChat.id);

    return newChat.id;
  };

  const handleMessagesChange = (
    chatId: string,
    messages: Message[],
  ) => {
    setChats((previousChats) =>
      previousChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages,
            }
          : chat,
      ),
    );
  };

  const handleRenameChat = (chatId: string, title: string) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    setChats((previousChats) =>
      previousChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              title: trimmedTitle,
            }
          : chat,
      ),
    );
  };

  const handleDeleteChat = (chatId: string) => {
    setChats((previousChats) =>
      previousChats.filter((chat) => chat.id !== chatId),
    );

    if (activeChatId === chatId) {
      setActiveChatId(null);
    }
  };

  return (
    <SidebarProvider>
      <ChatSidebar
        chats={chats}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        activeChatId={activeChatId}
      />

      <SidebarInset className="min-w-0">
        <ChatLayout
          chatId={activeChatId}
          messages={activeChat?.messages ?? []}
          title={activeChat?.title ?? "New Chat"}
          onCreateChat={handleCreateChat}
          onMessagesChange={handleMessagesChange}
          onRenameChat={handleRenameChat}
          onDeleteChat={handleDeleteChat}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}