import type { ComponentPropsWithoutRef } from "react";
import { Figure } from "./figure";
import { Process } from "./process";
import { Drawings } from "./drawings";

export const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="font-serif text-3xl md:text-4xl leading-tight mt-16 mb-6" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="font-serif text-2xl md:text-3xl leading-tight mt-14 mb-5" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="font-serif text-xl mt-10 mb-4" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="my-5 leading-[1.8] text-ink/85" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-10 border-l-2 border-accent pl-6 font-serif text-xl leading-relaxed text-ink/80"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-ink/10" />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="my-5 list-disc pl-6 space-y-2" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="my-5 list-decimal pl-6 space-y-2" {...props} />
  ),
  Figure,
  Process,
  Drawings,
};
