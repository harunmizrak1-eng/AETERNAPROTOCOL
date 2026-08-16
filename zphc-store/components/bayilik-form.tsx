"use client"

import { useState } from "react"

import { whatsappLink } from "@/lib/site"

/** Bayilik başvuru formu.
 *
 * Sitenin arkasında form alan bir sunucu yok; başvuru, girilen bilgilerle
 * hazırlanmış bir WhatsApp mesajı olarak iletilir. Böylece başvuru hiçbir
 * üçüncü taraf servise uğramadan doğrudan yetkiliye ulaşır. */
export function BayilikForm() {
  const [form, setForm] = useState({
    ad: "",
    firma: "",
    sehir: "",
    telefon: "",
    faaliyet: "",
    hacim: "",
    not: "",
  })

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const ready = form.ad.trim() !== "" && form.telefon.trim() !== ""

  const message = [
    "Bayilik başvurusu",
    "",
    `Ad Soyad: ${form.ad}`,
    form.firma ? `Firma: ${form.firma}` : null,
    form.sehir ? `Şehir: ${form.sehir}` : null,
    `Telefon: ${form.telefon}`,
    form.faaliyet ? `Faaliyet alanı: ${form.faaliyet}` : null,
    form.hacim ? `Tahmini aylık hacim: ${form.hacim}` : null,
    form.not ? `Not: ${form.not}` : null,
  ]
    .filter((l): l is string => l !== null)
    .join("\n")

  return (
    <form
      className="mt-8 space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        window.open(whatsappLink(message), "_blank", "noopener,noreferrer")
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Ad Soyad" required value={form.ad} onChange={set("ad")} />
        <Field label="Firma" value={form.firma} onChange={set("firma")} />
        <Field label="Şehir" value={form.sehir} onChange={set("sehir")} />
        <Field
          label="Telefon"
          required
          type="tel"
          value={form.telefon}
          onChange={set("telefon")}
        />
        <Field
          label="Faaliyet alanı"
          placeholder="eczane, spor salonu, klinik…"
          value={form.faaliyet}
          onChange={set("faaliyet")}
        />
        <Field
          label="Tahmini aylık hacim"
          value={form.hacim}
          onChange={set("hacim")}
        />
      </div>

      <label className="block">
        <span className="text-xs font-bold uppercase tracking-eyebrow text-ink-soft">
          Eklemek istedikleriniz
        </span>
        <textarea
          rows={4}
          value={form.not}
          onChange={set("not")}
          className="mt-1.5 w-full rounded border border-line px-3 py-2 text-sm outline-none focus:border-zphc-blue"
        />
      </label>

      <button
        type="submit"
        disabled={!ready}
        className="inline-flex items-center rounded bg-zphc-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zphc-blue-light disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-soft"
      >
        Başvuruyu WhatsApp ile gönder
      </button>

      <p className="text-xs text-ink-soft">
        Form gönderildiğinde bilgileriniz WhatsApp mesajı olarak hazırlanır;
        göndermeden önce mesajı görebilir ve düzenleyebilirsiniz. Veriler bu
        sitede saklanmaz.
      </p>
    </form>
  )
}

function Field({
  label,
  required = false,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string
  required?: boolean
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-eyebrow text-ink-soft">
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-1.5 w-full rounded border border-line px-3 py-2 text-sm outline-none focus:border-zphc-blue"
      />
    </label>
  )
}
