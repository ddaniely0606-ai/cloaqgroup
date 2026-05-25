import Navbar from "@/components/ui/Navbar";
import HeroAgent from "@/components/agents/HeroAgent";
import ServicesAgent from "@/components/agents/ServicesAgent";
import PortfolioAgent from "@/components/agents/PortfolioAgent";
import TeamAgent from "@/components/agents/TeamAgent";
import TestimonialsAgent from "@/components/agents/TestimonialsAgent";
import ContactAgent from "@/components/agents/ContactAgent";
import Footer from "@/components/ui/Footer";
import AgentsPanel from "@/components/ui/AgentsPanel";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroAgent />
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
