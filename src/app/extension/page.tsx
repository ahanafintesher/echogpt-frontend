import ExtensionsPopup from "../components/extensions/ExtensionsPopup";

export default function ExtensionPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="flex min-h-screen items-center justify-center p-4 sm:p-8">
        <ExtensionsPopup />
      </div>
    </main>
  );
}