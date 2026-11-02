"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  // Handle Escape key to close fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        closeFullscreen();
      }
    };
    if (isFullscreen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  // Prevent body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  const formatTime = (seconds: number): string => {
    if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const renderVideo = (fullscreen = false) => (
    <>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoplay || fullscreen}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline={!fullscreen}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className={fullscreen ? "w-full h-full object-contain" : "tech-image-img"}
        style={fullscreen ? { maxHeight: "85vh" } : undefined}
      />

      {/* Poster overlay when not playing */}
      {poster && !isPlaying && !fullscreen && (
        <img
          src={poster}
          alt={title || "Video poster"}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-normal"
          style={{ opacity: isPlaying ? 0 : 1 }}
        />
      )}

      {/* Play button overlay — brass accent */}
      {!isPlaying && !fullscreen && (
        <motion.button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-machine-black/40 backdrop-blur-sm transition-opacity duration-fast"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          aria-label="Play video"
        >
          <motion.div
            className="w-14 h-14 rounded-full bg-brass-500 flex items-center justify-center shadow-elevated"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-7 h-7 text-machine-black ml-1"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </motion.button>
      )}

      {/* Title & Caption overlay — technical gradient */}
      {(title || caption) && !fullscreen && (
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-machine-black/80 via-machine-black/40 to-transparent">
          {title && (
            <h3 className="font-display text-step-1 lg:text-step-2 font-medium text-machine-white mb-1">
              {title}
            </h3>
          )}
          {caption && (
            <p className="font-body text-step-0 text-brass-100 max-w-2xl">
              {caption}
            </p>
          )}
        </div>
      )}

      {/* Video indicator badge */}
      {!fullscreen && (
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-machine-black/70 backdrop-blur-sm text-machine-white text-step--1 font-mono font-medium">
          <svg className="w-3 h-3 text-brass-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" />
          </svg>
          <span>VIDEO</span>
        </div>
      )}

      {/* Duration / timestamp when hovering */}
      {!fullscreen && isHovered && videoRef.current && (
        <div className="absolute bottom-3 right-3 font-mono text-step--1 text-brass-200 bg-machine-black/70 px-2 py-1 rounded-none">
          {formatTime(videoRef.current.currentTime)} / {formatTime(videoRef.current.duration)}
        </div>
      )}

      {/* Fullscreen/Expand button */}
      {!fullscreen && (
        <button
          onClick={openFullscreen}
          className="absolute top-3 right-3 p-2 rounded-none bg-machine-black/70 backdrop-blur-sm text-machine-white hover:bg-machine-black/90 transition-colors duration-fast"
          aria-label="Expand video"
          title="Expand"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        </button>
      )}

      {/* Fullscreen modal controls */}
      {fullscreen && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between p-4 bg-machine-black/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <button
                onClick={closeFullscreen}
                className="p-2 rounded-none bg-transparent hover:bg-machine-white/10 transition-colors duration-fast"
                aria-label="Close fullscreen"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              {title && (
                <h3 className="font-display text-step-1 font-medium text-machine-white">
                  {title}
                </h3>
              )}
            </div>
            <div className="flex items-center gap-2 font-mono text-step--1 text-brass-200" id="fullscreen-timestamp">
              {videoRef.current ? formatTime(videoRef.current.currentTime) : "0:00"} / {videoRef.current ? formatTime(videoRef.current.duration) : "0:00"}
            </div>
          </div>

          {/* Bottom controls */}
          <div className="mt-auto p-4 bg-machine-black/80 backdrop-blur-sm">
            <div className="flex items-center gap-4 w-full">
              <button
                onClick={togglePlay}
                className="p-2 rounded-none bg-brass-500 hover:bg-brass-600 text-machine-black transition-colors duration-fast"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 ml-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <div className="flex-1 h-1.5 bg-machine-white/20 rounded-full cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  if (videoRef.current) {
                    videoRef.current.currentTime = pos * videoRef.current.duration;
                  }
                }}
              >
                <motion.div
                  className="h-full bg-brass-500 rounded-full"
                  style={{ width: videoRef.current ? `${(videoRef.current.currentTime / videoRef.current.duration) * 100}%` : "0%" }}
                  animate={{ width: videoRef.current ? `${(videoRef.current.currentTime / videoRef.current.duration) * 100}%` : "0%" }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.muted = !videoRef.current.muted;
                    }
                  }}
                  className="p-2 rounded-none bg-transparent hover:bg-machine-white/10 transition-colors duration-fast"
                  aria-label="Toggle mute"
                >
                  {videoRef.current?.muted ? (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => videoRef.current?.requestFullscreen()}
                  className="p-2 rounded-none bg-transparent hover:bg-machine-white/10 transition-colors duration-fast"
                  aria-label="Browser fullscreen"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <AnimatePresence>
      {/* Fullscreen Modal */}
      {isFullscreen && (
        <motion.div
          className="fixed inset-0 z-50 bg-machine-black flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeFullscreen}
          role="dialog"
          aria-modal="true"
          aria-label={title || "Video fullscreen"}
        >
          <motion.div
            className="relative w-full max-w-6xl max-h-[95vh] bg-machine-black rounded-none overflow-hidden"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            onClick={(e) => e.stopPropagation()}
          >
            {renderVideo(true)}
          </motion.div>
        </motion.div>
      )}

      {/* Inline Video Player */}
      <div
        ref={containerRef}
        className={`tech-image ${className}`}
        style={{ aspectRatio: "16/9" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {renderVideo(false)}
      </div>
    </AnimatePresence>
  );
}