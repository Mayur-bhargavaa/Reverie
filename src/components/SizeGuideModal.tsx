"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const sizeData = {
  headers: ["Size", "US", "Bust (in)", "Waist (in)", "Hip (in)"],
  rows: [
    ["XS", "0–2", "32–33", "24–25", "34–35"],
    ["S", "4–6", "34–35", "26–27", "36–37"],
    ["M", "8–10", "36–37", "28–29", "38–39"],
    ["L", "12–14", "38–40", "30–32", "40–42"],
    ["XL", "16–18", "41–43", "33–35", "43–45"],
  ],
};

export default function SizeGuideModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <h2 className="font-serif text-2xl font-light">Size Guide</h2>
          <button onClick={onClose} className="hover:opacity-60 transition-opacity">
            <X size={20} />
          </button>
        </div>

        <div className="px-8 py-6 space-y-8">
          {/* How to measure */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-gray-500 mb-4">How to Measure</h3>
            <ul className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <li>
                <span className="font-medium text-black">Bust —</span> Measure around the fullest part of your chest, keeping the tape parallel to the ground.
              </li>
              <li>
                <span className="font-medium text-black">Waist —</span> Measure around the narrowest part of your natural waist, usually just above the belly button.
              </li>
              <li>
                <span className="font-medium text-black">Hip —</span> Measure around the widest part of your hips and seat, about 7–9 inches below your natural waist.
              </li>
            </ul>
          </div>

          {/* Size table */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-gray-500 mb-4">Women's Sizing</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-black">
                    {sizeData.headers.map((h) => (
                      <th key={h} className="text-left py-3 pr-4 text-xs tracking-widest uppercase font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeData.rows.map((row, i) => (
                    <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-[#faf9f7]" : "bg-white"}`}>
                      {row.map((cell, j) => (
                        <td key={j} className={`py-3 pr-4 ${j === 0 ? "font-semibold" : "text-gray-600"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fit note */}
          <div className="bg-[#f5f2ef] px-5 py-4 text-sm text-gray-600 leading-relaxed">
            <span className="font-medium text-black">Fit tip: </span>
            Our models are typically 5'9"–5'11" and wear a size XS or S. If you're between sizes,
            we recommend sizing up for a relaxed fit or sizing down for a more fitted look.
          </div>

          <button
            onClick={onClose}
            className="w-full bg-black text-white text-xs tracking-widest uppercase py-4 font-medium hover:bg-black/80 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
