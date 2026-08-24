import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buildFAQSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { businessInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description:
    "Answers to the most common questions about buying a used car from Harvest Cars — test drives, service history, same-day delivery, aftercare, and more.",
  alternates: { canonical: "/faq" },
};

// AEO-structured Q&A — lead with direct answer sentence for AI overview extraction
// relatedLink renders below the answer in the UI only (not part of schema text)
const faqSections: {
  heading: string;
  items: { question: string; answer: string; relatedLink?: { href: string; label: string } }[];
}[] = [
  {
    heading: "About Harvest Cars",
    items: [
      {
        question: "Is Harvest Cars a trustworthy used car dealer?",
        answer:
          "Yes. Harvest Cars is a trustworthy used car dealer with a 5.0-star rating from 29 Google reviews. Buyers consistently praise the dealership's honesty, transparent vehicle histories, and stress-free buying process. All vehicle documents are sent to buyers before they visit, so there are no hidden surprises.",
        relatedLink: { href: "/reviews", label: "Read all customer reviews" },
      },
      {
        question: "Where is Harvest Cars located?",
        // TODO: Update with real address
        answer: `Harvest Cars is located at ${businessInfo.address.streetAddress}, ${businessInfo.address.addressLocality}, ${businessInfo.address.postalCode}. Contact us for directions or use the map on our contact page.`,
        relatedLink: { href: "/contact", label: "View map & get directions" },
      },
      {
        question: "What are Harvest Cars' opening hours?",
        answer:
          "Harvest Cars is open Monday to Friday 9am–6pm, Saturday 9am–5pm, and Sunday 10am–3pm. You can also contact us outside opening hours by WhatsApp.",
        relatedLink: { href: "/contact", label: "Contact us" },
      },
      {
        question: "What brands and models does Harvest Cars sell?",
        answer:
          "Harvest Cars sells a wide range of used vehicles including Audi, Volkswagen (Polo, Golf), Skoda Fabia, Lexus LS460, Toyota Aygo, Kia Rio, and premium vehicles such as the Bentley Bentayga. Stock changes regularly — browse our inventory page to see current listings.",
        relatedLink: { href: "/inventory", label: "Browse current inventory" },
      },
    ],
  },
  {
    heading: "Buying a Car",
    items: [
      {
        question: "Can I test drive a car before buying?",
        answer:
          "Yes. Harvest Cars always encourages test drives before purchase. We believe you should feel completely confident in your choice before committing. Test drives are available by appointment — just give us a call or send a WhatsApp message.",
        relatedLink: { href: "/contact", label: "Book a test drive" },
      },
      {
        question: "Do Harvest Cars send documents before I visit?",
        answer:
          "Yes. One of Harvest Cars' most praised practices is sending all relevant vehicle documents — including service history, MOT history, and any other relevant paperwork — to buyers before they visit. This saves your time and lets you make an informed decision before travelling.",
      },
      {
        question: "Is there any pressure to buy?",
        answer:
          "No. Harvest Cars operates a strictly no-pressure sales environment. Multiple customer reviews specifically highlight the relaxed, friendly, professional approach. You will never be rushed or pushed into a decision.",
      },
      {
        question: "Can I reserve a car?",
        answer:
          "Yes. Contact us directly by phone or WhatsApp to discuss reserving a vehicle. We can advise on deposit arrangements and next steps.",
      },
    ],
  },
  {
    heading: "Vehicle History & Condition",
    items: [
      {
        question: "What service history do Harvest Cars vehicles have?",
        answer:
          "Most vehicles sold by Harvest Cars come with a full service history. The service records are provided to buyers upfront — before viewing — so you know exactly what the car's maintenance history looks like. The listing on each vehicle page confirms whether history is full, partial, or not available.",
      },
      {
        question: "Are the vehicles accurately described online?",
        answer:
          "Yes. Accurate descriptions are a hallmark of Harvest Cars — customer reviews repeatedly mention that vehicles were exactly as described online, with no discrepancies found on viewing. We do not use stock photography: listing images show the actual car for sale.",
      },
      {
        question: "Do the cars come with a warranty?",
        answer:
          "Contact Harvest Cars directly to discuss warranty options. We can advise on aftermarket warranty products available for your chosen vehicle.", // TODO: Update if warranty terms are confirmed
      },
    ],
  },
  {
    heading: "Delivery & Logistics",
    items: [
      {
        question: "Does Harvest Cars offer same-day delivery?",
        answer:
          "Yes. Harvest Cars offers low-cost same-day delivery across the region. If you need a car urgently, contact us to confirm availability for your location. Customer reviews specifically praise the speed and affordability of the delivery service.",
      },
      {
        question: "Can I have a car delivered to my home?",
        answer:
          "Yes. Harvest Cars offers home delivery. Contact us for a delivery quote to your postcode — same-day delivery is available in many areas at competitive rates.",
      },
    ],
  },
  {
    heading: "Finance & Payment",
    items: [
      {
        question: "Does Harvest Cars offer finance?",
        answer:
          "Yes. Harvest Cars can assist with finance arrangements. Visit our Finance page for more details, or contact us directly to discuss options for your chosen vehicle.",
        relatedLink: { href: "/financing", label: "View finance options" },
      },
      {
        question: "What payment methods does Harvest Cars accept?",
        answer:
          "Contact Harvest Cars directly to confirm accepted payment methods. We can advise on bank transfer, card payment, and part-exchange arrangements.", // TODO: Confirm real payment methods
      },
      {
        question: "Can I part-exchange my current car?",
        answer:
          "Yes. Part-exchange is available at Harvest Cars. Contact us with details of your current vehicle for a valuation.", // TODO: Confirm part-ex policy
      },
    ],
  },
  {
    heading: "Aftercare",
    items: [
      {
        question: "What aftercare does Harvest Cars offer?",
        answer:
          "Harvest Cars is praised in multiple reviews for its post-purchase support. The team is available after the sale to answer questions and address any concerns. We don't disappear once you've driven away — your satisfaction matters long after the handover.",
      },
      {
        question: "What if there's an issue with the car after I buy it?",
        answer:
          "Contact Harvest Cars directly if you experience any issue. Our team will discuss the situation and work with you towards a resolution. Customer reviews consistently highlight our responsive, fair aftercare approach.",
      },
    ],
  },
];

