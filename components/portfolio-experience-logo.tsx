"use client";

import { useState } from "react";
import Image from "next/image";

const PLACEHOLDER = "/file.svg";

export function PortfolioExperienceLogo({
  logoPath,
  alt = "",
  width = 40,
  height = 40,
}: {
  logoPath: string;
  alt?: string;
  width?: number;
  height?: number;
}) {
  const [src, setSrc] = useState(logoPath);

  return (
    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-contain"
        unoptimized
        onError={() => setSrc(PLACEHOLDER)}
      />
    </div>
  );
}
