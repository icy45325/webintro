"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { WorkCategory, WorkMeta } from "@/lib/content";
import { WorkCard } from "./work-card";
import { cn } from "@/lib/cn";

type Filter = "all" | WorkCategory;

interface Props {
  works: WorkMeta[];
}

export function WorkGrid({ works }: Props) {
  const t = useTranslations("works");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () => (filter === "all" ? works : works.filter((w) => w.category === filter)),
    [works, filter],
  );

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t("all") },
    { key: "built", label: t("built") },
    { key: "concept", label: t("concept") },
    { key: "research", label: t("research") },
  ];

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-6 border-b border-ink/10 pb-4">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "text-[12px] tracking-[0.2em] uppercase transition-colors",
              filter === f.key ? "text-ink" : "text-ink/40 hover:text-ink",
            )}
          >
            {f.label}
            <span className="ml-2 font-mono text-[10px] text-ink/40">
              {f.key === "all"
                ? works.length
                : works.filter((w) => w.category === f.key).length}
            </span>
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="text-ink/60 py-20 text-center">{t("empty")}</p>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
          {filtered.map((w, i) => (
            <WorkCard key={w.slug} work={w} index={i} priority={i < 3} />
          ))}
        </div>
      )}
    </>
  );
}
