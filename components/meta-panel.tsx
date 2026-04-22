import { getTranslations } from "next-intl/server";
import type { WorkMeta } from "@/lib/content";

interface Props {
  work: WorkMeta;
}

export async function MetaPanel({ work }: Props) {
  const t = await getTranslations("workDetail");

  const rows: { label: string; value: string | undefined }[] = [
    { label: t("year"), value: String(work.year) },
    { label: t("location"), value: work.location },
    { label: t("program"), value: work.program },
    { label: t("area"), value: work.area ? `${work.area} m²` : undefined },
    { label: t("status"), value: work.status },
    { label: t("client"), value: work.client },
    { label: t("role"), value: work.role },
    { label: t("photographer"), value: work.photographer },
  ];

  return (
    <aside className="sticky top-24 self-start text-sm">
      <dl className="border-t border-ink/20">
        {rows
          .filter((r) => r.value)
          .map((r) => (
            <div
              key={r.label}
              className="grid grid-cols-[auto_1fr] gap-4 border-b border-ink/10 py-3"
            >
              <dt className="text-[11px] tracking-[0.2em] uppercase text-ink/50">
                {r.label}
              </dt>
              <dd className="text-ink">{r.value}</dd>
            </div>
          ))}
        {work.collaborators && work.collaborators.length > 0 ? (
          <div className="grid grid-cols-[auto_1fr] gap-4 border-b border-ink/10 py-3">
            <dt className="text-[11px] tracking-[0.2em] uppercase text-ink/50">
              {t("collaborators")}
            </dt>
            <dd className="text-ink space-y-1">
              {work.collaborators.map((c, i) => (
                <div key={i}>
                  <span>{c.name}</span>
                  {c.role ? <span className="text-ink/50"> · {c.role}</span> : null}
                </div>
              ))}
            </dd>
          </div>
        ) : null}
      </dl>
    </aside>
  );
}
