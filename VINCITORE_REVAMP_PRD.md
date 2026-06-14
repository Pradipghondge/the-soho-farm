# PRD: Vincitore Wellness Estate — Website UI Revamp
**Version:** 1.0  
**Date:** June 14, 2026  
**Status:** Ready for Implementation  
**Agent Log File:** `AGENT_LOG.md` (CLI must maintain this throughout)

---

## 0. Agent Instructions

Before touching any file, the CLI agent must:
1. Create `AGENT_LOG.md` in the project root
2. Log every decision, deviation, and observation there
3. Never truncate output — deliver complete files
4. Cross-reference `public/creative/` for all image assets before hardcoding paths
5. Check `package.json` before importing any library

---

## 1. Project Overview

**What this is:** A full UI revamp of the Vincitore Wellness Estate marketing/landing page. This is NOT a rebuild from scratch — all content, copy, sections, and functionality remain identical. We are upgrading the visual design, typography, layout system, and UI aesthetics only.

**Design ambition:** Elevate the existing luxury real-estate landing page into something that feels like an editorial luxury magazine meets a premium property brand — think Architectural Digest meets a Dubai ultra-luxury developer. Go beyond the reference screenshots. The reference site is the floor, not the ceiling.

**Reference site:** vincitorerealty.com/vincitore-wellness-estate (screenshots provided)

---

## 2. Design System

### 2.1 Color Palette

| Token Name         | Hex Value   | Usage                                      |
|--------------------|-------------|--------------------------------------------|
| `--vw-forest`      | `#1B3A2D`   | Primary dark green (hero bg, dark sections)|
| `--vw-deep-forest` | `#0F2318`   | Darker variant for depth/overlays          |
| `--vw-gold`        | `#C9A84C`   | Primary accent (CTAs, highlights, stats)   |
| `--vw-gold-light`  | `#E8C97E`   | Lighter gold for hover/shimmer             |
| `--vw-cream`       | `#F5F0E8`   | Light section backgrounds                  |
| `--vw-cream-dark`  | `#EDE6D6`   | Secondary cream variant                    |
| `--vw-white`       | `#FFFFFF`   | Card surfaces, form backgrounds            |
| `--vw-text-dark`   | `#1A1A1A`   | Body text on light backgrounds             |
| `--vw-text-muted`  | `#6B6B6B`   | Subheadings, labels, captions              |
| `--vw-teal`        | `#1A8C8C`   | Accent for map section, secondary CTA      |

### 2.2 Typography

**Display Font:** `Cormorant Garamond` (Google Fonts)  
- Used for all large headings, section titles, hero text  
- Weights: 400, 600, 700  
- Style: Italic variant for "Today", "Begins Here!" style emphasis words  
- All-caps tracking for subheadline labels (e.g. "THE WORLD'S", "PROJECT BY")

**Body Font:** `Inter` (Google Fonts)  
- Weights: 300, 400, 500, 600  
- Used for body copy, form labels, navigation, captions  
- Letter-spacing: 0.02em for UI elements, 0.12em for all-caps labels

**Accent Italic:** `Italiana` or `Playfair Display Italic`  
- Used sparingly for script-style word within headings (like "Today" in "Register Today")

**Type Scale:**
```
--vw-text-hero: clamp(3rem, 7vw, 7rem)       /* Hero headline */
--vw-text-display: clamp(2rem, 5vw, 4.5rem)  /* Section titles */
--vw-text-title: clamp(1.5rem, 3vw, 2.5rem)  /* Card/block titles */
--vw-text-body: 1rem                          /* Body copy */
--vw-text-label: 0.75rem                      /* All-caps labels */
--vw-text-caption: 0.875rem                   /* Captions, footnotes */
```

### 2.3 Spacing & Layout

- Max content width: `1280px` centered
- Section padding: `clamp(60px, 8vw, 120px)` top and bottom
- Grid: 12-column CSS grid for internal section layouts
- Border radius system:
  - Cards: `24px`
  - Buttons: `100px` (full pill)
  - Form container: `32px`
  - Notched/organic card: use `clip-path: path(...)` (see Section 4)

### 2.4 Shadows & Depth

```css
--vw-shadow-card: 0 8px 40px rgba(0,0,0,0.12);
--vw-shadow-elevated: 0 24px 80px rgba(0,0,0,0.2);
--vw-shadow-gold: 0 4px 24px rgba(201,168,76,0.25);
```

### 2.5 Motion Principles

- Use `IntersectionObserver` for scroll-triggered reveals
- Default entrance: `opacity 0 → 1` + `translateY(20px → 0)`, duration `0.6s`, ease `cubic-bezier(0.16,1,0.3,1)`
- Stagger children by `0.1s` delay
- Stat counters animate on scroll enter
- Hover transitions: `0.25s ease`
- Respect `prefers-reduced-motion`

