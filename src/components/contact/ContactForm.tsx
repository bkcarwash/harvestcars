"use client";

import { useState, useId } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formId = useId();

  function validate(data: FormData): Record<string, string> {
    const errs: Record<string, string> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) errs.name = "Name is required.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "A valid email address is required.";
    if (!message || message.length < 10)
      errs.message = "Please enter a message (at least 10 characters).";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot check (spam bot protection)
    if (data.get("website")) return;

    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setState("submitting");

    // TODO: Replace with real form submission endpoint
    // e.g. POST to /api/contact or a Formspree/Resend endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setState("success");
  }

  if (state === "success") {
    return (
      <div className="rounded-xl card-elevated p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-[#22C55E]/10 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-[#22C55E]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-[#FAFAFA] text-xl font-semibold mb-2">
          Message Sent!
        </h3>
        <p className="text-[#A1A1AA] text-sm">
          Thanks for getting in touch. We&apos;ll get back to you as soon as possible —
          usually within a few hours during business hours.
        </p>
      </div>
    );
  }

  const fieldClasses = (field: string) =>
    `w-full px-4 py-3 text-sm text-[#FAFAFA] bg-[#1E1E20] border rounded-lg placeholder:text-[#71717A] focus:outline-none transition-colors ${
      errors[field]
        ? "border-[#EF4444] focus:border-[#EF4444]"
        : "border-[#27272A] focus:border-gold"
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="space-y-5"
    >
      {/* Honeypot — hidden from real users, catches bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website (leave blank)</label>
        <input
          id={`${formId}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label
            htmlFor={`${formId}-name`}
            className="block text-sm font-medium text-[#A1A1AA] mb-1.5"
          >
            Name <span className="text-[#EF4444]" aria-label="required">*</span>
          </label>
          <input
            id={`${formId}-name`}
            type="text"
            name="name"
            autoComplete="name"
            className={fieldClasses("name")}
            placeholder="Your full name"
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            aria-invalid={!!errors.name}
            required
          />
          {errors.name && (
            <p id={`${formId}-name-error`} className="text-[#EF4444] text-xs mt-1.5" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor={`${formId}-phone`}
            className="block text-sm font-medium text-[#A1A1AA] mb-1.5"
          >
            Phone <span className="text-[#71717A] text-xs">(optional)</span>
          </label>
          <input
            id={`${formId}-phone`}
            type="tel"
            name="phone"
            autoComplete="tel"
            className={fieldClasses("phone")}
            placeholder="07XXX XXXXXX"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor={`${formId}-email`}
          className="block text-sm font-medium text-[#A1A1AA] mb-1.5"
        >
          Email <span className="text-[#EF4444]" aria-label="required">*</span>
        </label>
        <input
          id={`${formId}-email`}
          type="email"
          name="email"
          autoComplete="email"
          className={fieldClasses("email")}
          placeholder="you@example.com"
          aria-describedby={errors.email ? `${formId}-email-error` : undefined}
          aria-invalid={!!errors.email}
          required
        />
        {errors.email && (
          <p id={`${formId}-email-error`} className="text-[#EF4444] text-xs mt-1.5" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Vehicle of interest */}
      <div>
        <label
          htmlFor={`${formId}-vehicle`}
          className="block text-sm font-medium text-[#A1A1AA] mb-1.5"
        >
          Vehicle of Interest <span className="text-[#71717A] text-xs">(optional)</span>
        </label>
        <input
          id={`${formId}-vehicle`}
          type="text"
          name="vehicle"
          className={fieldClasses("vehicle")}
          placeholder="e.g. 2019 Audi SQ5"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor={`${formId}-message`}
          className="block text-sm font-medium text-[#A1A1AA] mb-1.5"
        >
          Message <span className="text-[#EF4444]" aria-label="required">*</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={5}
          className={`${fieldClasses("message")} resize-none`}
          placeholder="What would you like to know? Ask about a specific car, arrange a test drive, or anything else…"
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          aria-invalid={!!errors.message}
          required
        />
        {errors.message && (
          <p id={`${formId}-message-error`} className="text-[#EF4444] text-xs mt-1.5" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full py-3.5 text-sm font-semibold text-[#0A0A0B] bg-gold rounded-lg hover:bg-[#E5C84A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B] min-h-[48px]"
        aria-busy={state === "submitting"}
      >
        {state === "submitting" ? "Sending…" : "Send Message"}
      </button>

      {state === "error" && (
        <p className="text-[#EF4444] text-sm text-center" role="alert">
          Something went wrong. Please try again or call us directly.
        </p>
      )}

      <p className="text-[#71717A] text-xs text-center">
        We typically respond within a few hours during business hours.
        No spam, no pressure.
      </p>
    </form>
  );
}
