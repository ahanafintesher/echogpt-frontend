import Navbar from "./components/navbar/navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <h1 className="text-4xl font-bold">
          EchoGPT
        </h1>
      </section>
    </main>
  );
}