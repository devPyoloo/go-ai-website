"use client";

import { useState } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import type { FooterProps } from "../interface/t";
import emailjs from '@emailjs/browser';
import { PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID } from "../config/apiKey";

const EMAILJS_SERVICE_ID = SERVICE_ID;
const EMAILJS_TEMPLATE_ID = TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = PUBLIC_KEY;

function getString(val: string | string[] | undefined): string {
  if (typeof val === "string") return val;
  if (Array.isArray(val)) return val.join(" ");
  return "";
}

const ContactSection = ({ t }: FooterProps) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const validate = () => {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = getString(t("contact.form.error.name"));
    if (!form.email.trim()) errs.email = getString(t("contact.form.error.email"));
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = getString(t("contact.form.error.emailFormat"));
    if (!form.message.trim()) errs.message = getString(t("contact.form.error.message"));
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
    // Send email via EmailJS
    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        to_email: 'info@go-ai.one', // Ensures the message is sent to this address
      },
      EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setSubmitting(false);
        setSuccess(true);
        setForm({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        setSubmitting(false);
        setErrors({
          ...errs,
          message: 'Failed to send message. Please try again later.'
        });
        // Optionally log error
        console.error('EmailJS error:', error);
      });
  };

  return (
    <section id="contact" className="py-16 px-4">
      <div className="container mx-auto max-w-4xl ">
        <h2
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-foreground to-red-600 bg-clip-text text-transparent"
          data-aos="fade-up"
        >
          {t("contact.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div data-aos="fade-right">
            <h3 className="text-xl font-bold mb-4">
              {t("contact.subtitle")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-red-500 mr-3" />
                <span>{t("contact.email")}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-red-500 mr-3" />
                <span>{t("contact.phone")}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-red-500 mr-3" />
                <span>{t("contact.address")}</span>
              </div>
            </div>
          </div>
          <form
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm space-y-4 text-gray-800"
            data-aos="fade-left"
            onSubmit={handleSubmit}
            noValidate
            aria-label={getString(t("contact.form.title"))}
          >
            <h3 className="font-bold mb-4 text-black">{t("contact.form.title")}</h3>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                {t("contact.form.name")} <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={`w-full p-2 border ${errors.name ? "border-red-400" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none`}
                placeholder={getString(t("contact.form.placeholder.name"))}
                aria-label={getString(t("contact.form.name"))}
                aria-required="true"
                aria-invalid={!!errors.name}
                value={form.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                {t("contact.form.email")} <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`w-full p-2 border ${errors.email ? "border-red-400" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none`}
                placeholder={getString(t("contact.form.placeholder.email"))}
                aria-label={getString(t("contact.form.email"))}
                aria-required="true"
                aria-invalid={!!errors.email}
                value={form.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                {t("contact.form.message")} <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                className={`w-full p-2 border ${errors.message ? "border-red-400" : "border-gray-300"} rounded-md h-24 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none`}
                placeholder={getString(t("contact.form.placeholder.message"))}
                aria-label={getString(t("contact.form.message"))}
                aria-required="true"
                aria-invalid={!!errors.message}
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-md bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium px-4 py-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={submitting}
              aria-busy={submitting}
            >
              {submitting ? t("contact.form.sending") : t("contact.form.send")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            {success && (
              <div className="text-green-600 text-sm text-center mt-2" role="status">
                {t("contact.form.success")}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

