import { contact } from "@/lib/content";

type Pair = [string, string];

function SectionTitle({
  eyebrow,
  title,
  align = "left"
}: {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-title ${align === "center" ? "center" : ""}`}>
      {eyebrow ? <span>{eyebrow}</span> : null}
      <h2>{title}</h2>
    </div>
  );
}

function MediaBlock({
  src,
  alt,
  className = ""
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`media-block ${className}`}
      role="img"
      aria-label={alt}
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(19, 43, 32, 0.22), rgba(8, 11, 10, 0.34)), url("${src}")`
      }}
    />
  );
}

export function Header() {
  return (
    <header className="site-header">
      <a className="logo" href="#top" aria-label="The Soho Farm home">
        <strong>THE</strong>
        <strong>SOHO</strong>
        <strong>FARM</strong>
      </a>
      <nav aria-label="Primary navigation">
        <a href="#overview">Overview</a>
        <a href="#amenities">Amenities</a>
        <a href="#investment">Investment Edge</a>
        <a href="#forms">Enquire</a>
      </nav>
      <a className="header-cta" href={`tel:${contact.phone.replaceAll(" ", "")}`}>
        Call Now
      </a>
    </header>
  );
}

export function Hero({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section className="hero" id="top">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        poster="/creatives/hero-drone-fallback.jpg"
      >
        <source src="/creatives/hero-drone-roha-valley.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="badge">Exclusive Helicopter Site Visit Available</p>
        <h1>THE SOHO FARM</h1>
        <h2>Own The View. Own The Legacy.</h2>
        <p>
          100 Acre Premium Gated Community Agricultural Land in the Roha -
          Alibaug Region, Raigad. Pre-launch offer starting at ₹150 per sq.ft.
        </p>
        <div className="hero-actions">
          <a href="#forms">Book Site Visit</a>
          <a href="#helicopter">Book Helicopter Site Visit</a>
          <a href="#brochure">Download Brochure</a>
        </div>
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WelcomeSection() {
  return (
    <section className="split-section">
      <div>
        <SectionTitle eyebrow="Welcome" title="Welcome To The Soho Farm" />
        <p>
          A rare opportunity to own premium hilltop agricultural land amidst the
          breathtaking Sahyadri mountain ranges.
        </p>
        <p>
          Spread across 100 acres, The Soho Farm brings together nature,
          infrastructure, exclusivity and long-term investment potential. More
          than land ownership, it is an opportunity to own a lifestyle
          destination.
        </p>
        <a className="gold-link" href="#overview">
          Explore Project
        </a>
      </div>
      <MediaBlock src="/creatives/welcome-hilltop.jpg" alt="Premium hilltop land" />
    </section>
  );
}

export function BrandStory() {
  return (
    <section className="brand-story">
      <MediaBlock
        src="/creatives/brand-story-luxury-farm.jpg"
        alt="Luxury farm lifestyle"
      />
      <div>
        <SectionTitle eyebrow="Why The Soho Farm?" title="Where Luxury Meets Nature" />
        <p>
          Soho represents sophistication, exclusivity and premium living. Farm
          represents freedom, nature and true ownership.
        </p>
        <p>
          Together, The Soho Farm creates a destination where investment meets
          lifestyle.
        </p>
        <strong>Above The Ordinary.</strong>
      </div>
    </section>
  );
}

export function ProjectHighlights({ items }: { items: string[] }) {
  return (
    <section className="section-shell">
      <SectionTitle eyebrow="Project USP's" title="Project Highlights" align="center" />
      <div className="icon-grid">
        {items.map((item, index) => (
          <article key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ExperienceView() {
  return (
    <section className="view-section">
      <MediaBlock
        src="/creatives/experience-panoramic-view.jpg"
        alt="Panoramic mountain view"
        className="wide-media"
      />
      <div className="view-copy">
        <SectionTitle title="Every Plot Comes With A View" />
        <p>
          Experience breathtaking sunrises, panoramic mountain landscapes, cool
          hilltop breeze, natural privacy and the complete 100-acre development
          from the ground as well as from the sky.
        </p>
        <a className="gold-link" href="#forms">
          Schedule Site Visit
        </a>
      </div>
    </section>
  );
}

export function OverviewTable({ items }: { items: Pair[] }) {
  return (
    <section className="section-shell two-column" id="overview">
      <SectionTitle eyebrow="Project Overview" title="A Rare Hilltop Land Holding" />
      <div className="overview-table">
        {items.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AmenityGrid({ items }: { items: string[] }) {
  return (
    <section className="section-shell" id="amenities">
      <SectionTitle
        eyebrow="Infrastructure"
        title="Premium Infrastructure Already Available"
        align="center"
      />
      <div className="amenity-grid">
        {items.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </section>
  );
}

export function LocationSection({ advantages }: { advantages: string[] }) {
  return (
    <section className="location-section">
      <div>
        <SectionTitle eyebrow="Project Location" title="Roha - Alibaug Region" />
        <div className="map-frame">
          <iframe
            title="The Soho Farm map"
            src="https://maps.google.com/maps?q=18.4059715,73.1227036&z=15&output=embed"
            loading="lazy"
          />
        </div>
        <div className="button-row">
          <a href={contact.maps} target="_blank" rel="noreferrer">
            Get Location
          </a>
          <a href={contact.maps} target="_blank" rel="noreferrer">
            Open In Google Maps
          </a>
        </div>
      </div>
      <div>
        <SectionTitle title="Location Advantage" />
        <ul className="check-list">
          {advantages.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ImageCarousel({ title, items }: { title: string; items: Pair[] }) {
  return (
    <section className="section-shell">
      <SectionTitle eyebrow="Around The Region" title={title} />
      <div className="card-carousel">
        {items.map(([name, src]) => (
          <article key={name}>
            <MediaBlock src={src} alt={name} />
            <h3>{name}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MasterPlan() {
  return (
    <section className="master-plan">
      <div>
        <SectionTitle eyebrow="Planning" title="Master Plan & Layout" />
        <p>
          Review the plotted land parcels, internal movement, green buffers and
          access routes prepared for this 100-acre development.
        </p>
        <div className="button-row">
          <a href="/creatives/master-plan.jpg" download>
            Download Master Plan
          </a>
          <a href="/creatives/layout-plan.jpg" target="_blank">
            View Layout
          </a>
        </div>
      </div>
      <MediaBlock src="/creatives/master-plan.jpg" alt="Master plan" />
    </section>
  );
}

export function InvestmentBenefits({ items }: { items: string[] }) {
  return (
    <section className="section-shell" id="investment">
      <SectionTitle eyebrow="Investment Edge" title="Why Invest At The Soho Farm?" />
      <div className="benefit-grid">
        {items.map((item) => (
          <article key={item}>
            <span />
            <h3>{item}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

export function WhoShouldBuy({ items }: { items: string[] }) {
  return (
    <section className="buyer-section">
      <SectionTitle title="Who Should Buy?" align="center" />
      <div>
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}

export function Testimonials({ items }: { items: Pair[] }) {
  return (
    <section className="section-shell">
      <SectionTitle eyebrow="Testimonials" title="What Our Visitors Say" />
      <div className="testimonial-grid">
        {items.map(([quote, source]) => (
          <article key={quote}>
            <strong>★★★★★</strong>
            <p>{quote}</p>
            <span>{source}</span>
          </article>
        ))}
        <article className="video-card">
          <span>Video Testimonial</span>
          <strong>Placeholder</strong>
        </article>
      </div>
    </section>
  );
}

export function HelicopterExperience() {
  return (
    <section className="helicopter" id="helicopter">
      <MediaBlock
        src="/creatives/helicopter-site-visit.jpg"
        alt="Helicopter site visit"
        className="wide-media"
      />
      <div>
        <p className="badge">Exclusive Helicopter Site Visit Experience</p>
        <h2>ARRIVE ABOVE THE ORDINARY</h2>
        <p>
          Experience The Soho Farm like never before. Selected visitors can
          witness the complete 100-acre development, Sahyadri mountain ranges,
          green surroundings and panoramic valley views from a truly unique
          perspective.
        </p>
        <ul className="check-list compact">
          <li>Helicopter Site Visit Available</li>
          <li>Aerial View Of Entire 100 Acres</li>
          <li>VIP Premium Arrival Experience</li>
          <li>Limited Availability</li>
        </ul>
        <a className="gold-link" href="#forms">
          Book Helicopter Site Visit
        </a>
      </div>
    </section>
  );
}

function TextInput({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label>
      <span>{label}</span>
      <input type={type} placeholder={label} />
    </label>
  );
}

export function FormsSection() {
  return (
    <section className="forms-section" id="forms">
      <SectionTitle eyebrow="Lead Generation" title="Begin Your Legacy Now" align="center" />
      <div className="forms-grid">
        <form id="brochure">
          <h3>Download Brochure</h3>
          <TextInput label="Full Name" />
          <TextInput label="Mobile Number" type="tel" />
          <TextInput label="Email Address" type="email" />
          <button>Download Brochure</button>
        </form>
        <form>
          <h3>Submit Enquiry</h3>
          <TextInput label="Full Name" />
          <TextInput label="Mobile Number" type="tel" />
          <TextInput label="Email" type="email" />
          <TextInput label="City" />
          <TextInput label="Investment Budget" />
          <label>
            <span>Message</span>
            <textarea placeholder="Message" />
          </label>
          <button>Submit Enquiry</button>
        </form>
        <form>
          <h3>Book Site Visit</h3>
          <TextInput label="Full Name" />
          <TextInput label="Mobile Number" type="tel" />
          <TextInput label="Email Address" type="email" />
          <TextInput label="Preferred Visit Date" type="date" />
          <TextInput label="Number Of Visitors" type="number" />
          <div className="checkboxes">
            <label><input type="checkbox" /> Standard Site Visit</label>
            <label><input type="checkbox" /> VIP Site Visit</label>
            <label><input type="checkbox" /> Helicopter Site Visit</label>
          </div>
          <button>Book Site Visit</button>
        </form>
        <form>
          <h3>Priority Booking</h3>
          <TextInput label="Applicant Name" />
          <TextInput label="Mobile Number" type="tel" />
          <TextInput label="Email Address" type="email" />
          <TextInput label="Address" />
          <TextInput label="Preferred Plot Size" />
          <TextInput label="Booking Amount" />
          <button>Book Now</button>
        </form>
      </div>
    </section>
  );
}

export function FinalCta({ items }: { items: string[] }) {
  return (
    <section className="final-cta">
      <SectionTitle title="THE SOHO FARM" align="center" />
      <h3>Above The Ordinary. Own The View. Own The Legacy.</h3>
      <div className="final-list">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="hero-actions">
        <a href={`tel:${contact.phone.replaceAll(" ", "")}`}>Call Now</a>
        <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}>WhatsApp Now</a>
        <a href="#forms">Book Site Visit</a>
        <a href="#helicopter">Book Helicopter Site Visit</a>
        <a href="#brochure">Download Brochure</a>
      </div>
    </section>
  );
}

export function CreativePromptPanel({
  prompts
}: {
  prompts: { name: string; prompt: string }[];
}) {
  return (
    <section className="section-shell creative-panel">
      <SectionTitle eyebrow="Asset Guide" title="Creative Files To Place In Public" />
      <p>
        Put these generated assets inside <strong>public/creatives</strong>. The
        page already references these names.
      </p>
      <div>
        {prompts.map((item) => (
          <article key={item.name}>
            <h3>{item.name}</h3>
            <p>{item.prompt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ContactFooter() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <h2>THE SOHO FARM</h2>
          <p>Roha - Alibaug Region, Raigad</p>
          <p>Coordinates: 18.4059715, 73.1227036</p>
        </div>
        <div>
          <h3>Contact</h3>
          <p>{contact.phone}</p>
          <p>{contact.whatsapp}</p>
          <p>{contact.email}</p>
        </div>
        <div>
          <h3>Links</h3>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href={contact.maps}>Google Maps</a>
        </div>
      </div>
    </footer>
  );
}

export function FloatingActions() {
  return (
    <div className="floating-actions" aria-label="Quick actions">
      <a href={`tel:${contact.phone.replaceAll(" ", "")}`}>Call</a>
      <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}>WhatsApp</a>
      <a href="#forms">Visit</a>
    </div>
  );
}
