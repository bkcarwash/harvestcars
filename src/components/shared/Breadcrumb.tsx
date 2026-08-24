import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[#71717A]">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-gold transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#A1A1AA]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
