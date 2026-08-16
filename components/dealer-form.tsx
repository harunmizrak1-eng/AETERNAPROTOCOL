"use client"

import { useState } from "react"
import { whatsappLink } from "@/lib/contact"

/** Dealer application. There is no backend on this site, so the form composes
 * a structured WhatsApp message rather than posting anywhere — the applicant
 * stays in control of what they send, and nothing is stored server-side. */

const BUSINESS_TYPES = [
  "Eczane",
  "Klinik / Poliklinik",
  "Araştırma laboratuvarı",
  "Spor hekimliği / performans merkezi",
  "Dağıtıcı / alt bayi",
]

const VOLUMES = [
  "Aylık 1–5 kutu",
  "Aylık 5–25 kutu",
  "Aylık 25–100 kutu",
  "Aylık 100+ kutu",
]

interface Answers {
  company: string
  taxId: string
  contact: string
  phone: string
  city: string
  businessType: string
  volume: string
  coldChain: string
  note: string
}

const EMPTY: Answers = {
  company: "",
  taxId: "",
  contact: "",
  phone: "",
  city: "",
  businessType: "",
  volume: "",
  coldChain: "",
  note: "",
}

export function DealerForm() {
  const [a, setA] = useState<Answers>(EMPTY)

  const set = (k: keyof Answers) => (v: string) =>
    setA((prev) => ({ ...prev, [k]: v }))

  // Required fields gate the submit so an incoming enquiry always carries
  // enough to answer without a round-trip.
  const ready =
    a.company.trim() !== "" &&
    a.contact.trim() !== "" &&
    a.phone.trim() !== "" &&
    a.businessType !== ""

  const message = [
    "ZPHC Türkiye — Bayilik Başvurusu",
    "",
    `Firma: ${a.company}`,
    a.taxId && `Vergi no: ${a.taxId}`,
    `Yetkili: ${a.contact}`,
    `Telefon: ${a.phone}`,
    a.city && `Şehir: ${a.city}`,
    `Faaliyet alanı: ${a.businessType}`,
    a.volume && `Öngörülen hacim: ${a.volume}`,
    a.coldChain && `Soğuk zincir: ${a.coldChain}`,
    a.note && `Not: ${a.note}`,
  ]
    .filter(Boolean)
    .join("\n")

  return (
    <div className="mt-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Firma unvanı"
          required
          value={a.company}
          onChange={set("company")}
        />
        <Field label="Vergi numarası" value={a.taxId} onChange={set("taxId")} />
        <Field
          label="Yetkili kişi"
          required
          value={a.contact}
          onChange={set("contact")}
        />
        <Field
          label="Telefon"
          required
          type="tel"
          value={a.phone}
          onChange={set("phone")}
        />
        <Field label="Şehir" value={a.city} onChange={set("city")} />
      </div>

      <Choice
        label="Faaliyet alanı"
        required
        options={BUSINESS_TYPES}
        value={a.businessType}
        onChange={set("businessType")}
      />

      <Choice
        label="Öngörülen aylık hacim"
        options={VOLUMES}
        value={a.volume}
        onChange={set("volume")}
      />

      <Choice
        label="2–8 °C saklama ve sevkiyat imkânınız var mı?"
        options={["Evet", "Kısmen", "Hayır"]}
        value={a.coldChain}
        onChange={set("coldChain")}
      />

      <div className="mt-10">
        <label className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground">
          Eklemek istedikleriniz
        </label>
        <textarea
          rows={4}
          value={a.note}
          onChange={(e) => set("note")(e.target.value)}
          className="mt-3 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm font-light text-foreground outline-none transition-colors focus:border-gold"
        />
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-center">
        {ready ? (
          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-sm bg-gold px-8 py-3.5 text-[0.65rem] uppercase tracking-eyebrow font-medium text-primary-foreground transition-colors duration-300 hover:bg-gold/85"
          >
            Başvuruyu WhatsApp ile Gönder
          </a>
        ) : (
          <span className="inline-flex cursor-not-allowed items-center justify-center rounded-sm border border-hairline px-8 py-3.5 text-[0.65rem] uppercase tracking-eyebrow font-medium text-muted-foreground">
            Başvuruyu WhatsApp ile Gönder
          </span>
        )}
        <p className="text-[0.65rem] font-light leading-relaxed text-muted-foreground">
          {ready
            ? "Bilgileriniz mesaja aktarılır; göndermeden önce düzenleyebilirsiniz."
            : "Firma unvanı, yetkili, telefon ve faaliyet alanı zorunludur."}
        </p>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
}: {
  label: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  type?: string
}) {
  return (
    <div>
      <label className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm font-light text-foreground outline-none transition-colors focus:border-gold"
      />
    </div>
  )
}

function Choice({
  label,
  options,
  value,
  onChange,
  required,
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
  required?: boolean
}) {
  return (
    <div className="mt-10">
      <p className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            aria-pressed={value === opt}
            className={`rounded-sm border px-4 py-2.5 text-xs font-light transition-colors ${
              value === opt
                ? "border-gold bg-gold text-primary-foreground"
                : "border-hairline text-muted-foreground hover:border-gold/60 hover:text-foreground"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
