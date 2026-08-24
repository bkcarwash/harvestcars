import {
  Shield,
  FileText,
  Car,
  Clock,
  TrendingDown,
  HeadphonesIcon,
} from "lucide-react";

const usps = [
  {
    icon: Shield,
    title: "Honest & Transparent",
    body: "All vehicle documents are sent to you before you visit. No hidden history, no surprises — just the facts.",
  },
  {
    icon: FileText,
    title: "Full Service Histories",
    body: "Every car we sell comes with a verified service history, giving you complete confidence in its past.",
  },
  {
    icon: Car,
    title: "Test Drives Welcome",
    body: "We always encourage test drives. Buying a car should feel right — take your time before you commit.",
  },
  {
    icon: TrendingDown,
    title: "Fair, Competitive Pricing",
    body: "Our prices are researched against the market so you always get genuine value, not inflated numbers.",
  },
  {
    icon: Clock,
    title: "Same-Day Delivery",
    body: "Need it fast? We offer low-cost same-day delivery across the region — call us for availability.",
  },
  {
    icon: HeadphonesIcon,
    title: "Great Aftercare",
    body: "We don't disappear after the sale. Our customers consistently praise our post-purchase support.",
  },
];

export function USPSection() {
  return (
    <section
      className="py-20 bg-[#0A0A0B]"
      aria-labelledby="usp-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Why Harvest Cars?
          </p>
          <h2
            id="usp-heading"
            className="font-heading text-3xl sm:text-4xl font-bold text-[#FAFAFA] mb-4"
          >
            The Dealership Experience You Actually Deserve
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            Buying a used car shouldn&apos;t be stressful. At Harvest Cars, everything we
            do is built around honesty, transparency, and making the process
            genuinely enjoyable.
          </p>
        </div>

        {/* USP Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {usps.map((usp) => {
            const Icon = usp.icon;
            return (
              <div
                key={usp.title}
                className="p-6 rounded-xl card-surface hover:border-[#3F3F46] transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#27272A] flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/10 transition-colors">
                  <Icon
                    size={20}
                    className="text-gold"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-heading text-[#FAFAFA] text-lg font-semibold mb-2">
                  {usp.title}
                </h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">
                  {usp.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
