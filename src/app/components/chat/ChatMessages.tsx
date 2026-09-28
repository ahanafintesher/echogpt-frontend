"use client";

import AssistantMessage from "./AssistantMessage";
import TypingIndicator from "./TypingIndicator";
import UserMessage from "./UserMessage";

export interface MessageAttachment {
  name: string;
  type: string;
  size: number;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  attachments?: MessageAttachment[];
}

interface ChatMessagesProps {
  messages: Message[];
  isTyping?: boolean;
  onRegenerate?: () => void;
}

export default function ChatMessages({
  messages,
  isTyping = false,
  onRegenerate,
}: ChatMessagesProps) {
  return (
    <div className="mx-auto w-full max-w-4xl">
      {messages.map((message) =>
        message.role === "user" ? (
          <UserMessage
            key={message.id}
            content={message.content}
          />
        ) : (
          <AssistantMessage
            key={message.id}
            content={message.content}
            onRegenerate={onRegenerate}
          />
        ),
      )}

      {isTyping && <TypingIndicator />}
    </div>
  );
}