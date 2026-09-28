import Features from "./components/landing/Features";
import Models from "./components/landing/Models";
import WhyEchoGPT from "./components/landing/WhyEchoGPT";
import ExtensionShowcase from "./components/landing/ExtensionShowcase";
import FAQ from "./components/landing/FAQ";
import CTA from "./components/landing/CTA";
import Footer from "./components/landing/Footer";
import Hero from "./components/landing/Hero";
import Navbar from "./components/navbar/navbar";
import ProductReviews from "./components/landing/ProductPreview";

export default function Home() {
  return (
    <main id="top" className="min-h-screen">
      <Navbar />

      <Hero />

      <Features />

      <Models />

      <WhyEchoGPT />

      <ExtensionShowcase />

      <ProductReviews />

      <FAQ />

      <CTA />

      <Footer />
    </main>
  );
}