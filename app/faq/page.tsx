import { FAQ_SECTIONS } from "@/lib/constants";
import { FaqAccordion } from "@/components/faq-accordion";

export const metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-[640px] px-6 pt-32 pb-20">
      <h1 className="font-display font-bold text-3xl md:text-5xl text-chirp-stone-900">
        FAQ
      </h1>
      <p className="text-chirp-stone-500 mt-3">
        Answers to common questions.
      </p>

      <div className="mt-8">
        <FaqAccordion sections={FAQ_SECTIONS} />
      </div>
    </main>
  );
}
