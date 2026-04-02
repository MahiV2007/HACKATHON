// components/ModelCard.tsx

"use client";

import { motion } from "framer-motion";

type ModelCardProps = {
  name: string;
  description: string;
  tag?: string;
};

export default function ModelCard({ name, description, tag }: ModelCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative w-[420px] min-h-[260px] rounded-3xl p-[1px] overflow-hidden group"
    >
      {/* Animated Gradient Border */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-40 blur-xl group-hover:opacity-70 transition duration-500" />

      {/* Card Content */}
      <div className="relative h-full w-full rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-between">

        {/* TOP */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              {name}
            </h2>

            {tag && (
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-white/10 backdrop-blur-md">
                {tag}
              </span>
            )}
          </div>

          {/* Accent line with glow */}
          <div className="relative mt-3 mb-4">
            <div className="w-14 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
            <div className="absolute top-0 left-0 w-14 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400 blur-md opacity-70" />
          </div>

          {/* Description */}
          <p className="text-sm text-zinc-300 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Bottom glow fade */}
        <div className="relative mt-6 h-12">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-b-2xl" />
        </div>
      </div>
    </motion.div>
  );
}

