// Mock vehicle inventory — structured for easy CMS swap later
// TODO: Replace mock data with real CMS/database integration

export interface Vehicle {
  id: string;
  slug: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  mileage: number;
  price: number;
  bodyType: "Saloon" | "Hatchback" | "Estate" | "SUV" | "Coupe" | "MPV" | "Van" | "Convertible";
  transmission: "Manual" | "Automatic";
  fuelType: "Petrol" | "Diesel" | "Hybrid" | "Electric";
  engineSize: string;
  colour: string;
  doors: number;
  seats: number;
  serviceHistory: "Full" | "Partial" | "None";
  previousOwners: number;
  mot: string; // ISO date
  description: string;
  features: string[];
  images: string[]; // paths relative to /public
  status: "Available" | "Sold" | "Reserved";
  featured: boolean;
  badge?: string; // e.g. "Best Value", "Just Arrived"
}

export const vehicles: Vehicle[] = [
  {
    id: "1",
    slug: "2019-audi-sq5-tfsi-quattro",
    make: "Audi",
    model: "SQ5",
    variant: "3.0 TFSI Quattro S Tronic",
    year: 2019,
    mileage: 42000,
    price: 34995,
    bodyType: "SUV",
    transmission: "Automatic",
    fuelType: "Petrol",
    engineSize: "3.0",
    colour: "Mythos Black",
    doors: 5,
    seats: 5,
    serviceHistory: "Full",
    previousOwners: 2,
    mot: "2026-03-15",
    description:
      "Stunning Audi SQ5 finished in Mythos Black with a full Audi service history. Performance SUV with 354bhp V6 TFSI engine, adaptive air suspension, and luxurious interior. One of the cleanest examples on the market — documents verified and sent prior to viewing.",
    features: [
      "Adaptive Air Suspension",
      "Bang & Olufsen Sound System",
      "Panoramic Sunroof",
      "Heated & Ventilated Seats",
      "Virtual Cockpit Plus",
      "Matrix LED Headlights",
      "Lane Assist",
      "Parking Plus with Rear Camera",
      "Privacy Glass",
      "20-inch Alloy Wheels",
    ],
    images: ["/images/vehicle-placeholder.svg"], // TODO: Replace with real vehicle photos
    status: "Available",
    featured: true,
    badge: "Best Value",
  },
  {
    id: "2",
    slug: "2021-volkswagen-golf-style-tsi",
    make: "Volkswagen",
    model: "Golf",
    variant: "1.5 eTSI Style DSG",
    year: 2021,
    mileage: 18500,
    price: 22495,
    bodyType: "Hatchback",
    transmission: "Automatic",
    fuelType: "Petrol",
    engineSize: "1.5",
    colour: "Urano Grey",
    doors: 5,
    seats: 5,
    serviceHistory: "Full",
    previousOwners: 1,
    mot: "2026-08-10",
    description:
      "One-owner Golf Style in rare Urano Grey. Mild hybrid eTSI engine delivers excellent economy without sacrificing performance. Full VW dealer service history, everything exactly as described — no surprises.",
    features: [
      "Harman Kardon Sound System",
      "Digital Cockpit Pro",
      "Wireless Apple CarPlay",
      "IQ.DRIVE Driver Assist",
      "Adaptive Cruise Control",
      "LED Matrix Headlights",
      "Heated Front Seats",
      "Park Distance Control",
      "Keyless Entry & Start",
      "18-inch Montreal Alloys",
    ],
    images: ["/images/volkswagen-golf-black-hatchback.webp"],
    status: "Available",
    featured: true,
    badge: "Just Arrived",
  },
  {
    id: "3",
    slug: "2018-volkswagen-polo-beats-tsi",
    make: "Volkswagen",
    model: "Polo",
    variant: "1.0 TSI Beats",
    year: 2018,
    mileage: 31000,
    price: 10995,
    bodyType: "Hatchback",
    transmission: "Manual",
    fuelType: "Petrol",
    engineSize: "1.0",
    colour: "Reflex Silver",
    doors: 5,
    seats: 5,
    serviceHistory: "Full",
    previousOwners: 2,
    mot: "2025-11-20",
    description:
      "Great entry-level hatch with the popular Beats edition — Beats audio system, sportier trim, and VW reliability. Full service history, drives superbly. Perfect first car or city runabout.",
    features: [
      "Beats Audio System",
      "Touchscreen Navigation",
      "Front & Rear Sensors",
      "Automatic Headlights",
      "Cruise Control",
      "Bluetooth Connectivity",
      "LED DRLs",
      "Alloy Wheels",
    ],
    images: ["/images/vehicle-placeholder.svg"], // TODO: Replace with real vehicle photos
    status: "Available",
    featured: false,
    badge: "Great Price",
  },
  {
    id: "4",
    slug: "2020-skoda-fabia-se-l-tsi",
    make: "Skoda",
    model: "Fabia",
    variant: "1.0 TSI SE L",
    year: 2020,
    mileage: 22000,
    price: 11495,
    bodyType: "Hatchback",
    transmission: "Manual",
    fuelType: "Petrol",
    engineSize: "1.0",
    colour: "Moon White",
    doors: 5,
    seats: 5,
    serviceHistory: "Full",
    previousOwners: 1,
    mot: "2026-01-14",
    description:
      "Low-mileage Fabia SE L in pristine white. Top-spec trim includes full-link infotainment, heated seats, and rear sensors. One careful owner — exactly the no-fuss, reliable hatchback that gets great buyer feedback.",
    features: [
      "Bolero Infotainment with Navigation",
      "Heated Front Seats",
      "Rear Parking Sensors",
      "Adaptive Cruise Control",
      "SmartLink (Apple CarPlay / Android Auto)",
      "Front Assist",
      "Lane Assist",
      "Virtual Pedal",
      "Alloy Wheels",
    ],
    images: ["/images/vehicle-placeholder.svg"], // TODO: Replace with real vehicle photos
    status: "Available",
    featured: false,
  },
  {
    id: "5",
    slug: "2017-lexus-ls460-l-executive",
    make: "Lexus",
    model: "LS460",
    variant: "4.6 V8 L Executive",
    year: 2017,
    mileage: 55000,
    price: 29995,
    bodyType: "Saloon",
    transmission: "Automatic",
    fuelType: "Petrol",
    engineSize: "4.6",
    colour: "Obsidian Black",
    doors: 4,
    seats: 5,
    serviceHistory: "Full",
    previousOwners: 2,
    mot: "2026-05-28",
    description:
      "The Lexus LS460 L is one of the world's great luxury saloons — whisper-quiet V8, rear-seat entertainment, and build quality that shames competitors twice the price. Full Lexus service history, two meticulous owners. Honest, transparent sale — vehicle documents available before you visit.",
    features: [
      "Mark Levinson Premium Surround Sound",
      "Rear-Seat Entertainment",
      "Rear Power Seats with Memory",
      "Massage Function",
      "Pre-Collision System",
      "Adaptive Variable Suspension",
      "Panoramic Roof",
      "Power Boot",
      "LED Headlights",
      "20-inch Alloys",
    ],
    images: ["/images/vehicle-placeholder.svg"], // TODO: Replace with real vehicle photos
    status: "Available",
    featured: true,
    badge: "Luxury Pick",
  },
  {
    id: "6",
    slug: "2019-toyota-aygo-x-trend-vvt-i",
    make: "Toyota",
    model: "Aygo",
    variant: "1.0 VVT-i X-Trend",
    year: 2019,
    mileage: 27500,
    price: 8495,
    bodyType: "Hatchback",
    transmission: "Manual",
    fuelType: "Petrol",
    engineSize: "1.0",
    colour: "Silver",
    doors: 5,
    seats: 4,
    serviceHistory: "Full",
    previousOwners: 1,
    mot: "2026-02-09",
    description:
      "Peppy and practical city car in smart Silver. Toyota reliability at its best — perfect urban runabout with great running costs. Full history, no issues, ready to drive away.",
    features: [
      "Touchscreen with Bluetooth",
      "Apple CarPlay",
      "Reversing Camera",
      "Automatic Emergency Braking",
      "Road Sign Assist",
      "Alloy Wheels",
      "LED DRLs",
      "Air Conditioning",
    ],
    images: ["/images/toyota-aygo-silver-hatchback.webp"],
    status: "Available",
    featured: false,
  },
  {
    id: "7",
    slug: "2020-kia-rio-3-isg",
    make: "Kia",
    model: "Rio",
    variant: "1.25 MPi 3 ISG",
    year: 2020,
    mileage: 19800,
    price: 9795,
    bodyType: "Hatchback",
    transmission: "Manual",
    fuelType: "Petrol",
    engineSize: "1.25",
    colour: "Snow White Pearl",
    doors: 5,
    seats: 5,
    serviceHistory: "Full",
    previousOwners: 1,
    mot: "2026-06-30",
    description:
      "Low-mileage Kia Rio 3 — backed by Kia's legendary reliability record. Immaculate inside and out. Full dealer service history, one owner, great family city car with strong residuals.",
    features: [
      "8-inch Touchscreen",
      "Apple CarPlay / Android Auto",
      "Rear Camera",
      "Autonomous Emergency Braking",
      "Lane Keep Assist",
      "Cruise Control",
      "Heated Front Seats",
      "Alloy Wheels",
    ],
    images: ["/images/vehicle-placeholder.svg"], // TODO: Replace with real vehicle photos
    status: "Available",
    featured: false,
    badge: "Low Mileage",
  },
  {
    id: "8",
    slug: "2020-bentley-bentayga-v8-first-edition",
    make: "Bentley",
    model: "Bentayga",
    variant: "4.0 V8 First Edition",
    year: 2020,
    mileage: 28000,
    price: 159995,
    bodyType: "SUV",
    transmission: "Automatic",
    fuelType: "Petrol",
    engineSize: "4.0",
    colour: "Onyx Black",
    doors: 5,
    seats: 5,
    serviceHistory: "Full",
    previousOwners: 1,
    mot: "2026-04-22",
    description:
      "Extraordinarily rare Bentayga First Edition in Onyx Black — one of the most desirable ultra-luxury SUVs money can buy. Impeccable provenance, full Bentley service history, and professionally maintained throughout. All documentation available and fully transparent sale as always at Harvest Cars.",
    features: [
      "First Edition Specification",
      "Naim Audio System",
      "Panoramic Roof",
      "Airline Seat Specification",
      "Bentley Dynamic Ride",
      "Night Vision",
      "City Specification",
      "22-inch Dark Tint Alloys",
      "Heated & Ventilated Front & Rear Seats",
      "Mood Lighting",
      "Head-Up Display",
    ],
    images: ["/images/vehicle-placeholder.svg"], // TODO: Replace with real vehicle photos
    status: "Available",
    featured: true,
    badge: "Ultra Premium",
  },
];

