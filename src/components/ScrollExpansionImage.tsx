"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface ScrollExpansionImageProps {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  className?: string;
  preserveAspectRatio?: boolean;
}

export default function ScrollExpansionImage({
  src,
  alt,
  title,
  caption,
  className = "",
  preserveAspectRatio = false,
}: ScrollExpansionImageProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate progress when container is in viewport
      const progress = 1 - Math.max(0, Math.min(1, rect.bottom / viewportHeight));
      setScrollProgress(progress);

      // Trigger expansion when scrolled past center
      if (progress > 0.5 && !isExpanded) {
        setIsExpanded(true);
      } else if (progress <= 0.5 && isExpanded) {
        setIsExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isExpanded]);

  const scale = 1 + scrollProgress * 0.3; // Scale up to 1.3x
  const opacity = 1 - scrollProgress * 0.1; // Slight fade

  return (
    <div
      ref={containerRef}
      className={`scroll-expansion-container relative overflow-hidden rounded-xl ${className}`}
      style={preserveAspectRatio ? {} : { aspectRatio: "4/3" }}
    >
      <motion.img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`scroll-expansion-image w-full h-full ${preserveAspectRatio ? "object-contain" : "object-cover"}`}
        style={{
          transform: `scale(${scale})`,
          opacity,
          transformOrigin: "center center",
        }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Overlay with title and caption */}
      {(title || caption) && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-ink-900/20 to-transparent flex flex-col justify-end p-6 pointer-events-none"
          style={{ opacity: scrollProgress }}
        >
          {title && (
            <h3 className="font-display text-2xl md:text-3xl font-medium text-white mb-2">
              {title}
            </h3>
          )}
          {caption && (
            <p className="text-white/90 text-lg max-w-2xl">
              {caption}
            </p>
          )}
        </div>
      )}

      {/* Expansion indicator */}
      <div
        className={`absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-900/80 backdrop-blur-sm text-white text-sm font-medium transition-all duration-300 ${isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      >
        <span>Explore</span>
        <motion.svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          animate={{ x: isExpanded ? 4 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </motion.svg>
      </div>
    </div>
  );
}