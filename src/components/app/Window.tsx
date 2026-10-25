import type { ReactNode } from "react";

/** A Windows desktop window: cream paper, title on the left, caption buttons on the right. */
export default function Window({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`window ${className}`}>
      <div className="flex h-10 items-center justify-between pl-4 text-[12px] text-muted">
        <span className="truncate font-[family-name:var(--font-ui)]">{title}</span>
        <span className="flex h-full shrink-0 items-stretch text-[#4a4945]" aria-hidden>
          <Caption>
            <path d="M1 5.5h9" />
          </Caption>
          <Caption>
            <rect x="1.5" y="1.5" width="8" height="8" rx="1.5" />
          </Caption>
          <Caption>
            <path d="M1.5 1.5l8 8M9.5 1.5l-8 8" />
          </Caption>
        </span>
      </div>
      {children}
    </div>
  );
}

function Caption({ children }: { children: ReactNode }) {
  return (
    <span className="flex w-11 items-center justify-center">
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1">
        {children}
      </svg>
    </span>
  );
}
