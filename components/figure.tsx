import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  width?: number;
  height?: number;
  aspect?: string;
}

export function Figure({ src, alt, caption, credit, width, height, aspect = "3/2" }: Props) {
  return (
    <figure className="my-12">
      <div
        className="relative w-full bg-ink/5 overflow-hidden"
        style={{ aspectRatio: aspect }}
      >
        {width && height ? (
          <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto" />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover"
          />
        )}
      </div>
      {(caption || credit) && (
        <figcaption className="mt-3 flex justify-between gap-6 text-[12px] text-ink/60">
          <span>{caption}</span>
          {credit ? (
            <span className="shrink-0 font-mono uppercase tracking-[0.15em] text-[10px]">
              © {credit}
            </span>
          ) : null}
        </figcaption>
      )}
    </figure>
  );
}
