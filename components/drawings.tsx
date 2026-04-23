"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

interface Drawing {
  src: string;
  label?: string;
  type?: "plan" | "section" | "axon" | "detail" | string;
}

interface Props {
  items: Drawing[];
  heading?: string;
}

export function Drawings({ items, heading }: Props) {
  const t = useTranslations("workDetail");
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? null : (i + 1) % items.length));
      if (e.key === "ArrowLeft")
        setActive((i) => (i === null ? null : (i - 1 + items.length) % items.length));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, items.length]);

  return (
    <section className="my-16">
      <h3 className="mb-6 text-[11px] tracking-[0.3em] uppercase text-ink/60">
        {heading ?? t("drawings")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((d, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="group text-left"
          >
            <div className="relative aspect-[4/3] bg-bg border border-ink/15 overflow-hidden">
              <Image
                src={d.src}
                alt={d.label ?? `Drawing ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-6 transition-opacity group-hover:opacity-80"
              />
            </div>
            <div className="mt-2 flex items-baseline justify-between text-[11px] uppercase tracking-[0.2em] text-ink/60">
              <span>{d.label}</span>
              {d.type ? <span className="font-mono">{d.type}</span> : null}
            </div>
          </button>
        ))}
      </div>

      {active !== null ? (
        <div
          className={cn(
            "fixed inset-0 z-[100] bg-ink/90 flex items-center justify-center p-8",
            "animate-in fade-in",
          )}
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Close"
            className="absolute top-6 right-6 text-bg text-sm tracking-[0.2em] uppercase"
            onClick={() => setActive(null)}
          >
            Close ✕
          </button>
          <div className="relative w-full h-full max-w-[1600px]">
            <Image
              src={items[active].src}
              alt={items[active].label ?? ""}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