---

## 3. Section-by-Section Spec

### Section 1 — Hero (Full Viewport)

**Content (keep as-is):**
- "THE WORLD'S" label
- "LARGEST DESIGNER WELLNESS" — massive display text
- "RESIDENTIAL TOWER" — pill badge
- "CRAFTED BY VINCITORE"
- "Explore More" CTA with down-arrow circle
- Register form panel (right side)
- Vincitore Wellness Estate logo (circular seal, top center)
- Hummingbird image (top right of form)
- Greek statue with flowers (bottom center)
- Background: large typographic letters (W, E, L, etc.) watermark

**Design Upgrades:**
- Background: Use `public/creative/` hero image OR dark forest texture with typographic watermark letters rendered in `--vw-gold` at 5% opacity
- Hero heading: Cormorant Garamond, 700 weight, in `--vw-gold` with a subtle text-shadow for depth
- "RESIDENTIAL TOWER" badge: dark forest pill with gold border and gold text, letter-spaced 0.2em
- Register form: Implement the **notched card** (see Section 4 below)
- Form inputs: bottom-border only style (no box), text `--vw-white`, placeholder `rgba(255,255,255,0.4)`
- CTA button "REGISTER YOUR INTEREST": `--vw-gold` pill button, black text, hover → gold shimmer via `background-position` animation
- Hummingbird: positioned `absolute`, slightly overflowing the form card top-right
- Greek statue: positioned absolute at bottom, PNG with transparent bg blending into scene
- Logo: centered top, golden circular seal, subtle drop shadow
- Layout: CSS Grid, left column (copy) 55%, right column (form) 45%

---

### Section 2 — About / Brochure Download

**Content (keep as-is):**
- Vincitore Wellness Estate logo (gold unicorn crest)
- Two paragraphs of body copy about the project
- PROJECT BROCHURE — Download PDF
- PAYMENT PLANS — Download PDF
- UNIT LAYOUTS — Download PDF

**Design Upgrades:**
- Background: `--vw-cream`
- Left side: logo + copy in a vertical centered stack
- Right side: three download rows with a thin `--vw-gold` divider between each
- Each row: all-caps label left, pill download button right (ghost style — gold border, gold text, white bg, hover → gold fill)
- Download button: has a circular gold download icon inside the pill
- Section reveals on scroll with stagger

---

### Section 3 — Features / Wellness Carousel

**Content (keep as-is):**
- "GCC'S FIRST SCIENTIFICALLY DESIGNED & CERTIFIED WELLNESS HOMES"
- "CRAFTED BY SCIENTISTS, DOCTORS, & ENGINEERS" subtitle
- Carousel of room/interior images with feature callouts (Circadian Rhythm Lighting, Soundproof Insulation, Designer Wardrobes, etc.)
- Vincitore Wellness Estate logo (gold, mid-section)
- "RECHARGE YOUR SENSES" heading
- Prev/Next arrows
- Images from `public/creative/`

**Design Upgrades:**
- Background: `--vw-cream-dark`
- Title: Cormorant Garamond 700, dark forest color, full-width centered
- Subtitle: Inter all-caps, letter-spaced, `--vw-text-muted`
- Carousel: left = full-bleed image (50% width), right = feature content panel
- Feature icons: render as thin-line gold SVG icons
- "RECHARGE YOUR SENSES": large Cormorant italic
- Nav arrows: thin circle buttons with arrow SVG, gold border
- Active dot indicator at bottom

---

### Section 4 — Lifestyle Cards (Image Slider)

**Content (keep as-is):**
- "EXPERIENCE THE WORLD'S"
- "FIRST DESIGNER WELLNESS LIFESTYLE"
- "Wellness In Every Inch" subtitle (gold, italic)
- Description text
- Three cards: Wellness in Architecture, Wellness in Your Surrounding, Wellness in Lifestyle
- Each card has a bottom-left label + arrow button
- Carousel dots
- Hummingbird decorative image

**Design Upgrades:**
- Background: `--vw-white`
- Headline: Cormorant Garamond, mix of dark and gold weights
- Hummingbird: absolute positioned top-right, larger, more prominent
- Cards: `border-radius: 24px`, full image fill, dark gradient overlay at bottom
- Label on card: white, Inter 500
- Arrow button: circle, frosted glass style (`backdrop-filter: blur`)
- Dots: small, `--vw-gold` active, `--vw-cream-dark` inactive
- Middle card is slightly elevated (scale 1.04) to create "featured" center feel
- Smooth CSS scroll snap carousel

---

