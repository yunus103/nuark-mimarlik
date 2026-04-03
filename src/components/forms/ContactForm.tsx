"use client";

import { useState } from "react";
import { z } from "zod";
import { RiSendPlaneLine, RiCheckLine, RiErrorWarningLine, RiLoader4Line } from "react-icons/ri";

const schema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalı"),
  email: z.string().email("Geçerli bir e-posta girin"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalı"),
});

type FormData = z.infer<typeof schema>;
type Status = "idle" | "loading" | "success" | "error";
type FieldErrors = Partial<Record<keyof FormData, string[]>>;

type ContactFormProps = {
  formTitle?: string;
  successMessage?: string;
  projectTypes?: string[];
};

// Reusable field wrapper
function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-[11px] font-bold tracking-widest uppercase text-muted-foreground">
        {label}
        {required && <span className="text-brand-gold ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <RiErrorWarningLine className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

// Input style
const inputClass =
  "w-full bg-transparent border-0 border-b border-foreground/20 focus:border-brand-gold px-0 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors duration-300 rounded-none";

const selectClass =
  "w-full bg-background border-0 border-b border-foreground/20 focus:border-brand-gold px-0 py-3 text-sm font-sans text-foreground outline-none transition-colors duration-300 rounded-none appearance-none cursor-pointer";

export function ContactForm({
  formTitle = "Bize Ulaşın",
  successMessage = "Mesajınız alındı. En kısa sürede size dönüş yapacağız.",
  projectTypes = [],
}: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    projectType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof FormData]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setFieldErrors({});

    const result = schema.safeParse(formData);
    if (!result.success) {
      setFieldErrors(result.error.flatten().fieldErrors as FieldErrors);
      setStatus("idle");
      return;
    }

    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("website") as HTMLInputElement)?.value || "";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, honeypot }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        if (data.error && typeof data.error === "object") {
          setFieldErrors(data.error);
        }
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  // Success state
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
        <div className="w-16 h-16 border border-brand-gold flex items-center justify-center">
          <RiCheckLine className="text-brand-gold text-3xl" />
        </div>
        <div>
          <p className="font-serif text-xl font-bold text-foreground mb-2">Teşekkürler!</p>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{successMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-0" noValidate>
      {/* Honeypot */}
      <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {formTitle && (
        <div className="mb-10">
          <span className="block text-brand-gold font-sans text-xs font-bold tracking-widest uppercase mb-3">
            Mesaj Gönderin
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">{formTitle}</h2>
        </div>
      )}

      <div className="space-y-8">
        {/* Ad - E-posta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Field label="Ad Soyad" required error={fieldErrors.name?.[0]}>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Adınız Soyadınız"
              aria-invalid={!!fieldErrors.name}
              className={inputClass}
            />
          </Field>

          <Field label="E-Posta" required error={fieldErrors.email?.[0]}>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ornek@mail.com"
              aria-invalid={!!fieldErrors.email}
              className={inputClass}
            />
          </Field>
        </div>

        {/* Telefon - Proje Tipi / Konu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Field label="Telefon">
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+90 555 000 00 00"
              className={inputClass}
            />
          </Field>

          {projectTypes && projectTypes.length > 0 ? (
            <Field label="Proje Tipi">
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">Seçiniz...</option>
                {projectTypes.map((type, idx) => (
                  <option key={idx} value={type}>{type}</option>
                ))}
              </select>
            </Field>
          ) : (
            <Field label="Konu">
              <input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Mesajınızın konusu"
                className={inputClass}
              />
            </Field>
          )}
        </div>

        {/* Mesaj */}
        <Field label="Mesaj" required error={fieldErrors.message?.[0]}>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Projeniz, beklentileriniz veya sormak istedikleriniz..."
            rows={5}
            aria-invalid={!!fieldErrors.message}
            className={`${inputClass} resize-none`}
          />
        </Field>

        {/* Genel hata */}
        {status === "error" && (
          <p className="text-sm text-red-500 flex items-center gap-2">
            <RiErrorWarningLine />
            Bir hata oluştu. Lütfen tekrar deneyin.
          </p>
        )}

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center gap-3 bg-brand-black text-brand-off-white border border-brand-black hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-sans font-bold uppercase tracking-widest text-xs h-12 px-10 rounded-none"
          >
            {status === "loading" ? (
              <>
                <RiLoader4Line className="animate-spin text-base" />
                Gönderiliyor...
              </>
            ) : (
              <>
                Gönder
                <RiSendPlaneLine className="text-base" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
