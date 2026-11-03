# RentNest 🏡

A modern, responsive rental marketplace that connects people looking for a home with landlords and property owners who have houses to rent.

Built as a fully self-contained static site — plain **HTML, CSS and JavaScript**, no build step, no framework, no dependencies. Clone it and open `index.html`.

---

## Features

### 🏠 Landing page (`index.html`)
- Full-bleed hero over a photographic background, with headline stats (homes listed, verified landlords, avg. days to move in).
- **Search bar** — location, max price and bedrooms — which carries its filters through to the browse page.
- **Featured listings** — six property cards pulled from the data layer.
- **"How it works"** — three numbered steps (Search & compare → Book a viewing → Move in).
- Two split value sections, one aimed at renters, one at landlords.
- **Testimonials** from renters and landlords.
- A compact **"Touch a room, see the photos"** walkthrough of the interactive floor plan.
- CTA band and a four-column footer.

### 🔎 Browse rentals (`listings.html`)
- Filter bar: location text, max price, bedrooms, property type and sort order (price / rating).
- Quick-filter chips, a live "N homes available" counter and a one-click reset.
- **12 filterable property cards** — photo, price, location, bedrooms, bathrooms, type badge, rating and a short description.
- Every card has an **"Explore N rooms"** button that opens the room modal inline — no page change needed.
- Friendly empty state when nothing matches the filters.

### 🛏️ Property detail (`property.html`)
- **Interactive floor plan** — the centrepiece. Each room on the plan is a tappable hotspot with a name pill: Living Room, Kitchen, Dining Area, Master Bedroom, Bedroom 2, Bedroom 3, Bathroom, Balcony (plus Hallway / Exterior chips where a listing has them).
- Tapping a room opens a **room modal** with the room name, a one-line description, a photo gallery, a thumbnail strip, prev/next arrows, a photo counter and swipe support on touch.
- Photo gallery with a keyboard-navigable lightbox (arrow keys, Esc).
- Price and spec strip (beds, baths, floor area, type), full description, amenities list.
- A real **OpenStreetMap** embed for the location.
- Sticky **"Contact landlord / Book a viewing"** form with inline validation, plus "similar homes nearby".

### 🏷️ List your property (`list-property.html`)
- Four-section landlord submission form: basics, location & size, description + amenity checkboxes, photos + contact details.
- **Working photo uploader** — click or drag & drop, up to 10 photos, each read and downscaled in the browser (no server required).
- **Per-photo room labelling.** Every thumbnail carries its own room dropdown (Living Room, Kitchen, Dining Area, Master Bedroom, Bedroom 2, Bedroom 3, Bathroom, Balcony, Hallway, Exterior/Other) which can be changed or cleared at any time.
- **Grouped by room** with a per-room count ("Balcony · 2 photos") plus a tally row of chips, so balcony shots are clearly separated from bedroom pictures.
- **Validation:** every uploaded photo must carry a room label before the listing can be submitted, with a clear inline error naming how many are unlabelled.
- Submitted listings persist in the browser's `localStorage`, and their room labels flow through to the property page's floor-plan modal — balcony photos appear only under Balcony, bedroom photos only under the bedrooms.
- Landlord FAQ accordion.

---

## Design system

| Token | Value |
|---|---|
| Palette | Warm clay `#C05621`, evergreen `#2F4A3C`, cream `#FAF6EF`, gold accent |
| Typography | **Fraunces** for display headings, **Manrope** for body/UI |
| Spacing | Generous, section-based rhythm |
| Motion | Subtle hover lifts and scroll reveals |

**Accessibility:** skip link, visible focus rings, ARIA labels throughout, `<button>` hotspots with descriptive labels, focus trapping and focus return in modals, **Esc to close**, arrow-key gallery navigation, `role="alert"` on form errors, and a `prefers-reduced-motion` fallback.

**Responsive:** breakpoints at **1024 / 860 / 620 px**, with a mobile hamburger nav; the room modal goes full-screen on phones and hotspot labels shorten.

---

## Project structure

