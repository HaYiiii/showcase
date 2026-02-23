import { Background } from "./sections/Background";
import { CapabilitiesSection } from "./sections/CapabilitiesSection";
import { ContactSection } from "./sections/ContactSection";
import { ExplorationsSection } from "./sections/ExplorationsSection";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";

export function HomePage() {
  return (
    <div className="relative">
      <Background />
      <div className="relative space-y-12">
        <HeroSection />
        <ProjectsSection />
        <ExplorationsSection />
        <CapabilitiesSection />
        <ContactSection />
      </div>
    </div>
  );
}
