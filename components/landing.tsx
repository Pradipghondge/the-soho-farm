"use client";
import { contact } from "@/lib/content";
import { useEffect, useRef, useState } from "react";

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
    <div className={`section-title ${align === "center" ? "center" : ""}`} data-reveal>
      {eyebrow ? <span data-reveal data-delay="1">{eyebrow}</span> : null}
      <h2 data-reveal data-delay="2">{title}</h2>
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
        backgroundImage: `linear-gradient(135deg, rgba(19, 43, 32, 0.16), rgba(8, 11, 10, 0.26)), url("${src}")`
      }}
      data-reveal
    />
  );
}

function NotchedCardForm({ title, type }: { title: string, type: 'enquiry' | 'site-visit' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    isAgent: false,
  });
  const [formState, setFormState] = useState({
    submitting: false,
    error: '',
    success: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ submitting: true, error: '', success: false });

    const payload = {
      ...formData,
      type, // Add the type from props
    };

    try {
      const res = await fetch('/api/public/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setFormState({ submitting: false, error: '', success: true });
        // Reset form
        setFormData({ name: '', email: '', phone: '', isAgent: false });
      } else {
        setFormState({ submitting: false, error: data.message || 'Submission failed.', success: false });
      }
    } catch (error) {
      setFormState({ submitting: false, error: 'An unexpected error occurred.', success: false });
    }
  };

  return (
    <div className="register-form-card-wrapper" data-reveal>
      <div className="register-form-card">
        <img src="/creatives/bird.webp" alt="Hummingbird" className="hummingbird-img" />
        <h3>{title}</h3>
        {formState.success ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h4>Thank You!</h4>
            <p>Your submission has been received.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required/>
            <input name="phone" type="tel" placeholder="Mobile Number" value={formData.phone} onChange={handleChange} required/>
            <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required/>
            <label className="checkbox-label">
              <input name="isAgent" type="checkbox" checked={formData.isAgent} onChange={handleChange} />
              <span>I am a real estate agent</span>
            </label>
            <button type="submit" className="cta-button btn-gold" disabled={formState.submitting}>
              {formState.submitting ? 'Submitting...' : 'Register Now'}
            </button>
            {formState.error && <p style={{ color: 'red', marginTop: '1rem' }}>{formState.error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}


export function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      if (window.scrollY > 50) {
        headerRef.current.classList.add("scrolled");
      } else {
        headerRef.current.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="header-v2" ref={headerRef}>
      <img src="/logo_shoho.png" alt="Soho Farm Logo" className="logo-image" />
      <nav aria-label="Primary navigation">
        <a href="#about" className="nav-link">About</a>
        <a href="#lifestyle" className="nav-link">Lifestyle</a>
        <a href="#location" className="nav-link">Location</a>
      </nav>
    </header>
  );
}

export function Hero() {
  return (
    <section 
      className="hero-v2 section-bridge" 
      id="top"
      style={{ "--gradient-start": "var(--vw-forest)", "--gradient-end": "var(--vw-cream)" } as React.CSSProperties}
    >
      <img src="/logo_shoho.png" alt="Soho Farm Logo" className="hero-logo" />
      <div className="hero-background">
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
        <div className="hero-overlay"></div>
        <div className="hero-bg-texture">
            <span>W</span>
            <span>E</span>
            <span>L</span>
            <span>L</span>
            <span>N</span>
            <span>E</span>
            <span>S</span>
            <span>S</span>
        </div>
      </div>

      <div className="hero-grid">
        <div className="hero-content-left">
          <span className="hero-label" data-reveal>THE WORLD'S</span>
          <h1 data-reveal data-delay="1">LARGEST DESIGNER WELLNESS</h1>
          <div className="hero-badge" data-reveal data-delay="2">RESIDENTIAL TOWER</div>
          <h2 data-reveal data-delay="3">CRAFTED BY VINCITORE</h2>
        </div>
        <div className="hero-content-right">
          <NotchedCardForm title="Register Your Interest" type="enquiry" />
        </div>
      </div>
       <img src="/creatives/bottom-flower.webp" alt="Statue with flowers" className="statue-img" data-reveal/>
    </section>
  );
}

export function AboutSection() {
  return (
    <section 
      className="about-section section-bridge" 
      id="about"
      style={{ "--gradient-start": "var(--vw-cream)", "--gradient-end": "var(--vw-cream-dark)" } as React.CSSProperties}
    >
      <div className="about-grid">
        <div className="about-content" data-reveal>
          <img src="/logo_shoho.png" alt="Vincitore Crest" className="about-logo-image" data-reveal data-delay="1"/>
          <p data-reveal data-delay="2">
            A rare opportunity to own premium hilltop agricultural land amidst the
            breathtaking Sahyadri mountain ranges, dense greenery and open skies.
          </p>
          <p data-reveal data-delay="3">
            Spread across 100 acres, The Soho Farms brings together nature,
            infrastructure, recreation and long-term investment potential. More
            than land ownership, it is an opportunity to own a peaceful weekend
            destination that feels close to Mahabaleshwar, Lonavala and the
            Alibaug coastal belt.
          </p>
        </div>
        <div className="downloads-list" data-reveal>
          <div className="download-item" data-reveal data-delay="1">
            <span>Project Brochure</span>
            <a href="#" className="button-ghost">Download</a>
          </div>
          <div className="download-item" data-reveal data-delay="2">
            <span>Payment Plans</span>
            <a href="#" className="button-ghost">Download</a>
          </div>
          <div className="download-item" data-reveal data-delay="3">
            <span>Unit Layouts</span>
            <a href="#" className="button-ghost">Download</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BrandStory() {
  return (
    <section 
      className="brand-story-v2 section-bridge"
      style={{ "--gradient-start": "var(--vw-cream-dark)", "--gradient-end": "var(--vw-white)" } as React.CSSProperties}
    >
        <div className="brand-story-grid">
            <MediaBlock
                src="/creatives/brand-story-luxury-farm.jpg"
                alt="Luxury farm lifestyle"
            />
            <div data-reveal>
                <SectionTitle eyebrow="Why The Soho Farms?" title="Where Luxury Meets Nature" />
                <p data-reveal data-delay="1">
                Soho represents sophistication, exclusivity and premium living. Farm
                represents freedom, fresh air, nature and true ownership.
                </p>
                <p data-reveal data-delay="2">
                Together, The Soho Farms creates a destination where investment meets a
                pollution-free nature retreat lifestyle.
                </p>
                <strong data-reveal data-delay="3">Above The Ordinary.</strong>
            </div>
        </div>
    </section>
  );
}

export function ImageCarousel({ title, items }: { title: string; items: Pair[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section 
      id="lifestyle"
      className="lifestyle-carousel-section section-bridge"
      style={{ "--gradient-start": "var(--vw-white)", "--gradient-end": "var(--vw-forest)" } as React.CSSProperties}
    >
      <div className="hummingbird-placeholder-alt" data-reveal></div>
      <SectionTitle eyebrow="Experience The Lifestyle" title="A World Of Your Own" align="center" />
      <div className="carousel-wrapper">
        <div className="card-carousel">
          {items.map(([name, src], i) => (
            <article 
                key={name} 
                className={`lifestyle-card ${i === activeIndex ? 'active' : ''}`}
            >
              <MediaBlock src={src} alt={name} className="lifestyle-card-image"/>
              <div className="lifestyle-card-overlay">
                  <div className="lifestyle-card-content">
                      <h4>{name}</h4>
                      <div className="card-arrow-button">→</div>
                  </div>
              </div>
            </article>
          ))}
        </div>
        <div className="carousel-nav" data-reveal data-delay="1">
            <button className="carousel-arrow prev" onClick={prevSlide}>‹</button>
            <button className="carousel-arrow next" onClick={nextSlide}>›</button>
        </div>
        <div className="carousel-dots" data-reveal data-delay="2">
            {items.map((_, i) => (
                <button 
                    key={i} 
                    className={i === activeIndex ? 'is-active' : ''}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                />
            ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView && ref.current) {
      let start = 0;
      const duration = 2000;
      const el = ref.current;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        el.textContent = Math.floor(progress * target).toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }
  }, [inView, target]);

  return <span ref={ref}>0</span>;
}

export function StatsSection({ stats }: { stats: { value: string; label: string }[] }) {
    return (
        <section 
          className="stats-section section-bridge"
          style={{ "--gradient-start": "var(--vw-forest)", "--gradient-end": "var(--vw-cream)" } as React.CSSProperties}
        >
            <div className="stats-content" data-reveal>
                <SectionTitle 
                    eyebrow="The Scale of The Dream"
                    title="An Unprecedented Lifestyle"
                    align="center"
                />
                <div className="stats-grid-v2">
                    {stats.slice(0, 3).map((stat, i) => (
                        <div key={i} className="stat-item" data-reveal data-delay={i}>
                            <div className="stat-value">
                                <AnimatedCounter target={parseInt(stat.value.replace(/,/g, ''), 10)} />
                                {i === 0 && <span>,000 SQ.FT</span>}
                                {i === 1 && <span>+</span>}
                            </div>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="stats-image-container" data-reveal>
                <img src="/creatives/master-plan.jpg" alt="Aerial garden maze" />
            </div>
        </section>
    );
}

export function TowerShowcaseSection() {
    return (
        <section className="tower-showcase-section">
            <div 
                className="tower-image-placeholder" 
                style={{ backgroundImage: `url('/creatives/brand-story-luxury-farm.jpg')` }}
                data-reveal
            />
            <div className="tower-content" data-reveal>
                <SectionTitle 
                    eyebrow="The Crown Jewel"
                    title="A New Benchmark In Luxury"
                />
                 <hr className="gold-rule" data-reveal data-delay="1"/>
                 <p data-reveal data-delay="2">Embodying the pinnacle of nature-inspired luxury, this is the signature experience at The Soho Farms.</p>
                 <a href="#forms" className="explore-more-btn" data-reveal data-delay="3">Explore More</a>
            </div>
        </section>
    );
}

export function ImageGallery() {
  return (
    <section 
      className="image-gallery-section section-bridge"
      style={{ "--gradient-start": "var(--vw-cream)", "--gradient-end": "var(--vw-white)" } as React.CSSProperties}
    >
      <SectionTitle eyebrow="Visual Showcase" title="Explore The Estate" align="center" />
      <div className="image-gallery-grid">
          <MediaBlock src="/creatives/experience-panoramic-view.jpg" alt="Panoramic mountain view" />
          <MediaBlock src="/creatives/helicopter-site-visit.jpg" alt="Helicopter site visit" />
          <MediaBlock src="/creatives/layout-plan.jpg" alt="Layout plan" />
          <MediaBlock src="/creatives/welcome-hilltop.jpg" alt="Welcome to the hilltop" />
      </div>
    </section>
  );
}

export function LocationSection() {
  return (
    <section 
      className="location-section-v2 section-bridge" 
      id="location"
      style={{ "--gradient-start": "var(--vw-white)", "--gradient-end": "var(--vw-forest)" } as React.CSSProperties}
    >
        <SectionTitle 
            eyebrow="Strategic Location"
            title="Next to Dubai's Greenest Community"
            align="center"
        />
        <div className="map-container" data-reveal>
            <iframe 
                src="https://maps.google.com/maps?q=Al%20Barari%20Dubai&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }} data-reveal data-delay="1">
            <a href="https://www.google.com/maps/place/Al+Barari" target="_blank" rel="noopener noreferrer" className="view-locations-btn">View Locations</a>
        </div>
    </section>
  );
}

export function ContactSection() {
    return (
        <section className="contact-section" id="forms">
            <div className="contact-grid">
                <div className="contact-content-left" data-reveal>
                    <h2 data-reveal data-delay="1">Your Journey to a Longer, Better Life
                        <br />
                        <em data-reveal data-delay="2">Begins Here!</em>
                    </h2>
                    <div className="down-arrow-button" data-reveal data-delay="3">↓</div>
                </div>
                <NotchedCardForm title="Contact Us" type="site-visit"/>
            </div>
        </section>
    );
}

export function ContactFooter() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <h2>THE SOHO FARMS</h2>
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

export function ScrollAnimator() {
  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('vw-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('[data-reveal]').forEach(el => {
      revealObserver.observe(el);
    });

    return () => revealObserver.disconnect();
  }, []);

  return null;
}
