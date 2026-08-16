import { HeroOpeningProvider } from "@/context/HeroOpeningContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { FeaturedPerformancesSection } from "@/components/sections/FeaturedPerformancesSection";
import { IdentitySection } from "@/components/sections/IdentitySection";
import { InternationalExperienceSection } from "@/components/sections/InternationalExperienceSection";
import { TheatreSection } from "@/components/sections/TheatreSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <HeroOpeningProvider>
      <Navbar />
      <main>
        <HeroSection />
        <IntroSection />
        <FeaturedPerformancesSection />
        <IdentitySection />
        <InternationalExperienceSection />
        <TheatreSection />
        <ContactSection />
      </main>
      <Footer />
    </HeroOpeningProvider>
  );
}
