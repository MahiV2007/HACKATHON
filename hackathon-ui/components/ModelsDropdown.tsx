// "use client";

// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { useModel } from "@/lib/store/useModel";

// const models = [
//   "Llama 3 8B",
//   "Llama 3 70B",
//   "Mistral 7B",
//   "Gemma 7B",
//   "Claude Haiku",
//   "Claude Sonnet",
//   "GPT-4o",
//   "GPT-3.5 Turbo",
// ];

// export default function ModelsDropdown({
//   close,
// }: {
//   close: () => void;
// }) {
//   const router = useRouter();
//   const { setModel } = useModel();

//   return (
//     <div
//       className="fixed inset-0 z-40 flex items-start justify-center pt-24"
//       onClick={close}
//     >
//       {/* BACKDROP */}
//       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

//       {/* PANEL */}
//       <motion.div
//         initial={{ opacity: 0, y: -20, scale: 0.98 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.25 }}
//         onClick={(e) => e.stopPropagation()}
//         className="
//           relative z-50
//           w-[90%] max-w-3xl
//           p-6 rounded-2xl
//           bg-[#020617]/90 backdrop-blur-xl
//           border border-white/10
//           shadow-[0_20px_80px_rgba(0,0,0,0.6)]
//         "
//       >
//         {/* TITLE */}
//         <h2 className="text-lg font-semibold mb-6 text-white">
//           Models
//         </h2>

//         {/* GRID */}
//         <div className="grid grid-cols-2 gap-4">
//           {models.map((model) => (
//             <motion.div
//               key={model}
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: 0.97 }}
//               className="
//                 p-4 rounded-xl
//                 bg-white/5 border border-white/10
//                 hover:bg-white/10
//                 transition cursor-pointer
//                 group relative overflow-hidden
//               "
//               onClick={() => {
//                 setModel(model);   // 🔥 store selected model
//                 close();
//                 router.push("/models"); // 🔥 go to SAME page
//               }}
//             >
//               {/* subtle hover glow */}
//               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />

//               <p className="relative font-medium text-white">
//                 {model}
//               </p>

//               <p className="relative text-xs text-gray-400 mt-1">
//                 View capabilities →
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// }