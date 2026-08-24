/**
 * Schema.org JSON-LD builders — all server-rendered via <script> tags.
 *
 * Graph architecture:
 *   #organization  → AutoDealer + LocalBusiness (dual @type)
 *   #website       → WebSite with SearchAction
 *   Each Car page  → Car entity linked to #organization as seller
 *   Each page      → BreadcrumbList
 *   FAQ pages      → FAQPage (must match visible text exactly — no cloaking)
 */

import { businessInfo, reviewStats, reviews, type Vehicle } from "./data";

// ─── Entity IDs ──────────────────────────────────────────────────────────────
const ORG_ID = `${businessInfo.url}/#organization`;
const SITE_ID = `${businessInfo.url}/#website`;

// ─── Body type mapping to schema.org vocabulary ───────────────────────────────
const bodyTypeMap: Record<string, string> = {
  Hatchback: "Hatchback",
  Saloon: "Sedan",
  Estate: "StationWagon",
  SUV: "SUV",
  Coupe: "Coupe",
  MPV: "Minivan",
  Van: "Van",
  Convertible: "Convertible",
};

// ─── AutoDealer (primary entity) ─────────────────────────────────────────────
export function buildAutoDealerSchema() {
  return {
    "@context": "https://schema.org",
    // Dual @type: enables both AutoDealer and LocalBusiness rich results
    "@type": ["AutoDealer", "LocalBusiness"],
    "@id": ORG_ID,
    name: businessInfo.name,
    legalName: businessInfo.legalName,
    description: businessInfo.description,
    url: businessInfo.url,
    telephone: businessInfo.telephone,
    email: businessInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessInfo.address.streetAddress,
      addressLocality: businessInfo.address.addressLocality,
      addressRegion: businessInfo.address.addressRegion,
      postalCode: businessInfo.address.postalCode,
      addressCountry: businessInfo.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: businessInfo.geo.latitude,
      longitude: businessInfo.geo.longitude,
    },
    // hasMap enables Google to link to Maps in the Knowledge Panel
    hasMap: businessInfo.googleBusinessUrl,
    // areaServed signals local service coverage to Google
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    // contactPoint enables contact rich results and assistant integrations
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: businessInfo.telephone,
        contactType: "sales",
        areaServed: "GB",
        availableLanguage: "English",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      },
    ],
    openingHoursSpecification: businessInfo.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.dayOfWeek}`,
      opens: h.opens,
      closes: h.closes,
    })),
    // Human-readable opening hours string (some parsers prefer this format)
    openingHours: [
      "Mo-Fr 09:00-18:00",
      "Sa 09:00-17:00",
      "Su 10:00-15:00",
    ],
    priceRange: businessInfo.priceRange,
    currenciesAccepted: "GBP",
    paymentAccepted: "Cash, Bank Transfer, Finance",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reviewStats.ratingValue,
      reviewCount: reviewStats.reviewCount,
      bestRating: reviewStats.bestRating,
      worstRating: reviewStats.worstRating,
    },
    // Sample reviews inline — full set on /reviews page
    review: reviews.slice(0, 5).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
      },
      datePublished: r.date,
      reviewBody: r.body,
      publisher: { "@type": "Organization", name: "Google" },
    })),
    logo: {
      "@type": "ImageObject",
      url: `${businessInfo.url}/logo.webp`,
      width: 1920,
      height: 1060,
    },
    sameAs: businessInfo.sameAs,
    image: [
      `${businessInfo.url}/logo.webp`,
      `${businessInfo.url}/images/og-default.jpg`,
    ],
    // Link back to parent website entity
    subjectOf: { "@id": SITE_ID },
  };
}

// ─── WebSite (enables Sitelinks Searchbox + entity disambiguation) ────────────
export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: businessInfo.url,
    name: businessInfo.name,
    description: businessInfo.description,
    inLanguage: "en-GB",
    publisher: { "@id": ORG_ID },
    // SearchAction wires up the sitelinks searchbox in Google SERPs
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${businessInfo.url}/inventory?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── Vehicle (Car) ────────────────────────────────────────────────────────────
export function buildVehicleSchema(vehicle: Vehicle) {
  return {
    "@context": "https://schema.org",
    "@type": "Car",
    "@id": `${businessInfo.url}/inventory/${vehicle.slug}#vehicle`,
    name: `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant}`,
    brand: {
      "@type": "Brand",
      name: vehicle.make,
    },
    model: vehicle.model,
    vehicleModelDate: String(vehicle.year),
    // itemCondition is REQUIRED by Google for vehicle listing rich results
    itemCondition: "https://schema.org/UsedCondition",
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.mileage,
      unitCode: "SMI", // statute miles
    },
    vehicleTransmission: vehicle.transmission,
    fuelType: vehicle.fuelType,
    bodyType: bodyTypeMap[vehicle.bodyType] ?? vehicle.bodyType,
    color: vehicle.colour,
    numberOfDoors: vehicle.doors,
    vehicleSeatingCapacity: vehicle.seats,
    description: vehicle.description,
    // Additional properties for richer data
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Engine Size",
        value: `${vehicle.engineSize}L`,
      },
      {
        "@type": "PropertyValue",
        name: "Service History",
        value: vehicle.serviceHistory,
      },
      {
        "@type": "PropertyValue",
        name: "Previous Owners",
        value: vehicle.previousOwners,
      },
    ],
    offers: {
      "@type": "Offer",
      price: vehicle.price,
      priceCurrency: "GBP",
      availability:
        vehicle.status === "Available"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
      // priceValidUntil required for Google Merchant integration
      priceValidUntil: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toISOString().split("T")[0],
      seller: { "@id": ORG_ID },
      url: `${businessInfo.url}/inventory/${vehicle.slug}`,
    },
    url: `${businessInfo.url}/inventory/${vehicle.slug}`,
    image: vehicle.images.map((img) =>
      img.startsWith("http") ? img : `${businessInfo.url}${img}`
    ),
  };
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────
export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── FAQPage ──────────────────────────────────────────────────────────────────
export function buildFAQSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    // Link to the organization entity for attribution
    about: { "@id": ORG_ID },
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ─── Reviews page ─────────────────────────────────────────────────────────────
// Uses a partial entity update pattern — merges with the root AutoDealer via shared @id
export function buildReviewPageSchema() {
  return {
    "@context": "https://schema.org",
    // Partial entity: same @type and @id as the root AutoDealer node.
    // Google's structured data parser merges properties from multiple scripts
    // with the same @id into one entity — this avoids duplication conflicts.
    "@type": ["AutoDealer", "LocalBusiness"],
    "@id": ORG_ID,
    name: businessInfo.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reviewStats.ratingValue,
      reviewCount: reviewStats.reviewCount,
      bestRating: reviewStats.bestRating,
      worstRating: reviewStats.worstRating,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
      },
      datePublished: r.date,
      reviewBody: r.body,
      publisher: { "@type": "Organization", name: "Google" },
    })),
  };
}

// ─── Inventory listing page ───────────────────────────────────────────────────
export function buildInventoryListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${businessInfo.url}/inventory#collectionpage`,
    name: "Cars for Sale at Harvest Cars",
    description:
      "Browse quality used cars at Harvest Cars. Filter by make, price, body type, and more.",
    url: `${businessInfo.url}/inventory`,
    inLanguage: "en-GB",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: businessInfo.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Cars for Sale",
          item: `${businessInfo.url}/inventory`,
        },
      ],
    },
  };
}
