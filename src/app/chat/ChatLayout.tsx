"use client";

import { useEffect, useRef, useState } from "react";
import ChatHeader from "../components/chat/ChatHeader";
import ChatEmptyState from "../components/chat/ChatEmptyState";
import UserMessage from "../components/chat/UserMessage";
import AssistantMessage from "../components/chat/AssistantMessage";
import TypingIndicator from "../components/chat/TypingIndicator";
import MessageInput from "../components/chat/MessageInput";



interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const mockResponses = [
  "Absolutely! I can help you with that. Let's break the idea down into clear and practical steps.",
  "That's a great question. Here's a structured approach you can follow to solve it efficiently.",
  "Sure! I understand what you're trying to achieve. Let me walk you through the solution step by step.",
];

export default function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const handleSend = (content: string) => {
    const trimmedContent = content.trim();

    if (!trimmedContent || isTyping) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedContent,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const response =
        mockResponses[
          Math.floor(Math.random() * mockResponses.length)
        ];

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1400);
  };

  const handlePromptSelect = (prompt: string) => {
    handleSend(prompt);
  };

  const handleRegenerate = () => {
    if (isTyping || messages.length === 0) return;

    setIsTyping(true);

    setTimeout(() => {
      const response =
        mockResponses[
          Math.floor(Math.random() * mockResponses.length)
        ];

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <ChatHeader title="New Chat" />

      <main className="relative min-h-0 flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <ChatEmptyState onPromptSelect={handlePromptSelect} />
        ) : (
          <div className="mx-auto w-full max-w-4xl">
            {messages.map((message) => {
              if (message.role === "user") {
                return (
                  <UserMessage
                    key={message.id}
                    content={message.content}
                  />
                );
              }

              return (
                <AssistantMessage
                  key={message.id}
                  content={message.content}
                  onRegenerate={handleRegenerate}
                />
              );
            })}

            {isTyping && <TypingIndicator />}

            <div ref={messagesEndRef} className="h-4" />
          </div>
        )}
      </main>

      <MessageInput
        onSend={handleSend}
        disabled={isTyping}
      />
    </div>
  );
}