"use client";

import Link from "next/link";
import { useRef } from "react";

export default function MobileMenu({
  items,
}: {
  items: readonly (readonly [string, string])[];
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  return (
    <details ref={detailsRef}>
      <summary>Menu</summary>
      <nav aria-label="Mobile navigation">
        {items.map(([label, href]) => (
          <Link
            href={href}
            key={href}
            onClick={() => detailsRef.current?.removeAttribute("open")}
          >
            {label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
