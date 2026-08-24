import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Leading direct-answer format — optimised for featured snippets and AI overviews
const faqs = [
  {
    q: "Is Harvest Cars a trustworthy used car dealer?",
    a: "Yes. Harvest Cars holds a 5.0-star rating from 29 Google reviews, with buyers consistently praising the team's honesty, transparent vehicle histories, and no-pressure approach to sales. All vehicle documents are sent to buyers before they visit.",
  },
  {
    q: "Does Harvest Cars offer test drives?",
    a: "Yes. Harvest Cars always encourages test drives before purchase. We want you to feel completely confident in your decision, so test drives are always available by appointment.",
  },
  {
    q: "What service history do Harvest Cars vehicles have?",
    a: "All vehicles sold by Harvest Cars come with a verified service history. We provide the service records upfront — before viewing — so buyers know exactly what they're getting.",
  },
  {
    q: "Does Harvest Cars offer same-day delivery?",
    a: "Yes. Harvest Cars offers low-cost same-day delivery across the region. Contact us directly to check availability for your location.",
  },
  {
    q: "What makes and models does Harvest Cars sell?",
    a: "Harvest Cars stocks a wide range of used vehicles including Audi, Volkswagen (Polo, Golf), Skoda Fabia, Lexus LS460, Toyota Aygo, Kia Rio, and premium vehicles including the Bentley Bentayga. Stock changes regularly — browse our inventory for current listings.",
  },
];

export function FAQPreview() {
  return (
    <section
      className="py-20 bg-[#0A0A0B]"
      aria-labelledby="faq-preview-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: heading */}
          <div className="lg:sticky lg:top-28">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
              FAQs
            </p>
            <h2
              id="faq-preview-heading"
              className="font-heading text-3xl sm:text-4xl font-bold text-[#FAFAFA] mb-4"
            >
              Questions Buyers Ask About Harvest Cars
            </h2>
            <p className="text-[#A1A1AA] text-lg leading-relaxed mb-6">
              We&apos;ve answered the most common questions about buying from us. Prefer
              to speak to a human? Give us a call or drop us a message.
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-[#E5C84A] transition-colors group"
            >
              View All FAQs
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Right: accordion */}
          <Accordion multiple={false} className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="card-surface rounded-lg px-4 border-[#27272A] data-[state=open]:border-[#D4AF37]/30"
              >
                <AccordionTrigger className="text-left text-[#FAFAFA] font-medium hover:text-gold hover:no-underline py-4 gap-3">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#A1A1AA] text-sm leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
