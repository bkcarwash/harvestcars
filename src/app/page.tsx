import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { USPSection } from "@/components/home/USPSection";
import { FeaturedInventory } from "@/components/home/FeaturedInventory";
import { ReviewHighlights } from "@/components/home/ReviewHighlights";
import { FAQPreview } from "@/components/home/FAQPreview";
import { ContactSection } from "@/components/home/ContactSection";
import { buildFAQSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Harvest Cars | Trusted Used Car Dealer | 5.0★ Google Rating",
  description:
    "Harvest Cars is a 5.0-star rated used car dealership offering transparent, no-pressure sales. Full service histories, test drives welcome, fair pricing, and same-day delivery available. Browse our latest stock.",
  alternates: {
    canonical: "/",
  },
};

const faqSchemaItems = [
  {
    question: "Is Harvest Cars a trustworthy used car dealer?",
    answer:
      "Yes. Harvest Cars holds a 5.0-star rating from 29 Google reviews, with buyers consistently praising the team's honesty, transparent vehicle histories, and no-pressure approach to sales.",
  },
  {
    question: "Does Harvest Cars offer test drives?",
    answer:
      "Yes. Harvest Cars always encourages test drives before purchase. Test drives are available by appointment.",
  },
  {
    question: "What service history do Harvest Cars vehicles have?",
    answer:
      "All vehicles sold by Harvest Cars come with a verified service history provided upfront before viewing.",
  },
  {
    question: "Does Harvest Cars offer same-day delivery?",
    answer:
      "Yes. Harvest Cars offers low-cost same-day delivery across the region. Contact us to check availability.",
  },
  {
    question: "What makes and models does Harvest Cars sell?",
    answer:
      "Harvest Cars stocks Audi, Volkswagen, Skoda, Lexus, Toyota, Kia, and premium vehicles. Stock changes regularly.",
  },
];

export default function HomePage() {
  const faqSchema = buildFAQSchema(faqSchemaItems);

  return (
    <>
      {/* FAQPage JSON-LD must match visible text exactly — no cloaking */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <USPSection />
      <FeaturedInventory />
      <ReviewHighlights />
      <FAQPreview />
      <ContactSection />
    </>
  );
}