### Section 5 — Stats / Amenities

**Content (keep as-is):**
- "THE LARGEST COLLECTION OF"
- "DESIGNER WELLNESS AMENITIES"
- 200,000 SQ.FT — OF CURATED LIFESTYLE SPACES
- 65+ — EXCLUSIVE WELLNESS EXPERIENCES
- 8 — FLOORS OF WELLNESS LIVING
- Large image below (aerial garden maze)

**Design Upgrades:**
- Background: `--vw-forest` (dark green)
- Title line 1: Inter all-caps, `--vw-white`, small, spaced
- Title line 2: Cormorant Garamond 700, `--vw-gold`, very large
- Stats: Animated counter on scroll, Cormorant Garamond for numbers in `--vw-gold`, Inter for labels in `--vw-white`
- Thin vertical `--vw-gold` dividers between stats at 30% opacity
- Image below: rounded-top corners `32px`, overflow hidden, subtle parallax on scroll
- Image aspect ratio: 16:7

---

### Section 6 — Tower Showcase

**Content (keep as-is):**
- Full-width building render (the white tower against blue sky)
- "THE CROWN JEWEL OF"
- "DESIGNER WELLNESS LIVING"
- Vincitore logo + "PROJECT BY VINCITORE"
- "Explore More" CTA

**Design Upgrades:**
- Layout: image takes left ~60% of viewport, text right ~40%
- Text column background: gradient from transparent to `--vw-cream` going left
- "THE CROWN JEWEL OF": Inter all-caps label, small, muted
- "DESIGNER WELLNESS LIVING": Cormorant Garamond 700, `--vw-forest`, massive display
- Logo: centered in text column, gold tint
- "Explore More" CTA: circle outline button with down arrow, forest color
- Subtle parallax on the building image (moves slightly on scroll)

---

### Section 7 — Location / Map

**Content (keep as-is):**
- "STRATEGIC LOCATION NEXT TO"
- "DUBAI'S GREENEST COMMUNITY" (title)
- Custom illustrated map showing Vincitore's location relative to landmarks
- "View Locations" button with arrow

**Design Upgrades:**
- Background: `--vw-white`
- Title: same two-line pattern as other sections (Inter label + Cormorant display)
- Map: contained in `border-radius: 24px` card, `--vw-shadow-elevated`
- "View Locations" button: pill style, `--vw-forest` bg, `--vw-white` text, gold arrow circle
- Map image from `public/creative/` or external if not present

---

### Section 8 — Contact / Bottom CTA

**Content (keep as-is):**
- "Your Journey to a Longer, Better Life"
- "Begins Here!" (in gold)
- Down arrow circle button
- Contact form panel (Name, Phone with flag+code, Email, Real Estate Agent dropdown, Register Now button)
- Hummingbird image top-right of form

**Design Upgrades:**
- Background: `--vw-forest`
- Left text: Cormorant Garamond, `--vw-white`, large
- "Begins Here!": Cormorant Garamond italic, `--vw-gold`, even larger
- Arrow button: circle border `--vw-white`
- Form panel: implement **notched card shape** (see Section 4 below) in `--vw-white`
- Form header "Contact Us": Cormorant Garamond, `--vw-forest`
- Input style: bottom-border only, labels float on focus
- Dropdown: custom styled with gold arrow
- Register button: `--vw-gold` pill, `--vw-text-dark`, letter-spaced, hover shimmer
- Hummingbird: overflow positioned top-right of the form card

---

## 4. Notched Card Shape (Critical UI Pattern)

This is the signature UI element across the site — the contact/register form card has an organic notched corner.

**Implementation using clip-path:**

```css
.notched-card {
  clip-path: path("M 32 0 L calc(100% - 80px) 0 Q 100% 0 100% 32px L 100% calc(100% - 32px) Q 100% 100% calc(100% - 32px) 100% L 32px 100% Q 0 100% 0 calc(100% - 32px) L 0 80px Q 0 0 32px 0 Z");
  /* The top-right corner has an inward notch where the hummingbird sits */
}
```

For the actual notch in the top-right (the concave curve where the hummingbird perches):

```css
.notched-card-form {
  position: relative;
  background: white;
  border-radius: 32px 0 32px 32px; /* fallback */
  /* Override with clip-path for the notch effect */
  clip-path: path("M 0 40 Q 0 0 40 0 L calc(100% - 100px) 0 Q calc(100% - 20px) 0 calc(100%) 80px L 100% calc(100% - 40px) Q 100% 100% calc(100% - 40px) 100% L 40px 100% Q 0 100% 0 calc(100% - 40px) Z");
}
```

**Note to CLI:** The exact path values will need tweaking based on actual card dimensions. Start with `border-radius` and layered pseudo-elements as a progressive enhancement, then apply `clip-path` for the notch.

