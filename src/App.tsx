"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoPlayer from "./components/VideoPlayer";

// Base URL configurada en vite.config.js
const BASE_URL = import.meta.env.BASE_URL;

// Type definitions
interface ImageData {
  src: string;
  alt: string;
  title: string;
  caption: string;
}

interface VideoData {
  src: string;
  poster: string;
  title: string;
  caption: string;
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  controls: boolean;
}

interface SectionData {
  id: string;
  datum: string;
  title: string;
  subtitle: string;
  progress: number;
  status: "complete" | "current" | "pending";
  content: string;
  images: ImageData[];
  videos: VideoData[];
  afterImages?: string;
}

// Content sections based on ProjectIdea.docx — only original content
const sections: SectionData[] = [
  {
    id: "intro",
    datum: "A",
    title: "The Beginning",
    subtitle: "Choosing the MMR Project",
    progress: 100,
    status: "complete",
    content: `When I was thinking about what I hoped to do for my final degree project, I wanted to take advantage of university funding, which means that the university gives you money so that you can buy the necessary materials for your project. So, I chose the MMR (Mobile Manipulator Robot) project, but when I got in touch with the professor, there were a few things that I had to keep in mind, such as having to fix some parts of the mobile platform.`,
    images: [],
    videos: [],
  },
  {
    id: "initial-state",
    datum: "B",
    title: "Initial State",
    subtitle: "The Robot As I Found It",
    progress: 100,
    status: "complete",
    content: `The image above shows the state of the robot at this moment. The robot didn't have a battery, sensors, a battery cover, and the majority of the shell. The mobile platform was a little incomplete, so I had to find a way to leverage this space in order to accommodate the battery to power and control electronics, and of course, it should be a modular design.`,
    images: [
      {
        src: `${BASE_URL}images/IM1.JPG`,
        alt: "Initial state of the mobile platform",
        title: "DATUM B — Initial Platform State",
        caption: "Incomplete mobile platform — no battery, sensors, cover, or shell.",
      },
    ],
    videos: [],
  },
  {
    id: "shell-design",
    datum: "C",
    title: "Shell Design & Manufacturing",
    subtitle: "Mobile Platform Shell",
    progress: 100,
    status: "complete",
    content: `After designing some parts of the robot and an iteration process, I accomplished manufacturing the shell of the mobile platform. It considered the requirements, such as having enough space for the battery and being able to hold onto the main chassis.`,
    images: [
      {
        src: `${BASE_URL}images/IM2.JPG`,
        alt: "Manufactured shell of the mobile platform",
        title: "DATUM C — Manufactured Shell",
        caption: "ABS shell with integrated battery cavity and chassis mounting points.",
      },
    ],
    videos: [],
  },
  {
    id: "platform-ready",
    datum: "D",
    title: "Platform Ready",
    subtitle: "Center of Mass Corrected",
    progress: 100,
    status: "complete",
    content: `At this moment, I would say that the mobile platform is ready because it can stay still. Before, its center of mass was not in the center, so the platform tended to tilt slightly. So, the next step was thinking about the upper part, which means the robot had to house the different parts like sensors, the embedded system, batteries, and the manipulator system.`,
    images: [],
    videos: [],
  },
  {
    id: "upper-shell",
    datum: "E",
    title: "Upper Shell Design",
    subtitle: "Housing Electronics",
    progress: 100,
    status: "complete",
    content: `Thinking the possibilities related to house the electronics parts, I designed a shell for my robot, the idea was simple because the way for shell is similar to cylinder but I also add some holes for distribution of warm, and also I thought in the way of my robot could be check easier so the cylinder have a socket, and when I was thinking about how to manufacture so I was inclined to addition manufacturing as a result I prepared to slider and I get my design.`,
    images: [
      {
        src: `${BASE_URL}images/IM3.JPG`,
        alt: "Upper shell design for electronics housing",
        title: "DATUM E — Upper Electronics Shell",
        caption: "Cylindrical shell with ventilation holes and access port for maintenance.",
      },
    ],
    videos: [],
  },
  {
    id: "standoffs",
    datum: "F",
    title: "Standoffs Manufacturing",
    subtitle: "Lathe Work",
    progress: 100,
    status: "complete",
    content: `Given that I already finished the shell of my robot, I designed the standoffs because I didn't just need to hold my electronics parts but also, I needed to hold my manipulator, so I made engineering plans and I built my standoffs using a lathe.`,
    images: [
      {
        src: `${BASE_URL}images/IM4.JPG`,
        alt: "Standoffs manufactured using a lathe",
        title: "DATUM F — Precision Standoffs",
        caption: "Custom standoffs machined on a lathe to hold electronics and manipulator.",
      },
    ],
    videos: [],
  },
  {
    id: "acrylic",
    datum: "G",
    title: "Acrylic Sheets",
    subtitle: "Cutting & Assembly",
    progress: 100,
    status: "complete",
    content: `At this point, I was missing acrylic sheets in order to place the different things, so I cut the sheets of acrylic letting a few holes, therefore I already saw my robot in a good way.`,
    images: [
      {
        src: `${BASE_URL}images/IM5.JPG`,
        alt: "Acrylic sheets cut with holes for components",
        title: "DATUM G — Laser-Cut Acrylic Levels",
        caption: "Laser-cut acrylic sheets with mounting holes for components.",
      },
    ],
    videos: [],
  },
  {
    id: "3d-printing",
    datum: "H",
    title: "3D Printing Parts",
    subtitle: "Enclosures & Sensor Mounts",
    progress: 100,
    status: "complete",
    content: `Then, I printed different parts of my robot, such as enclosures for the circuits, batteries, and sensors like the camera and LiDAR. Moreover, I was putting different things like screws and threaded inserts, and even I was fixing some parts because the process of manufacturing is not perfect. And obviously I had to buy all of the things that I have mentioned at this moment.`,
    images: [
      {
        src: `${BASE_URL}images/IM6.JPG`,
        alt: "3D printed enclosures for circuits, batteries, and sensors",
        title: "DATUM H — 3D Printed Subsystems",
        caption: "Enclosures for circuits, batteries, camera and LiDAR mounts with threaded inserts.",
      },
    ],
    videos: [],
  },
  {
    id: "manipulator-platform",
    datum: "J",
    title: "Manipulator Platform",
    subtitle: "Large Part Manufacturing",
    progress: 100,
    status: "complete",
    content: `And to almost wrap things up, I designed the platform that had to sustain my manipulator, this part was difficult because this part was very big, and the time for manufacturing was over 8 hours so I had to iterate several times, but I got it.`,
    images: [
      {
        src: `${BASE_URL}images/IM7.JPG`,
        alt: "Large platform for manipulator mounting",
        title: "DATUM J — Manipulator Mounting Platform",
        caption: "Large platform requiring 8+ hours of manufacturing, iterated multiple times.",
      },
    ],
    videos: [],
  },
  {
    id: "final-assembly",
    datum: "K",
    title: "Final Assembly",
    subtitle: "Complete Mobile Manipulator Robot",
    progress: 100,
    status: "current",
    content: `Finally, I took whole of parts and I started to built all of my robot, including cables and devices for protection like switches or something like that, I had to put the threaded inserts because I needed my manipulator was pinned to my platform. As a result I achieved this:`,
    images: [
      {
        src: `${BASE_URL}images/IM8.JPG`,
        alt: "Fully assembled mobile manipulator robot",
        title: "DATUM K — Complete MMR — View 1",
        caption: "Fully assembled MMR with all subsystems integrated.",
      },
      {
        src: `${BASE_URL}images/IM9.JPG`,
        alt: "Fully assembled mobile manipulator robot - different angle",
        title: "DATUM K — Complete MMR — View 2",
        caption: "Final result showing complete integration of mobile platform and manipulator.",
      },
    ],
    afterImages: `After that, I struggled with different problems related to hardware and software. Eventually, I managed to move my robot. However, although I got my platform and manipulator to move, I still needed to program the different trajectories so that my robot could generate value for a specific application.`,
    videos: [
      {
        src: `${BASE_URL}images/RobotVideo.mp4`,
        poster: `${BASE_URL}images/IM8.JPG`,
        title: "Robot in Action",
        caption: "Complete mobile manipulator robot in motion — platform navigation and manipulator coordination.",
        autoplay: true,
        loop: true,
        muted: true,
        controls: true,
      },
    ],
  },
];

