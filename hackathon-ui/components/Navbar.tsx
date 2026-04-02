"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModel } from "@/lib/store/useModel";

const models = [
  "Llama 3 8B",
  "Llama 3 70B",
  "Mistral 7B",
  "Gemma 7B",
  "Claude Haiku",
  "Claude Sonnet",
  "GPT-4o",
  "GPT-3.5 Turbo",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { setModel } = useModel();
  const router = useRouter();

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          fixed top-20 left-1/2 -translate-x-1/2 z-50
          w-[92%] max-w-6xl
        "
      >
        <div
          className="
            relative flex items-center justify-between
            px-6 py-3
            rounded-2xl
            bg-white/[0.04]
            backdrop-blur-2xl
            border border-white/10
            shadow-[0_10px_60px_rgba(0,0,0,0.6)]
            overflow-hidden
          "
        >
          {/* glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent opacity-60 pointer-events-none" />

          {/* LEFT */}
          <div className="flex items-center gap-4 z-10">
            <div className="relative">
              <div className="w-10 h-13 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500" />
              <div className="absolute inset-0 blur-md bg-blue-500/50 rounded-lg" />
            </div>

            <span className="text-xl font-semibold tracking-wide text-white">
              PROMPTOPS
            </span>
          </div>

          {/* CENTER NAV */}
          <div className="hidden md:flex items-center gap-10 text-sm text-gray-400 z-10">
            
            {/* MODELS (custom click) */}
            <button
              onClick={() => setOpen(!open)}
              className="relative group"
            >
              <span className="group-hover:text-white transition">
                Models
              </span>
              <span className="
                absolute left-0 -bottom-1 h-[2px] w-0
                bg-gradient-to-r from-blue-400 to-purple-500
                transition-all duration-300
                group-hover:w-full
              " />
            </button>

            {/* OTHER LINKS */}
            {["Analytics"].map((item) => (
              <Link
                key={item}
                href="/analytics"
                className="relative group"
              >
                <span className="group-hover:text-white transition">
                  {item}
                </span>
                <span className="
                  absolute left-0 -bottom-1 h-[2px] w-0
                  bg-gradient-to-r from-blue-400 to-purple-500
                  transition-all duration-300
                  group-hover:w-full
                " />
              </Link>
            ))}
          </div>

          {/* RIGHT */}
          <div className="z-10 hidden md:flex items-center">
            <div className="
              px-3 py-1 rounded-full
              text-xs text-green-400
              bg-green-500/10
              border border-green-500/20
            ">
              ● Live
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ================= DROPDOWN ================= */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex items-start justify-center pt-24"
          onClick={() => setOpen(false)}
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="
              relative z-50
              w-[90%] max-w-3xl
              p-6 rounded-2xl
              bg-[#020617]/90 backdrop-blur-xl
              border border-white/10
              shadow-2xl
            "
          >
            <h2 className="text-lg font-semibold mb-6 text-white">
              Models
            </h2>
            
            {/* GRID */}
            <div className="grid grid-cols-2 gap-4">
              {models.map((model) => (
                <motion.div
                  key={model}
                  whileHover={{ scale: 1.04 }}
                  className="
                    p-4 rounded-xl
                    bg-white/5 border border-white/10
                    hover:bg-white/10
                    transition cursor-pointer
                  "
                  onClick={() => {
  setModel(model);     // store selected model
  setOpen(false);      // close dropdown
  router.push("/models"); // go to models page
}}
                  
                >
                  <p className="font-medium text-white">{model}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    View details →
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
