"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useSidebar } from "@/components/ui/sidebar";

import ChatEmptyState from "../components/chat/ChatEmptyState";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages, {
  type Message,
} from "../components/chat/ChatMessages";
import MessageInput, {
  type Attachment,
} from "../components/chat/MessageInput";

interface ChatLayoutProps {
  chatId: string | null;
  messages: Message[];
  title?: string;
  onCreateChat: (messages: Message[]) => string;
  onMessagesChange: (chatId: string, messages: Message[]) => void;
  onRenameChat: (chatId: string, title: string) => void;
  onDeleteChat: (chatId: string) => void;
}

const mockResponses = [
  "Absolutely! I can help you with that. Let's break the idea down into clear and practical steps.",
  "That's a great question. Here's a structured approach you can follow to solve it efficiently.",
  "Sure! I understand what you're trying to achieve. Let me walk you through the solution step by step.",
];

export default function ChatLayout({
  chatId,
  messages,
  title = "New Chat",
  onCreateChat,
  onMessagesChange,
  onRenameChat,
  onDeleteChat,
}: ChatLayoutProps) {
  const [isTyping, setIsTyping] = useState(false);
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);

  const { toggleSidebar } = useSidebar();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeChatIdRef = useRef<string | null>(chatId);
  const messagesRef = useRef<Message[]>(messages);

  useEffect(() => {
    activeChatIdRef.current = chatId;
    messagesRef.current = messages;
  }, [chatId, messages]);

  const clearResponseTimeout = useCallback(() => {
    if (responseTimeoutRef.current) {
      clearTimeout(responseTimeoutRef.current);
      responseTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const updateMessages = (
    nextMessages: Message[],
    targetChatId?: string,
  ) => {
    const id = targetChatId ?? activeChatIdRef.current;

    if (!id) return;

    messagesRef.current = nextMessages;

    onMessagesChange(id, nextMessages);
  };

  const generateResponse = (
    currentMessages: Message[],
    targetChatId: string,
  ) => {
    clearResponseTimeout();
    setIsTyping(true);

    responseTimeoutRef.current = setTimeout(() => {
      const response =
        mockResponses[
          Math.floor(Math.random() * mockResponses.length)
        ];

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response,
      };

      const updatedMessages = [
        ...currentMessages,
        assistantMessage,
      ];

      updateMessages(updatedMessages, targetChatId);

      setIsTyping(false);
      responseTimeoutRef.current = null;
    }, 1400);
  };

  const handleStop = () => {
    clearResponseTimeout();
    setIsTyping(false);
  };

  const handleSend = (
    content: string,
    attachments: Attachment[] = [],
  ) => {
    const trimmedContent = content.trim();

    if (!trimmedContent || isTyping) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedContent,
      attachments: attachments.map((attachment) => ({
        name: attachment.file.name,
        type: attachment.file.type,
        size: attachment.file.size,
      })),
    };

    const updatedMessages = [
      ...messagesRef.current,
      userMessage,
    ];

    let targetChatId = activeChatIdRef.current;

    // Create a real chat when sending from "New Chat"
    if (!targetChatId) {
      targetChatId = onCreateChat(updatedMessages);
      activeChatIdRef.current = targetChatId;
    } else {
      updateMessages(updatedMessages, targetChatId);
    }

    messagesRef.current = updatedMessages;

    generateResponse(updatedMessages, targetChatId);
  };

  const handlePromptSelect = (prompt: string) => {
    handleSend(prompt);
  };

  const handleRegenerate = () => {
    if (isTyping || messagesRef.current.length === 0) return;

    const currentMessages = messagesRef.current;

    const lastAssistantIndex = [...currentMessages]
      .map((message) => message.role)
      .lastIndexOf("assistant");

    if (lastAssistantIndex === -1) return;

    const targetChatId = activeChatIdRef.current;

    if (!targetChatId) return;

    clearResponseTimeout();
    setIsTyping(true);

    responseTimeoutRef.current = setTimeout(() => {
      const response =
        mockResponses[
          Math.floor(Math.random() * mockResponses.length)
        ];

      const updatedMessages = [...currentMessages];

      updatedMessages[lastAssistantIndex] = {
        ...updatedMessages[lastAssistantIndex],
        content: response,
      };

      updateMessages(updatedMessages, targetChatId);

      setIsTyping(false);
      responseTimeoutRef.current = null;
    }, 1200);
  };

  const handleRename = () => {
    if (!chatId) return;

    const newTitle = window.prompt(
      "Rename conversation",
      title,
    );

    if (!newTitle?.trim()) return;

    onRenameChat(chatId, newTitle);
  };

  const handleDelete = () => {
    if (!chatId) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this conversation?",
    );

    if (!confirmed) return;

    clearResponseTimeout();
    setIsTyping(false);
    onDeleteChat(chatId);
  };

  useEffect(() => {
    return () => {
      clearResponseTimeout();
    };
  }, [clearResponseTimeout]);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-background">
      <ChatHeader
        title={title}
        onToggleSidebar={toggleSidebar}
        onRename={handleRename}
        onDelete={handleDelete}
        messages={messages}
      />

      <main className="relative min-h-0 flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <ChatEmptyState
            onPromptSelect={handlePromptSelect}
          />
        ) : (
          <>
            <ChatMessages
              messages={messages}
              isTyping={isTyping}
              onRegenerate={handleRegenerate}
            />

            <div
              ref={messagesEndRef}
              className="h-4"
            />
          </>
        )}
      </main>

      <MessageInput
        onSend={handleSend}
        onStop={handleStop}
        isGenerating={isTyping}
        webSearchEnabled={webSearchEnabled}
        onToggleWebSearch={setWebSearchEnabled}
      />
    </div>
  );
}