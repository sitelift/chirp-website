"use client";
import { motion } from "framer-motion";
import { SlidersHorizontal, BookA, Zap } from "lucide-react";

export function PowerTools() {
  return (
    <div className="mx-auto mt-20 grid w-full max-w-[1060px] grid-cols-1 gap-8 md:grid-cols-3 md:mt-24 md:gap-8">
      
      {/* Tone Modes Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
        className="relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl border border-chirp-stone-200 bg-white p-8 md:col-span-2 md:p-10"
      >
        <div className="relative z-10 w-full md:w-2/3">
           <div className="h-12 w-12 rounded-2xl bg-chirp-stone-50 border border-chirp-stone-100 flex items-center justify-center mb-6">
             <SlidersHorizontal className="w-6 h-6 text-chirp-amber-500" strokeWidth={2} />
           </div>
           <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-chirp-stone-900">Tone Modes</h3>
           <p className="text-chirp-stone-500 mt-4 text-lg leading-relaxed">Instantly switch between Casual, Professional, and Concise phrasing. The AI adapts the transcription to match your exact intent without losing your core message.</p>
        </div>
        
        {/* Mock UI */}
        <div className="mt-10 flex w-full flex-wrap gap-2 self-end rounded-2xl border border-chirp-stone-200 bg-chirp-stone-50 p-3 md:w-fit">
           <div className="px-5 py-2.5 rounded-xl text-sm font-semibold text-chirp-stone-500 cursor-pointer hover:bg-chirp-stone-100 transition-colors">Casual</div>
           <div className="flex items-center gap-2 rounded-xl border border-chirp-stone-200 bg-white px-5 py-2.5 text-sm font-bold text-chirp-stone-900">
             <div className="w-2 h-2 rounded-full bg-chirp-amber-400" />
             Professional
           </div>
           <div className="px-5 py-2.5 rounded-xl text-sm font-semibold text-chirp-stone-500 cursor-pointer hover:bg-chirp-stone-100 transition-colors">Concise</div>
        </div>
      </motion.div>

      {/* Custom Dict Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: 0.1 }}
        className="col-span-1 flex flex-col rounded-3xl border border-chirp-stone-200 bg-chirp-stone-50 p-8 md:p-10"
      >
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-chirp-stone-200 bg-white">
          <BookA className="w-6 h-6 text-chirp-amber-500" strokeWidth={2} />
        </div>
        <h3 className="font-display text-3xl font-extrabold tracking-tight text-chirp-stone-900">Custom Dict</h3>
        <p className="text-chirp-stone-500 mt-4 text-lg leading-relaxed">Add your team&apos;s specific jargon, acronyms, and names. Chirp spells them flawlessly every time.</p>
        
        <div className="mt-auto pt-10">
          <div className="flex items-center justify-between rounded-xl border border-chirp-stone-200 bg-white px-4 py-3 font-mono text-sm font-medium text-chirp-stone-600">
            <span>Kubernetes</span>
            <span className="text-chirp-success">✓</span>
          </div>
        </div>
      </motion.div>

      {/* Native Performance Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: 0.2 }}
        className="col-span-1 flex flex-col items-center justify-between gap-10 rounded-3xl border border-chirp-stone-200 bg-white p-8 md:col-span-3 md:flex-row md:p-10"
      >
         <div className="w-full md:w-1/2">
           <div className="h-12 w-12 rounded-2xl bg-chirp-stone-50 border border-chirp-stone-100 flex items-center justify-center mb-6">
             <Zap className="w-6 h-6 text-chirp-amber-500" strokeWidth={2} />
           </div>
           <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-chirp-stone-900">Native Performance</h3>
           <p className="text-chirp-stone-500 mt-4 text-lg leading-relaxed">Engineered in Rust and C++ for absolute maximum efficiency. Barely registers on your CPU, ensuring your other dev tools never skip a beat.</p>
         </div>
         <div className="flex gap-4 w-full md:w-auto justify-center">
            <div className="flex h-28 w-28 flex-col items-center justify-center rounded-3xl border border-chirp-stone-200 bg-chirp-stone-50">
              <span className="font-mono text-2xl font-bold text-chirp-stone-900">M1+</span>
              <span className="mt-1 text-xs font-semibold uppercase text-chirp-stone-400">Apple Sil.</span>
            </div>
            <div className="flex h-28 w-28 flex-col items-center justify-center rounded-3xl border border-chirp-stone-200 bg-chirp-stone-50">
              <span className="font-mono text-2xl font-bold text-chirp-stone-900">x86</span>
              <span className="text-xs font-semibold text-chirp-stone-400 mt-1 uppercase">Intel/AMD</span>
            </div>
         </div>
      </motion.div>
    </div>
  );
}
