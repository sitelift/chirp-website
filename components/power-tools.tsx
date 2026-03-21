"use client";
import { motion } from "framer-motion";
import { SlidersHorizontal, BookA, Zap } from "lucide-react";

export function PowerTools() {
  return (
    <div className="w-full max-w-[1060px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
      
      {/* Tone Modes Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
        className="col-span-1 md:col-span-2 rounded-3xl bg-white border border-chirp-stone-100 p-8 md:p-10 shadow-elevated flex flex-col justify-between overflow-hidden relative"
      >
        <div className="relative z-10 w-full md:w-2/3">
           <div className="h-12 w-12 rounded-2xl bg-chirp-stone-50 border border-chirp-stone-100 flex items-center justify-center mb-6">
             <SlidersHorizontal className="w-6 h-6 text-chirp-amber-500" strokeWidth={2} />
           </div>
           <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-chirp-stone-900">Tone Modes</h3>
           <p className="text-chirp-stone-500 mt-4 text-lg leading-relaxed">Instantly switch between Casual, Professional, and Concise phrasing. The AI adapts the transcription to match your exact intent without losing your core message.</p>
        </div>
        
        {/* Mock UI */}
        <div className="mt-10 bg-chirp-stone-50 rounded-2xl p-3 border border-chirp-stone-100/80 flex flex-wrap gap-2 shadow-inner w-full md:w-fit self-end">
           <div className="px-5 py-2.5 rounded-xl text-sm font-semibold text-chirp-stone-500 cursor-pointer hover:bg-chirp-stone-100 transition-colors">Casual</div>
           <div className="px-5 py-2.5 rounded-xl bg-white shadow-lifted border border-chirp-stone-200 text-sm font-bold text-chirp-stone-900 ring-1 ring-black/5 flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-chirp-amber-400" />
             Professional
           </div>
           <div className="px-5 py-2.5 rounded-xl text-sm font-semibold text-chirp-stone-500 cursor-pointer hover:bg-chirp-stone-100 transition-colors">Concise</div>
        </div>
      </motion.div>

      {/* Custom Dict Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: 0.1 }}
        className="col-span-1 border-chirp-stone-100 border rounded-3xl p-8 md:p-10 shadow-elevated bg-gradient-to-b from-white to-chirp-stone-50/50 flex flex-col"
      >
        <div className="h-12 w-12 rounded-2xl bg-white shadow-sm border border-chirp-stone-100 flex items-center justify-center mb-6">
          <BookA className="w-6 h-6 text-chirp-amber-500" strokeWidth={2} />
        </div>
        <h3 className="font-display text-3xl font-extrabold tracking-tight text-chirp-stone-900">Custom Dict</h3>
        <p className="text-chirp-stone-500 mt-4 text-lg leading-relaxed">Add your team's specific jargon, acronyms, and names. Chirp spells them flawlessly every time.</p>
        
        <div className="mt-auto pt-10">
          <div className="px-4 py-3 rounded-xl bg-white border border-chirp-stone-200 shadow-sm font-mono text-sm font-medium text-chirp-stone-600 flex justify-between items-center">
            <span>Kubernetes</span>
            <span className="text-chirp-success">✓</span>
          </div>
        </div>
      </motion.div>

      {/* Native Performance Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: 0.2 }}
        className="col-span-1 md:col-span-3 border-chirp-stone-100 border rounded-3xl p-8 md:p-10 shadow-elevated bg-white flex flex-col md:flex-row items-center justify-between gap-10"
      >
         <div className="w-full md:w-1/2">
           <div className="h-12 w-12 rounded-2xl bg-chirp-stone-50 border border-chirp-stone-100 flex items-center justify-center mb-6">
             <Zap className="w-6 h-6 text-chirp-amber-500" strokeWidth={2} />
           </div>
           <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-chirp-stone-900">Native Performance</h3>
           <p className="text-chirp-stone-500 mt-4 text-lg leading-relaxed">Engineered in Rust and C++ for absolute maximum efficiency. Barely registers on your CPU, ensuring your other dev tools never skip a beat.</p>
         </div>
         <div className="flex gap-4 w-full md:w-auto justify-center">
            <div className="flex flex-col items-center justify-center w-28 h-28 rounded-3xl bg-chirp-stone-50 border border-chirp-stone-100 shadow-sm">
              <span className="font-mono text-2xl font-bold text-chirp-stone-900">M1+</span>
              <span className="text-xs font-semibold text-chirp-stone-400 mt-1 uppercase">Apple Sil.</span>
            </div>
            <div className="flex flex-col items-center justify-center w-28 h-28 rounded-3xl bg-chirp-stone-50 border border-chirp-stone-100 shadow-sm">
              <span className="font-mono text-2xl font-bold text-chirp-stone-900">x86</span>
              <span className="text-xs font-semibold text-chirp-stone-400 mt-1 uppercase">Intel/AMD</span>
            </div>
         </div>
      </motion.div>
    </div>
  );
}