```
rentnest/
├── index.html            # Landing page
├── listings.html         # Browse / filter rentals
├── property.html         # Property detail + interactive floor plan
├── list-property.html    # Landlord submission form with photo labelling
├── styles.css            # All styling
├── app.js                # Listings, filters, floor-plan hotspots, modal, uploader & validation
├── data.js               # Demo listings + room definitions
├── images/               # 25 images: hero, listing photos, room photos, floor plans
├── README.md
├── LICENSE
└── .gitignore
```

---

## Running it locally

**Option 1 — just open it.** Double-click `index.html` (or drag it into a browser). Everything is self-contained and works straight off the filesystem.

**Option 2 — serve the folder** (recommended, mirrors production):

```bash
# Python 3
python3 -m http.server 8000

# or Node
npx serve .
```

Then visit <http://localhost:8000>.

---

## Supabase Backend Setup

RentNest connects to a free Supabase project for persistent listings and media storage.

### 1. Environment Variables & Credentials

Set your Supabase project URL and anon public key in `supabase-config.js` or via a global `window.ENV` object:

```javascript
window.ENV = {
  SUPABASE_URL: "https://your-project-id.supabase.co",
  SUPABASE_ANON_KEY: "your-anon-key"
};
```

These values can be found in your Supabase dashboard under **Project Settings → API**.

---

### 2. Storage Bucket Permissions (`property-images`)

1. In Supabase Dashboard, go to **Storage** and create a new bucket named:
   ```
   property-images
   ```
2. Set the bucket to **Public** so uploaded house images can be rendered publicly on tenant pages via public URLs.
3. Add Storage policies (under **Storage → Policies** for `property-images`):
   - **Allow Public Read Access (SELECT)**:
     ```sql
     CREATE POLICY "Public image access"
     ON storage.objects FOR SELECT
     TO public
     USING (bucket_id = 'property-images');
     ```
   - **Allow Public / Anon Uploads (INSERT)**:
     ```sql
     CREATE POLICY "Allow anon uploads"
     ON storage.objects FOR INSERT
     TO anon
     WITH CHECK (bucket_id = 'property-images');
     ```

---

### 3. Database Table Schema (`properties`)

Execute the following SQL in your Supabase project's **SQL Editor** to create the `properties` table:

```sql
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  city TEXT,
  price BIGINT NOT NULL,
  period TEXT DEFAULT '/year',
  beds INTEGER DEFAULT 1,
  baths INTEGER DEFAULT 1,
  type TEXT DEFAULT 'Apartment',
  description TEXT,
  deposit TEXT,
  amenities TEXT[] DEFAULT '{}',
  image_url TEXT,
  gallery TEXT[] DEFAULT '{}',
  room_photos JSONB DEFAULT '{}'::jsonb,
  landlord_name TEXT,
  landlord_phone TEXT,
  landlord_email TEXT,
  rating NUMERIC(2, 1) DEFAULT 4.7,
  featured BOOLEAN DEFAULT false
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for tenant viewing)
CREATE POLICY "Allow public read access on properties"
ON public.properties FOR SELECT
TO anon, authenticated
USING (true);

-- Allow landlords to insert listings
CREATE POLICY "Allow anon property insertions"
ON public.properties FOR INSERT
TO anon, authenticated
WITH CHECK (true);
```

---

## Configuration

- **Listings data** lives in `data.js` (`RENTALS`, room definitions and amenities). Edit, add or remove entries there and every page updates.
- **Supabase Integration** is configured in `supabase-config.js` and loaded across all pages.
- **Images** are referenced from Supabase Storage public URLs (and fall back to local `images/`).
- If you change `styles.css`, `app.js` or `data.js`, bump the `?v=` query string on its `<link>`/`<script>` tag in the HTML files to bust the cache.

---

## Notes & limitations

- Listings submitted by landlords upload images directly to the `property-images` Supabase Storage bucket and write rows to the `properties` table.
- If Supabase credentials are not provided or the network is offline, RentNest gracefully falls back to local storage and sample listings.
- Property photos are AI-generated placeholders in demo sample data.

---

## Licence

MIT — see [LICENSE](LICENSE).
