/* RentNest — sample listing data (placeholder content for the demo site) */

/* ---------- Room library: what's inside a home, and the photos for each room ---------- */
window.RENTNEST_ROOMS = {
  living: {
    name: "Living Room",
    desc: "The heart of the home \u2014 flooded with natural light, with room to spread out.",
    photos: ["images/room_living.png", "images/detail_lounge.png", "images/room_hallway.png", "images/listing_3.png"]
  },
  kitchen: {
    name: "Kitchen",
    desc: "A fitted kitchen with generous worktops, good storage and space to cook properly.",
    photos: ["images/room_kitchen.png", "images/detail_kitchen.png", "images/listing_4.png"]
  },
  dining: {
    name: "Dining Area",
    desc: "An open dining space that seats four \u2014 ideal for family meals and hosting.",
    photos: ["images/room_dining.png", "images/detail_lounge.png", "images/listing_7.png"]
  },
  bed_master: {
    name: "Master Bedroom",
    desc: "The largest bedroom \u2014 space for a double bed, wardrobes and a quiet reading corner.",
    photos: ["images/room_bed_master.png", "images/detail_bedroom.png", "images/listing_1.png"]
  },
  bed_1: {
    name: "Bedroom",
    desc: "A calm, well-proportioned bedroom with good natural light and built-in storage.",
    photos: ["images/room_bed_master.png", "images/detail_bedroom.png", "images/listing_6.png"]
  },
  bed_2: {
    name: "Bedroom 2",
    desc: "A comfortable second bedroom that suits a double bed or a work-from-home desk.",
    photos: ["images/room_bed_2.png", "images/detail_bedroom.png", "images/listing_5.png"]
  },
  bed_3: {
    name: "Bedroom 3",
    desc: "A flexible third bedroom \u2014 great for children, guests or a study.",
    photos: ["images/room_bed_3.png", "images/detail_bedroom.png", "images/listing_7.png"]
  },
  bath: {
    name: "Bathroom",
    desc: "A clean, modern bathroom with a walk-in shower and a vanity basin.",
    photos: ["images/room_bath.png", "images/detail_bath.png"]
  },
  balcony: {
    name: "Balcony",
    desc: "A private outdoor strip off the living room \u2014 morning coffee, evening breeze.",
    photos: ["images/room_balcony.png", "images/detail_garden.png", "images/listing_5.png"]
  },
  hallway: {
    name: "Hallway",
    desc: "A wide, well-lit hallway that links the living areas to the bedrooms.",
    photos: ["images/room_hallway.png", "images/detail_lounge.png", "images/listing_6.png"]
  },
  exterior: {
    name: "Exterior / Other",
    desc: "The outside of the home and any extra spaces \u2014 compound, parking, garden or entrance.",
    photos: ["images/detail_garden.png", "images/listing_2.png", "images/listing_5.png"]
  }
};

/* ---------- Room labels offered to landlords in the photo-upload flow ---------- */
window.RENTNEST_ROOM_LABELS = [
  { key: "living",     name: "Living Room" },
  { key: "kitchen",    name: "Kitchen" },
  { key: "dining",     name: "Dining Area" },
  { key: "bed_master", name: "Master Bedroom" },
  { key: "bed_2",      name: "Bedroom 2" },
  { key: "bed_3",      name: "Bedroom 3" },
  { key: "bath",       name: "Bathroom" },
  { key: "balcony",    name: "Balcony" },
  { key: "hallway",    name: "Hallway" },
  { key: "exterior",   name: "Exterior / Other" }
];

/* ---------- Floor plan image ---------- */
window.RENTNEST_FLOORPLAN = "images/floorplan_apartment.png";

/* ---------- Room hotspots ----------
   Positions are percentages of the floor-plan image (left, top, width, height),
   measured against the plan's room walls. */
