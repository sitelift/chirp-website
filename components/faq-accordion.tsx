"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { FAQ_SECTIONS } from "@/lib/constants";

interface FaqAccordionProps {
  sections: typeof FAQ_SECTIONS;
}

export function FaqAccordion({ sections }: FaqAccordionProps) {
  return (
    <div>
      {sections.map((section, sectionIndex) => (
        <div key={section.title}>
          <h2
            className={`font-mono text-xs text-chirp-stone-400 uppercase tracking-[0.08em] mb-4 ${
              sectionIndex === 0 ? "mt-0" : "mt-12"
            }`}
          >
            {section.title}
          </h2>

          <Accordion.Root type="multiple">
            {section.items.map((item) => (
              <Accordion.Item
                key={item.question}
                value={item.question}
                className="border-b border-black/[0.06]"
              >
                <Accordion.Header asChild>
                  <Accordion.Trigger className="group flex w-full items-center justify-between py-5 text-left text-[17px] font-body font-medium text-chirp-stone-900 hover:text-chirp-stone-700">
                    <span>{item.question}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 ml-4 text-chirp-stone-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    >
                      <path d="M4 6l4 4 4-4" />
                    </svg>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <p className="text-chirp-stone-600 text-base leading-relaxed pb-5">
                    {item.answer}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      ))}
    </div>
  );
}
