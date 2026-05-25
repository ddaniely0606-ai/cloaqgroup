import Navbar from "@/components/ui/Navbar";
import HeroAgent from "@/components/agents/HeroAgent";
import LogoStripAgent from "@/components/agents/LogoStripAgent";
import StatsAgent from "@/components/agents/StatsAgent";
import ServicesAgent from "@/components/agents/ServicesAgent";
import ProcessAgent from "@/components/agents/ProcessAgent";
import PortfolioAgent from "@/components/agents/PortfolioAgent";
import TeamAgent from "@/components/agents/TeamAgent";
import TestimonialsAgent from "@/components/agents/TestimonialsAgent";
import FAQAgent from "@/components/agents/FAQAgent";
import CTAAgent from "@/components/agents/CTAAgent";
import ContactAgent from "@/components/agents/ContactAgent";
import Footer from "@/components/ui/Footer";
import AgentsPanel from "@/components/ui/AgentsPanel";
import Preloader from "@/components/ui/Preloader";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ManifestoAgent from "@/components/agents/ManifestoAgent";

export default function Home() {
  return (
    <main className="grain">
      <SmoothScroll />
      <CustomCursor />
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <HeroAgent />
      <LogoStripAgent />
      <StatsAgent />
      <ServicesAgent />
      <ProcessAgent />
      <PortfolioAgent />
      <TeamAgent />
      <TestimonialsAgent />
      <ManifestoAgent />
      <FAQAgent />
      <CTAAgent />
      <ContactAgent />
      <Footer />
      <AgentsPanel />
      <WhatsAppButton />
    </main>
  );
}
