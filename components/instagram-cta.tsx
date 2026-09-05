import { instagramHandle, instagramUrl } from "@/lib/contact"
import { TrackedOutboundLink } from "@/components/tracked-outbound-link"

export function InstagramCta({ compact = false }: { compact?: boolean }) {
  return (
    <TrackedOutboundLink
      href={instagramUrl}
      eventName="Instagram Click"
      ariaLabel={`${instagramHandle} Instagram hesabını aç`}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#d62976]/35 bg-white font-bold text-[#a51e68] shadow-sm transition hover:border-[#d62976]/60 hover:bg-[#fff7fb] ${compact ? "px-4 text-xs" : "px-5 text-sm"}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.5" cy="6.7" r="1" fill="currentColor" stroke="none" />
      </svg>
      Instagram {instagramHandle}
    </TrackedOutboundLink>
  )
}
