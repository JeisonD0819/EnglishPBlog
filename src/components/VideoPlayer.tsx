"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  caption?: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

export default function VideoPlayer({
  src,
  poster,
  title,
  caption,
  className = "",
  autoplay = false,
  loop = true,
  muted = true,
  controls = true,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-play on hover (when muted)
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const handleMouseEnter = () => {
      setIsHovered(true);
      if (muted && !isPlaying) {
        video.play().catch(() => {});
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      if (muted && !isPlaying && video.currentTime > 0) {
        video.pause();
      }
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [muted, isPlaying]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleEnded = () => {
    if (!loop) {
      setIsPlaying(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{ aspectRatio: "16/9" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="w-full h-full object-cover transition-opacity duration-300"
        style={{ opacity: isHovered && muted ? 1 : 1 }}
      />

      {/* Poster overlay when not playing */}
      {poster && !isPlaying && (
        <img
          src={poster}
          alt={title || "Video poster"}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: isPlaying ? 0 : 1 }}
        />
      )}

      {/* Play button overlay */}
      {!isPlaying && (
        <motion.button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-ink-900/40 backdrop-blur-sm hover:bg-ink-900/60 transition-colors"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered || !muted ? 1 : 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          aria-label="Play video"
        >
          <motion.div
            className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <svg
              className="w-6 h-6 text-ink-900 ml-1"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </motion.button>
      )}

      {/* Title & Caption overlay */}
      {(title || caption) && (
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-ink-900/80 via-ink-900/40 to-transparent text-white">
          {title && (
            <h3 className="font-display text-xl md:text-2xl font-medium mb-1">
              {title}
            </h3>
          )}
          {caption && (
            <p className="text-white/90 text-base md:text-lg max-w-2xl">
              {caption}
            </p>
          )}
        </div>
      )}

      {/* Video indicator */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ink-900/70 backdrop-blur-sm text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" />
        </svg>
        <span>Video</span>
      </div>
    </div>
  );
}