import { HeroOpeningProvider } from "@/context/HeroOpeningContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { FeaturedPerformancesSection } from "@/components/sections/FeaturedPerformancesSection";
import { StageMagicSection } from "@/components/sections/StageMagicSection";
import { IdentitySection } from "@/components/sections/IdentitySection";
import { InternationalExperienceSection } from "@/components/sections/InternationalExperienceSection";
import { TheatreSection } from "@/components/sections/TheatreSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { getTurnstileSiteKey } from "@/lib/turnstile-public-config";

export default function Home() {
  const turnstileSiteKey = getTurnstileSiteKey();
  return (
    <HeroOpeningProvider>
      <Navbar />
      <main>
        <HeroSection />
        <IntroSection />
        <InternationalExperienceSection />
        <FeaturedPerformancesSection />
        <StageMagicSection />
        <IdentitySection />
        <TheatreSection />
        <ContactSection turnstileSiteKey={turnstileSiteKey} />
      </main>
      <Footer />
    </HeroOpeningProvider>
  );
}