// Intersection Observer hook for scroll spy
function useScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0]);

  useEffect(() => {
    const observers = sectionIds.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
      );

      observer.observe(element);
      return observer;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, [sectionIds]);

  return activeId;
}

// Exploded View Modal Component
function ExplodedViewModal({
  isOpen,
  onClose,
  image,
}: {
  isOpen: boolean;
  onClose: () => void;
  image: ImageData | null;
}) {
  if (!isOpen || !image) return null;

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <h2 id="modal-title" className="modal-title">{image.title}</h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close exploded view"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="relative overflow-hidden bg-bg-surface max-h-[70vh] flex items-center justify-center">
          <img
            src={image.src}
            alt={image.alt}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <div className="p-6 border-t border-border-subtle bg-bg-surface">
          <p className="tech-image-caption">{image.caption}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Section({ section, index, isActive, isComplete }: {
  section: SectionData;
  index: number;
  isActive: boolean;
  isComplete: boolean;
}) {
  const [explodedImage, setExplodedImage] = useState<ImageData | null>(null);

  const getStatusBadge = (status: SectionData["status"]) => {
    switch (status) {
      case "complete": return <span className="status-badge status-complete">✓ Complete</span>;
      case "current": return <span className="status-badge status-current">◈ Current</span>;
      case "pending": return <span className="status-badge status-pending">○ Pending</span>;
    }
  };

  return (
    <section
      id={section.id}
      className="section-page"
      data-active={isActive}
      data-complete={isComplete}
      ref={(el) => el}
    >
      <header className="section-header">
        <div className="section-datum">
          <span className="datum-ref" aria-label={`Datum reference ${section.datum}`}>
            {section.datum}
          </span>
          <div>
            <h1 className="section-title text-balance">{section.title}</h1>
            {section.subtitle && (
              <p className="section-subtitle">{section.subtitle}</p>
            )}
          </div>
        </div>

        {/* Progress + Status */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="progress-bar flex-1 min-w-[200px] max-w-xs">
            <motion.div
              className="progress-fill"
              style={{ width: `${section.progress}%` } as React.CSSProperties}
              initial={{ width: 0 }}
              animate={{ width: `${section.progress}%` }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>
          {getStatusBadge(section.status)}
        </div>
      </header>

      <div className="content-block">
        {/* Content Paragraphs */}
        <div className="space-y-6">
          {section.content.split("\n\n").map((paragraph, i) => (
            <p key={i} className={i === 0 ? "content-lead" : "content-paragraph"}>
              {paragraph}
            </p>
          ))}

          {/* Images */}
          {section.images.length > 0 && (
            <div className="space-y-10 mt-4">
              {section.images.map((img, imgIndex) => (
                <motion.div
                  key={img.src}
                  className="tech-image group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + imgIndex * 0.05 }}
                >
                  <div className="tech-image-wrapper">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="tech-image-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="tech-image-overlay">
                    <h3 className="tech-image-title">{img.title}</h3>
                    {img.caption && <p className="tech-image-caption">{img.caption}</p>}
                  </div>
                  <button
                    className="absolute bottom-4 right-4 btn-ghost"
                    onClick={() => setExplodedImage(img)}
                    aria-label={`View expanded view: ${img.title}`}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M19 12l-7 7-7-7" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span className="hidden sm:inline">Expand</span>
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {/* Text after images */}
          {section.afterImages && (
            <motion.div
              className="mt-8 pt-6 border-t border-border-subtle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <p className="content-paragraph">{section.afterImages}</p>
            </motion.div>
          )}

          {/* Videos */}
          {section.videos && section.videos.length > 0 && (
            <div className="space-y-10 mt-4">
              {section.videos.map((video, videoIndex) => (
                <motion.div
                  key={video.src}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + videoIndex * 0.05 }}
                >
                  <VideoPlayer
                    src={video.src}
                    poster={video.poster}
                    title={video.title}
                    caption={video.caption}
                    autoplay={video.autoplay}
                    loop={video.loop}
                    muted={video.muted}
                    controls={video.controls !== false}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Divider between sections */}
      {index < sections.length - 1 && (
        <hr className="divider-technical" aria-hidden="true" />
      )}

      {/* Exploded View Modal */}
      <AnimatePresence>
        {explodedImage && (
          <ExplodedViewModal
            isOpen={true}
            onClose={() => setExplodedImage(null)}
            image={explodedImage}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default function App() {
  const sectionIds = sections.map((s) => s.id);
  const activeId = useScrollSpy(sectionIds);

  // Navbar scroll state
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary">

      {/* Timeline Rail — Persistent Left Navigation */}
      <nav className="timeline-rail" aria-label="Project timeline">
        <div className="w-full px-4 mb-8 border-b border-border-subtle pb-6">
          <span className="font-mono text-step--1 text-text-muted uppercase tracking-widest">
            Timeline
          </span>
          <h2 className="font-display text-step-2 text-text-primary font-medium mt-1">
            MMR Project
          </h2>
        </div>

        <div className="w-full space-y-1 flex-1 overflow-y-auto pr-2">
          {sections.map((section, index) => {
            const isActive = activeId === section.id;
            const isComplete = section.status === "complete";

            return (
              <button
                key={section.id}
                className="timeline-stage text-left"
                data-active={isActive}
                data-complete={isComplete}
                onClick={() => {
                  const el = document.getElementById(section.id);
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                aria-current={isActive ? "true" : undefined}
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    {/* Progress ring */}
                    <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 24 24">
                      <circle
                        className="text-border-subtle"
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        strokeWidth="2.5"
                      />
                      <motion.circle
                        className="text-brass-500"
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        strokeWidth="2.5"
                        strokeDasharray={62.83}
                        strokeDashoffset={62.83 * (1 - section.progress / 100)}
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: 62.83 }}
                        animate={{ strokeDashoffset: 62.83 * (1 - section.progress / 100) }}
                        transition={{ duration: 0.8, delay: 0.1 + index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center timeline-stage-number">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                  </div>
                  <span className="timeline-stage-title flex-1 min-w-0">
                    {section.title}
                  </span>
                </div>
                {/* Active indicator bar */}
                <motion.div
                  className="timeline-progress"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isActive || isComplete ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </button>
            );
          })}
        </div>

        {/* Footer in timeline */}
        <div className="w-full px-4 pt-6 border-t border-border-subtle">
          <div className="flex items-center gap-2 text-text-muted font-mono text-step--1">
            <span className="w-2 h-2 rounded-full bg-brass-500" />
            <span>11 / 11 Complete</span>
          </div>
        </div>
      </nav>

      {/* Top Navigation Bar — Mobile only, minimal */}
      <header
        className="fixed top-0 left-0 right-0 z-50 lg:hidden transition-all duration-normal"
        style={{
          background: scrollY > 50 ? "rgba(250, 250, 249, 0.95)" : "transparent",
          backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
          borderBottom: scrollY > 50 ? "1px solid rgba(214, 211, 209, 0.5)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#intro" className="font-display text-step-1 font-medium text-text-primary">
            MMR Project
          </a>
          <button className="btn-icon" aria-label="Open timeline">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden section-page pt-0">
        <div className="relative z-10 w-full max-w-4xl">

          {/* Datum A Badge */}
          <motion.div
            className="inline-flex items-center gap-3 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="datum-ref" aria-label="Datum reference A">A</span>
            <span className="status-badge status-current">Active Build</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="font-display text-step-4 lg:text-step-4 lg:lg:text-step-4 tracking-tight leading-[1.1] text-text-primary font-medium text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Building a Mobile
            <br />
            <span className="text-accent-primary">Manipulator Robot</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="font-body text-step-1 text-text-secondary mt-6 max-w-2xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            From an incomplete mobile platform to a fully integrated mobile manipulator —
            a documented engineering journey through 11 datum references.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <a href="#initial-state" className="btn-primary">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
              Begin at Datum B
            </a>
            <a href="#final-assembly" className="btn-ghost">
              Jump to Final Assembly
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <span className="font-mono text-step--1 uppercase tracking-widest">Scroll</span>
            <motion.svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </motion.svg>
          </motion.div>
        </div>
      </header>

      {/* Main Content — Sections */}
      <main className="relative">
        {sections.map((section, index) => (
          <Section
            key={section.id}
            section={section}
            index={index}
            isActive={activeId === section.id}
            isComplete={section.status === "complete"}
          />
        ))}
      </main>

      {/* Footer */}
      <footer className="border-t border-border-strong bg-bg-surface">
        <div className="section-page pt-12 pb-8 lg:pt-16 lg:pb-12">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">

            <div>
              <h3 className="font-display text-step-2 font-medium text-text-primary mb-4">
                Project Summary
              </h3>
              <p className="text-text-secondary leading-relaxed max-w-xs">
                This project represents the complete development of a Mobile Manipulator Robot (MMR)
                for my final degree project. Starting from an incomplete mobile platform, I designed
                and manufactured every subsystem — from the shell and electronics housing to the
                manipulator mounting platform — resulting in a fully functional robot.
              </p>
            </div>

            <div>
              <h3 className="font-display text-step-2 font-medium text-text-primary mb-4">
                Key Stages
              </h3>
              <ul className="space-y-3 text-text-secondary">
                {sections.filter(s => s.id !== "intro").map((section, i) => (
                  <li key={i} className="flex items-center gap-3 font-body text-step-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-brass-500 flex-shrink-0" />
                    <span>{section.datum}: {section.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-step-2 font-medium text-text-primary mb-4">
                Subsystems Developed
              </h3>
              <ul className="space-y-3 text-text-secondary">
                {[
                  "Mobile Platform & Shell",
                  "Electronics Housing",
                  "Battery & Power Management",
                  "Sensor Integration (Camera, LiDAR)",
                  "Manipulator Mounting Platform",
                  "Final Integration & Assembly",
                ].map((sub, i) => (
                  <li key={i} className="flex items-center gap-3 font-body text-step-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-brass-500 flex-shrink-0" />
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-step--1 text-text-muted">
              Final Degree Project • Mobile Manipulator Robot • 2026
            </p>

            <div className="flex items-center gap-6">
              <a href="#" className="font-body text-step--1 text-text-muted hover:text-text-primary transition-colors duration-fast">
                GitHub
              </a>
              <a href="#" className="font-body text-step--1 text-text-muted hover:text-text-primary transition-colors duration-fast">
                Report
              </a>
              <a href="#" className="font-body text-step--1 text-text-muted hover:text-text-primary transition-colors duration-fast">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}