// ── Review data ──────────────────────────────────────────────────────────────
export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string; // ISO date
  vehicle?: string;
  body: string;
  source: "Google";
}

export const reviews: Review[] = [
  {
    id: "r1",
    author: "Andrew F.",
    rating: 5,
    date: "2024-09-12",
    vehicle: "VW Polo",
    body: "Amazing service history provided with the car. Great communication throughout and easy to work with. Exactly what you want from a used car dealer — transparent and professional.",
    source: "Google",
  },
  {
    id: "r2",
    author: "eli a.",
    rating: 5,
    date: "2024-10-03",
    vehicle: "VW Golf",
    body: "Professional and so friendly. The whole process was stress-free — everything was exactly as described online. No hidden surprises whatsoever. Would 100% recommend to anyone looking for a used car.",
    source: "Google",
  },
  {
    id: "r3",
    author: "Hassaan S.",
    rating: 5,
    date: "2024-11-15",
    body: "Straightforward, transparent, and clearly takes pride in running a trustworthy business. Rare to find a dealer this honest. Sent all the documents before I even visited, which gave me total peace of mind.",
    source: "Google",
  },
  {
    id: "r4",
    author: "Sulieman Q.",
    rating: 5,
    date: "2024-08-28",
    body: "Very honest and knowledgeable. Gave great information on vehicle maintenance and was upfront about everything. This is how every used car dealer should operate. Will be back for my next car.",
    source: "Google",
  },
  {
    id: "r5",
    author: "Luca G.",
    rating: 5,
    date: "2024-12-01",
    vehicle: "Lexus LS460",
    body: "Honest, incredibly transparent, and extremely professional. I found the Lexus through Harvest Cars and the whole experience was a pleasure — test drive arranged quickly, paperwork all in order, same-day delivery available. Couldn't ask for more.",
    source: "Google",
  },
  {
    id: "r6",
    author: "Sarah M.",
    rating: 5,
    date: "2025-01-08",
    vehicle: "Skoda Fabia",
    body: "Bought my Fabia last month and I am absolutely delighted. The car was immaculate, the description was spot-on, and the team were so helpful. Aftercare support was brilliant too — any questions answered quickly.",
    source: "Google",
  },
  {
    id: "r7",
    author: "James T.",
    rating: 5,
    date: "2025-02-14",
    body: "Fair pricing, no pressure at all. I visited three dealerships before Harvest Cars and this was a completely different experience. Friendly, no pushy sales tactics, and the car was in perfect condition.",
    source: "Google",
  },
  {
    id: "r8",
    author: "Priya K.",
    rating: 5,
    date: "2025-03-05",
    vehicle: "Toyota Aygo",
    body: "Same-day delivery was a lifesaver — needed the car urgently and they made it happen at very low cost. The car was spotless and exactly as advertised. Highly recommend Harvest Cars.",
    source: "Google",
  },
];

