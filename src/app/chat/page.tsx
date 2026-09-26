import ChatLayout from "./ChatLayout";

export default function ChatPage() {
  return (
    <ChatLayout>
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">
            How can I help you?
          </h1>

          <p className="mt-2 text-muted-foreground">
            Ask anything and start a conversation.
          </p>
        </div>
      </div>
    </ChatLayout>
  );
}