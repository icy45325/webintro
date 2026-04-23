import Image from "next/image";
import { getTranslations } from "next-intl/server";

interface Item {
  src: string;
  caption?: string;
}

interface Props {
  items: Item[];
  heading?: string;
}

export async function Process({ items, heading }: Props) {
  const t = await getTranslations("workDetail");
  const label = heading ?? t("process");

  return (
    <section className="my-16">
      <h3 className="mb-6 text-[11px] tracking-[0.3em] uppercase text-ink/60">
        {label}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <figure key={i} className="space-y-2">
            <div className="relative aspect-[4/3] bg-ink/5 overflow-hidden">
              <Image
                src={item.src}
                alt={item.caption ?? `Process ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            {item.caption ? (
              <figcaption className="text-[11px] text-ink/50">{item.caption}</figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </section>
  );
}
