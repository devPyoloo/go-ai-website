"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import emailjs from "@emailjs/browser";
import { PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID } from "../config/apiKey";
import type { FooterProps } from "../interface/t";

const EMAILJS_SERVICE_ID = SERVICE_ID;
const EMAILJS_TEMPLATE_ID = TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = PUBLIC_KEY;

function getString(val: string | string[] | undefined): string {
  if (typeof val === "string") return val;
  if (Array.isArray(val)) return val.join(" ");
  return "";
}

type ContactFormProps = FooterProps & {
  initialMessage?: string;
  className?: string;
};

export function ContactForm({
  t,
  initialMessage = "",
  className = "",
}: ContactFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: initialMessage,
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const previousInitialMessage = useRef(initialMessage);

  useEffect(() => {
    if (!initialMessage) return;
    setForm((prev) => {
      const stillPristine =
        !prev.message.trim() ||
        prev.message === previousInitialMessage.current;
      return stillPristine ? { ...prev, message: initialMessage } : prev;
    });
    previousInitialMessage.current = initialMessage;
  }, [initialMessage]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const validate = () => {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = getString(t("contact.form.error.name"));
    if (!form.email.trim()) errs.email = getString(t("contact.form.error.email"));
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      errs.email = getString(t("contact.form.error.emailFormat"));
    if (!form.message.trim())
      errs.message = getString(t("contact.form.error.message"));
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: "info@go-ai.one",
        },
        EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setSubmitting(false);
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        setSubmitting(false);
        setErrors({
          ...errs,
          message: "Failed to send message. Please try again later.",
        });
        console.error("EmailJS error:", error);
      });
  };

  return (
    <form
      className={`relative space-y-5 overflow-hidden rounded-3xl border border-border bg-card/50 p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-md md:p-8 ${className}`}
      onSubmit={handleSubmit}
      noValidate
      aria-label={getString(t("contact.form.title"))}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-9 border-b border-border bg-muted/60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-4 top-3.5 flex items-center gap-1.5"
        aria-hidden
      >
        <span className="h-2 w-2 rounded-full bg-red-400/80" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
      </div>
      <div className="pt-8" />
      <h3 className="mb-1 text-xl font-semibold text-foreground">
        {t("contact.form.title")}
      </h3>
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          {t("contact.form.name")} <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={`w-full rounded-xl border bg-muted/50 p-3 text-foreground outline-none transition focus:ring-2 focus:ring-primary ${errors.name ? "border-red-400" : "border-border"}`}
          placeholder={getString(t("contact.form.placeholder.name"))}
          aria-label={getString(t("contact.form.name"))}
          aria-required="true"
          aria-invalid={!!errors.name}
          value={form.name}
          onChange={handleChange}
          required
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          {t("contact.form.email")} <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={`w-full rounded-xl border bg-muted/50 p-3 text-foreground outline-none transition focus:ring-2 focus:ring-primary ${errors.email ? "border-red-400" : "border-border"}`}
          placeholder={getString(t("contact.form.placeholder.email"))}
          aria-label={getString(t("contact.form.email"))}
          aria-required="true"
          aria-invalid={!!errors.email}
          value={form.email}
          onChange={handleChange}
          required
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
        )}
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          {t("contact.form.message")} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          className={`h-40 w-full resize-none rounded-xl border bg-muted/50 p-3 text-foreground outline-none transition focus:ring-2 focus:ring-primary ${errors.message ? "border-red-400" : "border-border"}`}
          placeholder={getString(t("contact.form.placeholder.message"))}
          aria-label={getString(t("contact.form.message"))}
          aria-required="true"
          aria-invalid={!!errors.message}
          value={form.message}
          onChange={handleChange}
          required
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="interactive-press inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary to-red-600 px-4 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
        disabled={submitting}
        aria-busy={submitting}
      >
        {submitting ? t("contact.form.sending") : t("contact.form.send")}
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>
      {success && (
        <div className="mt-2 text-center text-sm text-green-600" role="status">
          {t("contact.form.success")}
        </div>
      )}
    </form>
  );
}
