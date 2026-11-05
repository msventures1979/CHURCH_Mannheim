import Link from "next/link";
import type { ReactNode } from "react";

export const buttonCls =
  "inline-block border border-foreground px-8 py-3 text-sm uppercase tracking-widest text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background";

export default function ButtonLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={buttonCls}>
      {children}
    </Link>
  );
}
