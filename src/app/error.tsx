"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Global error boundary — catches unhandled errors in the React tree
export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // TODO: Send to error monitoring (e.g. Sentry) when integrated
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-20">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="w-14 h-14 rounded-full bg-[#27272A] flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={26} className="text-gold" aria-hidden="true" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-[#FAFAFA] mb-3">
          Something Went Wrong
        </h1>
        <p className="text-[#A1A1AA] mb-8">
          An unexpected error occurred. This has been logged. Please try again
          or return to the homepage.
        </p>
        {process.env.NODE_ENV === "development" && (
          <pre className="text-left text-xs text-[#71717A] bg-[#141416] border border-[#27272A] rounded-lg p-4 mb-6 overflow-auto">
            {error.message}
          </pre>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#0A0A0B] bg-gold rounded-lg hover:bg-[#E5C84A] transition-colors min-h-[44px]"
          >
            <RefreshCw size={15} aria-hidden="true" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#FAFAFA] border border-[#27272A] rounded-lg hover:border-gold hover:text-gold transition-colors min-h-[44px]"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