window.RENTNEST_HOTSPOTS = {
  balcony:    { l: 14.5, t: 9.6,  w: 71.0, h: 7.2 },
  living:     { l: 14.5, t: 19.2, w: 42.0, h: 22.9 },
  kitchen:    { l: 58.9, t: 19.2, w: 26.6, h: 22.9 },
  dining:     { l: 14.5, t: 44.4, w: 24.1, h: 17.9 },
  bath:       { l: 40.9, t: 44.4, w: 15.8, h: 17.9 },
  bed_2:      { l: 58.9, t: 44.4, w: 26.6, h: 17.9 },
  bed_master: { l: 14.5, t: 64.5, w: 42.0, h: 26.0 },
  bed_1:      { l: 14.5, t: 64.5, w: 42.0, h: 26.0 },
  bed_3:      { l: 58.9, t: 64.5, w: 26.6, h: 26.0 }
};
window.RENTNEST_LISTINGS = [
  {
    id: "gra-3bed-apartment",
    rooms: ["living", "kitchen", "dining", "bed_master", "bed_2", "bed_3", "bath", "balcony"],
    title: "Sunlit 3-Bedroom Apartment",
    location: "GRA Phase 2, Port Harcourt",
    city: "Port Harcourt",
    price: 2500000,
    period: "/year",
    beds: 3,
    baths: 2,
    type: "Apartment",
    rating: 4.8,
    featured: true,
    badge: { text: "Verified", style: "forest" },
    desc: "Bright, airy apartment on the second floor with a wide balcony, fitted kitchen and 24/7 security. Walking distance to schools, markets and the GRA business district.",
    image: "images/listing_1.png",
    amenities: ["24/7 Security", "Fitted Kitchen", "Balcony", "Parking Space", "Borehole Water", "Prepaid Meter", "Air Conditioning", "Tiled Floors"],
    gallery: ["images/listing_1.png", "images/detail_lounge.png", "images/listing_4.png", "images/detail_bedroom.png", "images/detail_bath.png"],
    coords: { lat: 4.8156, lng: 7.0134 },
    agent: { name: "Adaora Nwosu", initials: "AN", role: "Landlord · Verified owner" }
  },
  {
    id: "rumuokoro-2bed-flat",
    rooms: ["living", "kitchen", "dining", "bed_master", "bed_2", "bath", "balcony"],
    title: "Cosy 2-Bedroom Flat with Garden",
    location: "Rumuokoro, Port Harcourt",
    city: "Port Harcourt",
    price: 1200000,
    period: "/year",
    beds: 2,
    baths: 1,
    type: "Apartment",
    rating: 4.6,
    featured: true,
    badge: { text: "New today", style: "clay" },
    desc: "Warm, quiet flat with a private little garden, secure compound gate and reliable water supply. Perfect for a small family or young professionals.",
    image: "images/listing_2.png",
    amenities: ["Private Garden", "Gated Compound", "Borehole Water", "Fitted Kitchen", "Parking Space", "Tiled Floors"],
    gallery: ["images/listing_2.png", "images/detail_garden.png", "images/listing_6.png", "images/detail_bath.png"],
    coords: { lat: 4.8736, lng: 6.9873 },
    agent: { name: "Emeka Obi", initials: "EO", role: "Landlord · Verified owner" }
  },
  {
    id: "woji-4bed-duplex",
    rooms: ["living", "kitchen", "dining", "bed_master", "bed_2", "bed_3", "bath", "balcony"],
    title: "Executive 4-Bedroom Duplex",
    location: "Woji, Port Harcourt",
    city: "Port Harcourt",
    price: 6500000,
    period: "/year",
    beds: 4,
    baths: 4,
    type: "Duplex",
    rating: 4.9,
    featured: true,
    badge: { text: "Premium", style: "gold" },
    desc: "Spacious family duplex in a serviced estate with a double lounge, ensuite rooms, boys' quarters and a landscaped compound. Genuinely move-in ready.",
    image: "images/listing_3.png",
    amenities: ["24/7 Security", "Boys' Quarters", "Fitted Kitchen", "Balcony", "Parking Space", "Borehole Water", "Generator", "Air Conditioning", "CCTV", "Tiled Floors"],
    gallery: ["images/listing_3.png", "images/detail_lounge.png", "images/detail_kitchen.png", "images/detail_bedroom.png", "images/detail_garden.png"],
    coords: { lat: 4.8284, lng: 7.0401 },
    agent: { name: "Chidinma Eze", initials: "CE", role: "Property manager · Verified" }
  },
  {
    id: "transamadi-3bed",
    rooms: ["living", "kitchen", "dining", "bed_master", "bed_2", "bed_3", "bath", "balcony"],
    title: "Modern 3-Bedroom Apartment",
    location: "Trans-Amadi, Port Harcourt",
    city: "Port Harcourt",
    price: 2000000,
    period: "/year",
    beds: 3,
    baths: 3,
    type: "Apartment",
    rating: 4.5,
    featured: true,
    badge: { text: "Verified", style: "forest" },
    desc: "Contemporary apartment block close to the industrial area and airport road. Open-plan kitchen, ensuite master and a shared rooftop terrace.",
    image: "images/listing_4.png",
    amenities: ["Fitted Kitchen", "Rooftop Terrace", "24/7 Security", "Parking Space", "Prepaid Meter", "Air Conditioning"],
    gallery: ["images/listing_4.png", "images/detail_kitchen.png", "images/detail_lounge.png", "images/detail_bath.png"],
    coords: { lat: 4.8069, lng: 7.0337 },
    agent: { name: "Ibrahim Musa", initials: "IM", role: "Landlord · Verified owner" }
  },
  {
    id: "rumuokwurusi-3bed-bungalow",
    rooms: ["living", "kitchen", "dining", "bed_master", "bed_2", "bed_3", "bath"],
    title: "Family 3-Bedroom Bungalow",
    location: "Rumuokwurusi, Port Harcourt",
    city: "Port Harcourt",
    price: 1800000,
    period: "/year",
    beds: 3,
    baths: 2,
    type: "Bungalow",
    rating: 4.7,
    featured: false,
    badge: { text: "Verified", style: "forest" },
    desc: "Single-storey home on a generous plot with a wide front porch, fenced compound and space for a small kitchen garden. Quiet, family-friendly street.",
    image: "images/listing_5.png",
    amenities: ["Fenced Compound", "Front Porch", "Borehole Water", "Parking Space", "Fitted Kitchen", "Tiled Floors"],
    gallery: ["images/listing_5.png", "images/detail_lounge.png", "images/detail_bedroom.png", "images/detail_garden.png"],
    coords: { lat: 4.8533, lng: 7.0633 },
    agent: { name: "Funmi Adeyemi", initials: "FA", role: "Landlord · Verified owner" }
  },
  {
    id: "peter-odili-1bed",
    rooms: ["living", "kitchen", "bed_1", "bath"],
    title: "Neat 1-Bedroom Apartment",
    location: "Peter Odili Road, Port Harcourt",
    city: "Port Harcourt",
    price: 850000,
    period: "/year",
    beds: 1,
    baths: 1,
    type: "Studio",
    rating: 4.4,
    featured: false,
    badge: { text: "Best value", style: "gold" },
    desc: "Well-kept one-bedroom flat with a calm bedroom, roomy sitting area and a bright kitchen. Ideal first home for a single professional or student.",
    image: "images/listing_6.png",
    amenities: ["Borehole Water", "Prepaid Meter", "Gated Compound", "Tiled Floors", "Fitted Kitchen"],
    gallery: ["images/listing_6.png", "images/detail_lounge.png", "images/detail_bath.png", "images/listing_4.png"],
    coords: { lat: 4.7899, lng: 6.9974 },
    agent: { name: "Grace Etim", initials: "GE", role: "Landlord · Verified owner" }
  },
  {
    id: "rumuibekwe-terrace",
    rooms: ["living", "kitchen", "dining", "bed_master", "bed_2", "bed_3", "bath", "balcony"],
    title: "Terraced 4-Bedroom Duplex",
    location: "Rumuibekwe, Port Harcourt",
    city: "Port Harcourt",
    price: 4200000,
    period: "/year",
    beds: 4,
    baths: 3,
    type: "Duplex",
    rating: 4.7,
    featured: false,
    badge: { text: "Verified", style: "forest" },
    desc: "Newly built terrace duplex in a gated row, with an open-plan ground floor, private yard and dedicated parking bay. Close to Rumuibekwe market and schools.",
    image: "images/listing_7.png",
    amenities: ["Gated Estate", "Private Yard", "Parking Space", "Borehole Water", "Fitted Kitchen", "Air Conditioning", "CCTV"],
    gallery: ["images/listing_7.png", "images/detail_lounge.png", "images/detail_kitchen.png", "images/detail_bedroom.png"],
    coords: { lat: 4.8455, lng: 7.0118 },
    agent: { name: "Uche Okonkwo", initials: "UO", role: "Property manager · Verified" }
  },
  {
    id: "ada-george-studio",
    rooms: ["living", "kitchen", "bed_1", "bath"],
    title: "Private Studio Annex",
    location: "Ada George, Port Harcourt",
    city: "Port Harcourt",
    price: 700000,
    period: "/year",
    beds: 1,
    baths: 1,
    type: "Studio",
    rating: 4.3,
    featured: false,
    badge: { text: "New today", style: "clay" },
    desc: "Self-contained studio with its own entrance and small private patio. Perfect for a student or a professional who travels often.",
    image: "images/listing_8.png",
    amenities: ["Private Entrance", "Patio", "Prepaid Meter", "Borehole Water", "Gated Compound"],
    gallery: ["images/listing_8.png", "images/detail_bath.png", "images/detail_lounge.png", "images/listing_6.png"],
    coords: { lat: 4.8661, lng: 6.9768 },
    agent: { name: "Blessing Ibe", initials: "BI", role: "Landlord · Verified owner" }
  },
  {
    id: "gra-5bed-villa",
    rooms: ["living", "kitchen", "dining", "bed_master", "bed_2", "bed_3", "bath", "balcony"],
    title: "Luxury 5-Bedroom Detached Villa",
    location: "GRA Phase 3, Port Harcourt",
    city: "Port Harcourt",
    price: 9500000,
    period: "/year",
    beds: 5,
    baths: 5,
    type: "Duplex",
    rating: 5.0,
    featured: true,
    badge: { text: "Premium", style: "gold" },
    desc: "Grand detached villa on a double plot with a landscaped garden, ensuite rooms throughout, a fitted smart kitchen, staff quarters and a double garage.",
    image: "images/listing_3.png",
    amenities: ["24/7 Security", "Landscaped Garden", "Double Garage", "Boys' Quarters", "Fitted Kitchen", "Generator", "Air Conditioning", "CCTV", "Borehole Water", "Balcony"],
    gallery: ["images/listing_3.png", "images/detail_garden.png", "images/detail_kitchen.png", "images/detail_lounge.png", "images/detail_bedroom.png"],
    coords: { lat: 4.8207, lng: 7.0039 },
    agent: { name: "Chidinma Eze", initials: "CE", role: "Property manager · Verified" }
  },
  {
    id: "eliozu-2bed",
    rooms: ["living", "kitchen", "bed_master", "bed_2", "bath"],
    title: "Budget 2-Bedroom Flat",
    location: "Eliozu, Port Harcourt",
    city: "Port Harcourt",
    price: 950000,
    period: "/year",
    beds: 2,
    baths: 1,
    type: "Apartment",
    rating: 4.2,
    featured: false,
    badge: { text: "Best value", style: "gold" },
    desc: "Simple, clean and affordable two-bedroom flat in a friendly neighbourhood, with a shared compound, steady water and easy road access.",
    image: "images/listing_2.png",
    amenities: ["Borehole Water", "Gated Compound", "Tiled Floors", "Parking Space"],
    gallery: ["images/listing_2.png", "images/detail_lounge.png", "images/detail_bedroom.png", "images/detail_bath.png"],
    coords: { lat: 4.8617, lng: 7.0186 },
    agent: { name: "Grace Etim", initials: "GE", role: "Landlord · Verified owner" }
  },
  {
    id: "ozuoba-3bed",
    rooms: ["living", "kitchen", "dining", "bed_master", "bed_2", "bed_3", "bath", "balcony"],
    title: "Tasteful 3-Bedroom Apartment",
    location: "Ozuoba, Port Harcourt",
    city: "Port Harcourt",
    price: 1500000,
    period: "/year",
    beds: 3,
    baths: 2,
    type: "Apartment",
    rating: 4.6,
    featured: false,
    badge: { text: "Verified", style: "forest" },
    desc: "Stylish apartment with a bright lounge, ensuite master, fitted wardrobes and a small balcony overlooking a tree-lined street.",
    image: "images/listing_1.png",
    amenities: ["Balcony", "Fitted Kitchen", "Borehole Water", "Prepaid Meter", "Parking Space", "Air Conditioning"],
    gallery: ["images/listing_1.png", "images/detail_bedroom.png", "images/detail_lounge.png", "images/listing_4.png"],
    coords: { lat: 4.8849, lng: 6.9497 },
    agent: { name: "Emeka Obi", initials: "EO", role: "Landlord · Verified owner" }
  },
  {
    id: "mgbuoba-4bed",
    rooms: ["living", "kitchen", "dining", "bed_master", "bed_2", "bed_3", "bath"],
    title: "Spacious 4-Bedroom Home",
    location: "Mgbuoba, Port Harcourt",
    city: "Port Harcourt",
    price: 3200000,
    period: "/year",
    beds: 4,
    baths: 4,
    type: "Bungalow",
    rating: 4.8,
    featured: false,
    badge: { text: "Verified", style: "forest" },
    desc: "Roomy bungalow with four ensuite bedrooms, a large family lounge, a proper dining area and a big fenced compound with parking for three cars.",
    image: "images/listing_5.png",
    amenities: ["Ensuite Rooms", "Fenced Compound", "Parking Space", "Borehole Water", "Fitted Kitchen", "CCTV", "Air Conditioning", "Tiled Floors"],
    gallery: ["images/listing_5.png", "images/detail_lounge.png", "images/detail_kitchen.png", "images/detail_bedroom.png"],
    coords: { lat: 4.8816, lng: 6.9653 },
    agent: { name: "Funmi Adeyemi", initials: "FA", role: "Landlord · Verified owner" }
  }
];

/* ---------- Local store: listings submitted by landlords (demo persistence) ----------
   Keeps the room labels attached to each photo so the property page's floor-plan
   modal can show balcony photos under Balcony and bedroom photos under bedrooms. */
window.RENTNEST_STORE = (function () {
  var KEY = "rentnest.submitted.v1";

  function read() {
    try { return JSON.parse(window.localStorage.getItem(KEY) || "[]") || []; }
    catch (e) { return []; }
  }
  function write(list) {
    try { window.localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {}
  }

  return {
    all: read,
    add: function (listing) {
      var list = read();
      list.unshift(listing);
      write(list.slice(0, 40));
      return listing;
    },
    /* submitted listings first, then the built-in sample data (no duplicates) */
    merge: function (base) {
      var mine = read();
      var ids = {};
      mine.forEach(function (m) { ids[m.id] = 1; });
      return mine.concat((base || []).filter(function (b) { return !ids[b.id]; }));
    }
  };
})();
