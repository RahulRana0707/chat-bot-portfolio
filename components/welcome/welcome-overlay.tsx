"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { WelcomeParticles } from "./welcome-particles";

export function WelcomeOverlay() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) setShow(false);
  }, []);

  useEffect(() => {
    if (!show) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [show]);

  const dismiss = () => setShow(false);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="welcome-overlay"
          role="dialog"
          aria-label="Welcome"
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={dismiss}
        >
          <WelcomeParticles onComplete={dismiss} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
