import Navbar from "@/components/ui/Navbar";
import HeroAgent from "@/components/agents/HeroAgent";
import StatsAgent from "@/components/agents/StatsAgent";
import ServicesAgent from "@/components/agents/ServicesAgent";
import PortfolioAgent from "@/components/agents/PortfolioAgent";
import TeamAgent from "@/components/agents/TeamAgent";
import TestimonialsAgent from "@/components/agents/TestimonialsAgent";
import ContactAgent from "@/components/agents/ContactAgent";
import Footer from "@/components/ui/Footer";
import AgentsPanel from "@/components/ui/AgentsPanel";
import Preloader from "@/components/ui/Preloader";

export default function Home() {
  return (
    <main>
      <Preloader />
      <Navbar />
      <HeroAgent />
      <StatsAgent />
      <ServicesAgent />
      <PortfolioAgent />
      <TeamAgent />
      <TestimonialsAgent />
      <ContactAgent />
      <Footer />
      <AgentsPanel />
    </main>
  );
}