// Flatten for schema
const allFaqItems = faqSections.flatMap((s) => s.items);

export default function FAQPage() {
  const schema = buildFAQSchema(allFaqItems);
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: businessInfo.url },
    { name: "FAQ", url: `${businessInfo.url}/faq` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="pt-24 pb-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
              FAQs
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#FAFAFA] mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-[#A1A1AA] text-lg">
              Everything you need to know about buying a used car from Harvest Cars.
              Can&apos;t find your answer? Give us a call.
            </p>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-10">
            {faqSections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-heading text-[#FAFAFA] text-xl font-semibold mb-4 pb-2 border-b border-[#27272A]">
                  {section.heading}
                </h2>
                <Accordion multiple={false} className="space-y-2">
                  {section.items.map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`${section.heading}-${i}`}
                      className="card-surface rounded-lg px-4 border-[#27272A] data-[state=open]:border-[#D4AF37]/30"
                    >
                      <AccordionTrigger className="text-left text-[#FAFAFA] font-medium hover:text-gold hover:no-underline py-4 gap-3">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-[#A1A1AA] text-sm leading-relaxed pb-4">
                        {item.answer}
                        {item.relatedLink && (
                          <Link
                            href={item.relatedLink.href}
                            className="inline-flex items-center gap-1 mt-2 text-gold text-xs hover:text-[#E5C84A] transition-colors"
                          >
                            {item.relatedLink.label}
                            <ArrowRight size={11} aria-hidden="true" />
                          </Link>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-14 rounded-xl card-elevated p-8 text-center">
            <h2 className="font-heading text-[#FAFAFA] text-xl font-semibold mb-2">
              Still have a question?
            </h2>
            <p className="text-[#A1A1AA] text-sm mb-6">
              Our friendly team is here to help — no scripts, no pressure, just
              honest answers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`tel:${businessInfo.telephone}`}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#0A0A0B] bg-gold rounded-lg hover:bg-[#E5C84A] transition-colors min-h-[44px]"
              >
                <Phone size={15} aria-hidden="true" />
                Call Us Now
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#FAFAFA] border border-[#27272A] rounded-lg hover:border-gold hover:text-gold transition-colors min-h-[44px]"
              >
                Send a Message
              </Link>
              <Link
                href="/inventory"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#FAFAFA] border border-[#27272A] rounded-lg hover:border-gold hover:text-gold transition-colors min-h-[44px]"
              >
                Browse Cars for Sale
              </Link>
              <Link
                href="/financing"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#FAFAFA] border border-[#27272A] rounded-lg hover:border-gold hover:text-gold transition-colors min-h-[44px]"
              >
                Finance Options
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