**Alternative approach with pseudo-element cutout:**
```css
.card-wrapper {
  position: relative;
}
.card-wrapper::after {
  content: '';
  position: absolute;
  top: -1px;
  right: -1px;
  width: 90px;
  height: 90px;
  background: var(--section-bg); /* matches parent background */
  border-bottom-left-radius: 60px;
}
```
This "fakes" the notch by overlaying the background color in the corner — simpler and more reliable cross-browser.

---

## 5. Navigation Bar

**Design:**
- Fixed top, starts transparent, becomes `rgba(15, 35, 24, 0.95)` with `backdrop-filter: blur(20px)` on scroll
- Left: Vincitore logo
- Center: Nav links — Inter 400, `--vw-white`, hover → `--vw-gold`, 0.12em letter-spacing
- Right: "Register Now" pill CTA — `--vw-gold` bg, dark text
- Mobile: hamburger → slide-down menu

---

## 6. Scroll & Animation Behavior

```javascript
// Pattern for all scroll reveals
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
```

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), 
              transform 0.6s cubic-bezier(0.16,1,0.3,1);
}
[data-reveal].revealed {
  opacity: 1;
  transform: translateY(0);
}
[data-reveal]:nth-child(2) { transition-delay: 0.1s; }
[data-reveal]:nth-child(3) { transition-delay: 0.2s; }
```

**Stat counter animation:**
```javascript
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
```

---

## 7. Form Component Spec

```
- Name: bottom-border input, white bg
- Phone: flag emoji + country code dropdown (UAE +971 default) + number input inline
- Email: bottom-border input
- Real Estate Agent: custom styled select with gold chevron
- Submit: full-width pill, --vw-gold, uppercase tracking, hover: shimmer effect
- Validation: inline error state, red bottom-border + error message below field
```

---

## 8. Asset References

All images should be pulled from `public/creative/`. Before using any image, the CLI must:
1. `ls public/creative/` and log all files in `AGENT_LOG.md`
2. Match image usage to the appropriate section
3. Never hardcode paths that don't exist
4. If an image is missing, use a `--vw-forest` colored placeholder div with correct aspect ratio

---

## 9. File Structure

```
project/
├── AGENT_LOG.md              ← CLI creates and maintains this
├── VINCITORE_REVAMP_PRD.md   ← This document
├── src/
│   ├── styles/
│   │   ├── tokens.css        ← All CSS custom properties
│   │   ├── base.css          ← Reset, typography base
│   │   ├── components.css    ← Buttons, cards, forms, nav
│   │   └── sections.css      ← Per-section styles
│   ├── scripts/
│   │   ├── animations.js     ← Scroll reveals, counters
│   │   ├── carousel.js       ← All carousel logic
│   │   └── nav.js            ← Navbar scroll behavior
│   └── index.html            ← Main file (or component files if React)
└── public/
    └── creative/             ← All existing image assets
```

---

## 10. Quality Checklist (CLI must verify before done)

- [ ] All sections present with original content intact
- [ ] Notched card implemented on both hero form and contact form
- [ ] Hummingbird PNG positioned correctly on both forms (overflow top-right)
- [ ] Stat counters animate on scroll
- [ ] Carousel works with prev/next and dots
- [ ] Nav becomes opaque on scroll
- [ ] All images from public/creative/ matched correctly
- [ ] Google Fonts loaded: Cormorant Garamond + Inter
- [ ] prefers-reduced-motion respected
- [ ] Mobile responsive down to 375px
- [ ] No text overlaid directly on image areas without dark gradient backing
- [ ] AGENT_LOG.md updated throughout

---

## 11. What to Improve Over the Reference

The reference site (screenshots) is good. Make these specific upgrades:

1. **Typography hierarchy:** The reference site mixes too many type styles. Enforce strict Cormorant + Inter system throughout.
2. **Whitespace:** The reference is cramped in places. Add more breathing room between sections.
3. **Card consistency:** Not all cards have consistent radius/shadow. Unify.
4. **The notched form card:** The reference has a simple card. We want the actual notched clip-path corner where the hummingbird sits.
5. **Gold treatment:** The reference gold feels flat. Add a very subtle linear gradient to gold backgrounds (`#C9A84C → #E8C97E → #C9A84C`) for depth.
6. **Section transitions:** Add subtle background color transitions between sections rather than hard cuts.
7. **Stats section:** Make the numbers bigger and more impactful. Consider `font-size: clamp(4rem, 10vw, 8rem)` for the stat numerals.
8. **Form UX:** The reference has no focus states. Add clear `--vw-gold` bottom-border focus state on all inputs.
