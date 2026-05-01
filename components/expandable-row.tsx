"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";

// Ported pattern from the Chirp app's HomeHistoryList. Tap a row →
// drawer animates open inline. Used on the website for FAQ and
// changelog entries.
//
// Animation strategy: snap the drawer to its full height in one frame
// (avoids the layout-recalc jank of CSS grid-template-rows) and fade
// the inner content over 180ms. Reads as snappier than smooth-resize.

interface ExpandableRowProps {
  /** What's always visible. Click target. */
  summary: ReactNode;
  /** What appears when expanded. */
  children: ReactNode;
  /** Optionally controlled — for accordions where only one row is
   *  open at a time. If omitted, each row owns its own state. */
  open?: boolean;
  onToggle?: (open: boolean) => void;
  className?: string;
  summaryClassName?: string;
  contentClassName?: string;
}

export function ExpandableRow({
  summary,
  children,
  open: controlledOpen,
  onToggle,
  className = "",
  summaryClassName = "",
  contentClassName = "",
}: ExpandableRowProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const handleToggle = () => {
    const next = !isOpen;
    if (!isControlled) setUncontrolledOpen(next);
    onToggle?.(next);
  };

  // Track whether the row was ever opened — used so the drawer's
  // animate-fade-in only plays once per session.
  const wasOpenedRef = useRef(false);
  useEffect(() => {
    if (isOpen) wasOpenedRef.current = true;
  }, [isOpen]);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        className={`w-full text-left transition-transform duration-100 active:scale-[0.997] ${summaryClassName}`}
      >
        {summary}
      </button>
      {isOpen && (
        <div
          className={`animate-fade-in pt-3 ${contentClassName}`}
          aria-hidden={!isOpen}
        >
          {children}
        </div>
      )}
    </div>
  );
}
