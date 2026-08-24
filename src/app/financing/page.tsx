import type { Metadata } from "next";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Phone, ArrowRight } from "lucide-react";
import { businessInfo } from "@/lib/data";
import { buildFAQSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { Breadcrumb } from "@/components/shared/Breadcrumb";

export const metadata: Metadata = {
  title: "Finance Options",
  description:
    "Harvest Cars can help you finance your next used car. Find out about finance options available and contact us to discuss your needs.",
  alternates: { canonical: "/financing" },
};

const financeFAQs = [
  {
    question: "Does Harvest Cars offer car finance?",
    answer:
      "Yes. Harvest Cars can assist buyers with finance arrangements on suitable vehicles. Contact us to discuss your requirements and we will advise on the best options available for your chosen car.",
  },
  {
    question: "What types of car finance are available?",
    answer:
      "Options typically available include Hire Purchase (HP), Personal Contract Purchase (PCP), and Personal Loans. The right choice depends on your circumstances — contact us and we will help you find the most suitable product.", // TODO: Update with specific finance partners
  },
  {
    question: "Will a finance application affect my credit score?",
    answer:
      "A soft search (eligibility check) will not affect your credit score. A full application may result in a hard credit search. We can discuss this in more detail when you contact us.",
  },
  {
    question: "Can I get finance with bad credit?",
    answer:
      "We work with buyers across a range of credit profiles. Contact us to discuss your situation — we'll do our best to find a suitable solution.", // TODO: Confirm exact finance partners and policies
  },
  {
    question: "Can I part-exchange my existing car as a deposit?",
    answer:
      "Yes. Part-exchange is available and can be used as part or all of a deposit on finance. Contact us with details of your current vehicle for a valuation.",
  },
  {
    question: "Is there a minimum deposit required for finance?",
    answer:
      "Deposit requirements vary depending on the finance product and the vehicle. Contact us to discuss your specific circumstances.", // TODO: Confirm deposit requirements
  },
];

const faqSchema = buildFAQSchema(financeFAQs);
const breadcrumb = buildBreadcrumbSchema([
  { name: "Home", url: businessInfo.url },
  { name: "Finance Options", url: `${businessInfo.url}/financing` },
]);

const benefitsList = [
  "Competitive rates from trusted lenders",
  "Flexible terms to suit your budget",
  "Fast decisions — often same day",
  "No-pressure finance discussion",
  "Part-exchange accepted",
  "Personal advice from our team",
];

export default function FinancingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="pt-24 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Finance Options" }]} />
          {/* Header */}
          <div className="max-w-2xl mb-14">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
              Finance Options
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#FAFAFA] mb-5">
              Drive Away Today — Finance Available
            </h1>
            <p className="text-[#A1A1AA] text-lg leading-relaxed">
              Buying a car outright isn&apos;t always the right move for everyone. We can
              help you explore flexible finance options that spread the cost and put you
              in the driving seat sooner.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Benefits */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#FAFAFA] mb-6">
                Why Finance Through Harvest Cars?
              </h2>
              <ul className="space-y-3 mb-8">
                {benefitsList.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-[#A1A1AA]">
                    <CheckCircle2
                      size={16}
                      className="text-gold flex-shrink-0"
                      aria-hidden="true"
                    />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Important disclaimer */}
              <div className="p-4 rounded-lg bg-[#141416] border border-[#27272A] text-xs text-[#71717A] leading-relaxed">
                {/* TODO: Replace with real FCA regulatory information */}
                Finance is subject to status and credit approval. Terms and conditions apply.
                Harvest Cars acts as a credit broker, not a lender. All finance products are
                provided by FCA-authorised lenders.{" "}
                {/* TODO: Add company FCA registration details */}
              </div>
            </div>

            {/* CTA Card */}
            <div className="rounded-xl card-elevated p-8 flex flex-col justify-between">
              <div>
                <h2 className="font-heading text-[#FAFAFA] text-xl font-semibold mb-3">
                  Get a Finance Quote
                </h2>
                <p className="text-[#A1A1AA] text-sm leading-relaxed mb-6">
                  The quickest way to explore finance is to give us a call or send a
                  WhatsApp message. Tell us which car you&apos;re interested in, your
                  rough budget per month, and we&apos;ll come back to you with options —
                  no obligation, no pressure.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={`tel:${businessInfo.telephone}`}
                  className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-[#0A0A0B] bg-gold rounded-lg hover:bg-[#E5C84A] transition-colors min-h-[48px]"
                >
                  <Phone size={16} aria-hidden="true" />
                  {/* TODO: Replace with real phone */}
                  Call to Discuss Finance
                </a>
                <Link
                  href="/inventory"
                  className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-[#FAFAFA] border border-[#27272A] rounded-lg hover:border-gold hover:text-gold transition-colors min-h-[48px]"
                >
                  Browse Cars First
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Finance FAQ */}
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-[#FAFAFA] mb-6">
              Finance FAQs
            </h2>
            <Accordion multiple={false} className="space-y-2">
              {financeFAQs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`finance-faq-${i}`}
                  className="card-surface rounded-lg px-4 border-[#27272A] data-[state=open]:border-[#D4AF37]/30"
                >
                  <AccordionTrigger className="text-left text-[#FAFAFA] font-medium hover:text-gold hover:no-underline py-4 gap-3">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#A1A1AA] text-sm leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Related pages */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/faq"
                className="inline-flex items-center gap-1.5 text-sm text-gold hover:text-[#E5C84A] transition-colors"
              >
                More questions? See our full FAQ
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
              <span className="text-[#3F3F46]" aria-hidden="true">·</span>
              <Link
                href="/reviews"
                className="inline-flex items-center gap-1.5 text-sm text-gold hover:text-[#E5C84A] transition-colors"
              >
                Read customer reviews
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
              <span className="text-[#3F3F46]" aria-hidden="true">·</span>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm text-gold hover:text-[#E5C84A] transition-colors"
              >
                Contact us about finance
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
