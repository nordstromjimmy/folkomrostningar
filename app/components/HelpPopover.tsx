"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type HelpPopoverProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export default function HelpPopover({
  title = "Information",
  children,
  className,
}: HelpPopoverProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  // Close on click outside / Esc
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  return (
    <div className={`relative inline-block ${className ?? ""}`}>
      <button
        type="button"
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white text-xs font-bold text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        ?
      </button>

      {open && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label={title}
          className="
            absolute z-50 mt-2
            w-64 max-w-[calc(100vw-2rem)]
            right-0
            rounded-lg border border-gray-200 bg-white p-3
            text-xs text-gray-800 shadow-lg
          "
        >
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="text-xs font-semibold text-gray-900">{title}</h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              aria-label="Stäng"
            >
              ✕
            </button>
          </div>
          <div className="text-xs leading-relaxed">{children}</div>
        </div>
      )}
    </div>
  );
}
