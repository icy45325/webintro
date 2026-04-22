import Image from "next/image";
import Link from "next/link";
import type { WorkMeta } from "@/lib/content";
import { cn } from "@/lib/cn";

interface Props {
  work: WorkMeta;
  priority?: boolean;
  index?: number;
}

export function WorkCard({ work, priority, index }: Props) {
  const locked = work.visibility === "preview";
  return (
    <Link
      href={`/${work.locale}/works/${work.slug}`}
      className="group block break-inside-avoid mb-10"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-ink/5">
        {work.cover ? (
          <Image
            src={work.cover}
            alt={work.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder={work.coverBlur ? "blur" : "empty"}
            blurDataURL={work.coverBlur}
            priority={priority}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          />
        ) : null}
        {locked ? (
          <span
            className={cn(
              "absolute top-3 right-3 text-[10px] tracking-[0.2em] uppercase",
              "bg-bg/90 px-2 py-1 border border-ink/20",
            )}
          >
            NDA
          </span>
        ) : null}
        {typeof index === "number" ? (
          <span className="absolute bottom-3 left-3 font-mono text-[11px] text-bg mix-blend-difference">
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-lg leading-tight">{work.title}</h3>
        <span className="font-mono text-[11px] tracking-wider text-ink/60 shrink-0">
          {work.year}
        </span>
      </div>
      <div className="mt-1 text-[12px] text-ink/60">{work.location}</div>
    </Link>
  );
}
