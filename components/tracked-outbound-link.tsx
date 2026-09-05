"use client"

import type { ReactNode } from "react"
import { track } from "@vercel/analytics"

/** External contact links are the store's conversion boundary. Keeping the
 * event here makes every WhatsApp entry point measurable without changing
 * navigation or delaying the visitor. */
export function TrackedOutboundLink({
  href,
  eventName,
  properties,
  ariaLabel,
  className,
  children,
}: {
  href: string
  eventName: string
  properties?: Record<string, string>
  ariaLabel?: string
  className?: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
      onClick={() => track(eventName, properties)}
    >
      {children}
    </a>
  )
}
