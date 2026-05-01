"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { HOME_PREVIEW_FAQS } from "@/lib/constants";

// Client-side accordion list. Source is lib/constants.ts
// HOME_PREVIEW_FAQS — same array used to seed the homepage preview
// in the legacy layout. Items render in a hairline-divided list,
// chevron rotates on open, content slides via the accordion-down /
// accordion-up keyframes from globals.css.

export function FAQAccordion() {
  return (
    <Accordion.Root type="multiple" className="flex flex-col">
      {HOME_PREVIEW_FAQS.map((faq, idx) => (
        <Accordion.Item
          key={faq.question}
          value={faq.question}
          className="animate-slide-up border-b border-white/[0.08] first:border-t first:border-white/[0.08]"
          style={{ animationDelay: `${Math.min(idx * 60, 360)}ms` }}
        >
          <Accordion.Header asChild>
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-150 hover:text-white">
              <span className="font-display text-[17px] font-medium tracking-tight text-white md:text-[18px]">
                {faq.question}
              </span>
              <ChevronDown
                size={18}
                strokeWidth={1.5}
                className="shrink-0 text-white/30 transition-all duration-200 group-hover:text-white/65 group-data-[state=open]:rotate-180 group-data-[state=open]:text-white/65"
                aria-hidden
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <p className="pb-6 pr-12 font-body text-[15px] leading-[1.7] text-white/65 md:text-[15.5px]">
              {faq.answer}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
