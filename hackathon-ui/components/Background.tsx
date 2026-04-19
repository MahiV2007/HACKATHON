"use client";

import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Animated gradient blobs */}
      <motion.div
        animate={{ x: [0, 100, -50, 0], y: [0, -50, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full"
      />

      <motion.div
        animate={{ x: [0, -100, 50, 0], y: [0, 50, -50, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full"
      />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
  );
}