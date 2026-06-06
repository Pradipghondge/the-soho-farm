import {
  amenities,
  attractions,
  benefits,
  creativePrompts,
  finalUspList,
  highlights,
  locationAdvantages,
  overview,
  projectStats,
  testimonials,
  whoShouldBuy
} from "@/lib/content";
import {
  AmenityGrid,
  BrandStory,
  ContactFooter,
  CreativePromptPanel,
  ExperienceView,
  FinalCta,
  FloatingActions,
  FormsSection,
  Header,
  HelicopterExperience,
  Hero,
  ImageCarousel,
  InvestmentBenefits,
  LocationSection,
  MasterPlan,
  OverviewTable,
  ProjectHighlights,
  Testimonials,
  WelcomeSection,
  WhoShouldBuy
} from "@/components/landing";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero stats={projectStats} />
      <WelcomeSection />
      <BrandStory />
      <ProjectHighlights items={highlights} />
      <ExperienceView />
      <OverviewTable items={overview} />
      <AmenityGrid items={amenities} />
      <LocationSection advantages={locationAdvantages} />
      <ImageCarousel title="Nearby Attractions" items={attractions} />
      <MasterPlan />
      <InvestmentBenefits items={benefits} />
      <WhoShouldBuy items={whoShouldBuy} />
      <Testimonials items={testimonials} />
      <HelicopterExperience />
      <FormsSection />
      <FinalCta items={finalUspList} />
      <CreativePromptPanel prompts={creativePrompts} />
      <ContactFooter />
      <FloatingActions />
    </main>
  );
}
