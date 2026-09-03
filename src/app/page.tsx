import { AboutPreview } from "@/components/about-preview";
import { ContactCta } from "@/components/contact-cta";
import { ExperienceSection } from "@/components/experience-section";
import { Hero } from "@/components/hero";
import { ProjectScrollStory } from "@/components/project-scroll-story";
import { ScrollReveal } from "@/components/scroll-reveal";
import { StackSection } from "@/components/stack-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectScrollStory />
      <ScrollReveal><ExperienceSection /></ScrollReveal>
      <ScrollReveal><StackSection /></ScrollReveal>
      <ScrollReveal><AboutPreview /></ScrollReveal>
      <ScrollReveal><ContactCta /></ScrollReveal>
    </>
  );
}
