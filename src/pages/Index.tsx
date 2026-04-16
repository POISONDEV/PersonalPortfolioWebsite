import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import FooterSection from "@/components/FooterSection";
import HyperBackground from "@/components/HyperBackground";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  return (
    <main className="min-h-screen relative">
      <CustomCursor />
      <HyperBackground />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <FooterSection />
    </main>
  );
};

export default Index;
