"use client";

import { motion } from "framer-motion";

export default function CrossedWires() {
  return (
    <div className="relative w-40 h-32 flex items-center justify-center">
      <svg
        width="160"
        height="120"
        viewBox="0 0 160 120"
        fill="none"
        className="absolute"
      >
        {/* Wire 1 */}
        <path
          d="M0 10 C 60 10, 100 110, 160 110"
          stroke="url(#grad1)"
          strokeWidth="2"
          opacity="0.6"
        />

        {/* Wire 2 */}
        <path
          d="M0 110 C 60 110, 100 10, 160 10"
          stroke="url(#grad2)"
          strokeWidth="2"
          opacity="0.6"
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="grad1" x1="0" y1="0" x2="160" y2="120">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>

          <linearGradient id="grad2" x1="0" y1="120" x2="160" y2="0">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Glow pulse 1 */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_12px_#3b82f6]"
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          offsetPath:
            "path('M0 10 C 60 10, 100 110, 160 110')",
        }}
      />

      {/* Glow pulse 2 */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_12px_#a855f7]"
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          offsetPath:
            "path('M0 110 C 60 110, 100 10, 160 10')",
        }}
      />
    </div>
  );
}