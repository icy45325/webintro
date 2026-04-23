"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { locales, localeNames, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Locale) {
    if (next === locale) return;
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || `/${next}`);
  }

  return (
    <div className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          <button
            onClick={() => switchTo(l)}
            className={cn(
              "transition-colors",
              l === locale ? "text-ink" : "text-ink/40 hover:text-ink",
            )}
          >
            {localeNames[l]}
          </button>
          {i < locales.length - 1 ? <span className="text-ink/20">/</span> : null}
        </span>
      ))}
    </div>
  );
}
