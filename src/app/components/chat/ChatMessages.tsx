"use client";

import AssistantMessage from "./AssistantMessage";
import TypingIndicator from "./TypingIndicator";
import UserMessage from "./UserMessage";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
  isTyping?: boolean;
}

export default function ChatMessages({
  messages,
  isTyping = false,
}: ChatMessagesProps) {
  return (
    <div className="flex w-full flex-col">
      {messages.map((message) =>
        message.role === "user" ? (
          <UserMessage key={message.id} content={message.content} />
        ) : (
          <AssistantMessage
            key={message.id}
            content={message.content}
          />
        ),
      )}

      {isTyping && <TypingIndicator />}
    </div>
  );
}