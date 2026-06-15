"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface WelcomeParticlesProps {
  onComplete: () => void;
}

const PARTICLE_COUNT = 72;
const RING_RADIUS = 140;
const ASSEMBLE_DURATION = 1.2;
const HOLD = 900;
const COMPLETE_AT = ASSEMBLE_DURATION * 1000 + HOLD;

interface Particle {
  targetX: number;
  targetY: number;
  startX: number;
  startY: number;
  delay: number;
  size: number;
}

function createParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
    const startAngle = Math.random() * Math.PI * 2;
    const startDistance = 600 + Math.random() * 400;
    const radiusJitter = (Math.random() - 0.5) * 24;
    const targetRadius = RING_RADIUS + radiusJitter;
    return {
      targetX: Math.cos(angle) * targetRadius,
      targetY: Math.sin(angle) * targetRadius,
      startX: Math.cos(startAngle) * startDistance,
      startY: Math.sin(startAngle) * startDistance,
      delay: Math.random() * 0.3,
      size: 4 + Math.random() * 3,
    };
  });
}

export function WelcomeParticles({ onComplete }: WelcomeParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(createParticles());
    const done = setTimeout(onComplete, COMPLETE_AT);
    return () => clearTimeout(done);
  }, [onComplete]);

  return (
    <>
      <div className="absolute inset-0 bg-background" />
      <div className="relative flex h-64 w-64 items-center justify-center">
        {particles.map((p, i) => (
        <motion.span
          // biome-ignore lint/suspicious/noArrayIndexKey: deterministic per mount
          key={i}
          aria-hidden
          className="absolute rounded-full bg-foreground"
          style={{ width: p.size, height: p.size }}
          initial={{ x: p.startX, y: p.startY, opacity: 0 }}
          animate={{ x: p.targetX, y: p.targetY, opacity: 0.85 }}
          transition={{
            duration: ASSEMBLE_DURATION,
            delay: p.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.55, scale: 1.1 }}
        transition={{
          duration: 1,
          delay: ASSEMBLE_DURATION * 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute h-48 w-48 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 65%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          delay: ASSEMBLE_DURATION * 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative"
      >
        <Image
          src="/rahul-bot-logo.png"
          alt="Rahul"
          width={88}
          height={88}
          priority
          className="h-20 w-20 rounded-full object-cover drop-shadow-lg"
        />
      </motion.div>
      </div>
    </>
  );
}
