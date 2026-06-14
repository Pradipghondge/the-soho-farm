import {
  attractions,
  projectStats
} from "@/lib/content";
import {
  AboutSection,
  BrandStory,
  ContactFooter,
  ContactSection,
  Header,
  Hero,
  ImageCarousel,
  ImageGallery,
  LocationSection,
  ScrollAnimator,
  StatsSection,
  TowerShowcaseSection
} from "@/components/landing";

export default function Home() {
  return (
    <main>
      <div className="scroll-wrapper">
        <Header />
        <Hero />
        <AboutSection />
        <BrandStory />
        <ImageCarousel title="Nearby Attractions" items={attractions} />
        <StatsSection stats={projectStats} />
        <TowerShowcaseSection />
        <ImageGallery />
        <LocationSection />
        <ContactSection />
      </div>
      <ContactFooter />
      <ScrollAnimator />
    </main>
  );
}
