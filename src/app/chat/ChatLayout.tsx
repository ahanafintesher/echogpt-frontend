"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useSidebar } from "@/components/ui/sidebar";

import AssistantMessage from "../components/chat/AssistantMessage";
import ChatEmptyState from "../components/chat/ChatEmptyState";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages, {
  type Message,
} from "../components/chat/ChatMessages";
import MessageInput from "../components/chat/MessageInput";

interface ChatLayoutProps {
  messages: Message[];
  onMessagesChange: (messages: Message[]) => void;
  title?: string;
}

const mockResponses = [
  "Absolutely! I can help you with that. Let's break the idea down into clear and practical steps.",
  "That's a great question. Here's a structured approach you can follow to solve it efficiently.",
  "Sure! I understand what you're trying to achieve. Let me walk you through the solution step by step.",
];

export default function ChatLayout({
  messages,
  onMessagesChange,
  title = "New Chat",
}: ChatLayoutProps) {
  const [isTyping, setIsTyping] = useState(false);

  const { toggleSidebar } = useSidebar();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const responseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

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

  const handleStop = () => {
    clearResponseTimeout();
    setIsTyping(false);
  };

  const generateResponse = (delay: number) => {
    clearResponseTimeout();

    setIsTyping(true);

    responseTimeoutRef.current = setTimeout(() => {
      const response =
        mockResponses[Math.floor(Math.random() * mockResponses.length)];

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response,
      };

      onMessagesChange([...messages, assistantMessage]);

      setIsTyping(false);
      responseTimeoutRef.current = null;
    }, delay);
  };

  const handleSend = (content: string) => {
    const trimmedContent = content.trim();

    if (!trimmedContent || isTyping) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedContent,
    };

    const updatedMessages = [...messages, userMessage];

    onMessagesChange(updatedMessages);

    generateResponse(1400);
  };

  const handlePromptSelect = (prompt: string) => {
    handleSend(prompt);
  };

  const handleRegenerate = () => {
    if (isTyping || messages.length === 0) return;

    const lastAssistantIndex = [...messages]
      .map((message) => message.role)
      .lastIndexOf("assistant");

    if (lastAssistantIndex === -1) return;

    clearResponseTimeout();
    setIsTyping(true);

    responseTimeoutRef.current = setTimeout(() => {
      const response =
        mockResponses[Math.floor(Math.random() * mockResponses.length)];

      const updatedMessages = [...messages];

      updatedMessages[lastAssistantIndex] = {
        ...updatedMessages[lastAssistantIndex],
        content: response,
      };

      onMessagesChange(updatedMessages);

      setIsTyping(false);
      responseTimeoutRef.current = null;
    }, 1200);
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
      />

      <main className="relative min-h-0 flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <ChatEmptyState onPromptSelect={handlePromptSelect} />
        ) : (
          <>
            <ChatMessages
              messages={messages}
              isTyping={isTyping}
              onRegenerate={handleRegenerate}
            />

            <div ref={messagesEndRef} className="h-4" />
          </>
        )}
      </main>

      <MessageInput
        onSend={handleSend}
        onStop={handleStop}
        isGenerating={isTyping}
      />
    </div>
  );
}