// Aggregate stats
export const reviewStats = {
  ratingValue: 5.0,
  reviewCount: 29,
  bestRating: 5,
  worstRating: 1,
};

// ── Business info ─────────────────────────────────────────────────────────────
// TODO: Replace all placeholder values with real business info matching Google Business Profile exactly

export const businessInfo = {
  name: "Harvest Cars",
  legalName: "Harvest Cars",
  description:
    "Harvest Cars is a trusted used car dealership with a 5.0-star rating from 29 Google reviews, known for transparent vehicle history, no-pressure sales, and competitive pricing.",
  // TODO: Replace with real address
  address: {
    streetAddress: "TODO: Street Address",
    addressLocality: "TODO: Town/City",
    addressRegion: "TODO: County",
    postalCode: "TODO: Postcode",
    addressCountry: "GB",
  },
  geo: {
    latitude: 51.5517907,
    longitude: -0.1741709,
  },
  // TODO: Replace with real phone number (E.164 format)
  telephone: "+44 XXXX XXXXXX",
  // TODO: Replace with real WhatsApp link
  whatsappUrl: "https://wa.me/44XXXXXXXXXX",
  // TODO: Replace with real email
  email: "info@harvestcars.co.uk",
  // TODO: Replace with real website URL
  url: "https://harvestcars.co.uk",
  googleBusinessUrl: "https://www.google.com/maps/place/Harvest+Cars/@51.5517907,-0.1741709,17z",
  // TODO: Replace with real opening hours
  openingHours: [
    { dayOfWeek: "Monday", opens: "09:00", closes: "18:00" },
    { dayOfWeek: "Tuesday", opens: "09:00", closes: "18:00" },
    { dayOfWeek: "Wednesday", opens: "09:00", closes: "18:00" },
    { dayOfWeek: "Thursday", opens: "09:00", closes: "18:00" },
    { dayOfWeek: "Friday", opens: "09:00", closes: "18:00" },
    { dayOfWeek: "Saturday", opens: "09:00", closes: "17:00" },
    { dayOfWeek: "Sunday", opens: "10:00", closes: "15:00" },
  ],
  priceRange: "££",
  // TODO: Replace with real Google Maps embed URL
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=TODO",
  // TODO: Replace with real social profiles
  sameAs: [
    "https://www.facebook.com/harvestcars",
    "https://www.instagram.com/harvestcars",
  ],
};

// Helper utilities
export function formatPrice(price: number): string {
  return `£${price.toLocaleString("en-GB")}`;
}

export function formatMileage(mileage: number): string {
  return `${mileage.toLocaleString("en-GB")} miles`;
}

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}

export function getFeaturedVehicles(): Vehicle[] {
  return vehicles.filter((v) => v.featured && v.status === "Available");
}

export function getAvailableVehicles(): Vehicle[] {
  return vehicles.filter((v) => v.status === "Available");
}
