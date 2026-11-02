
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollExpansionImage from "./components/ScrollExpansionImage";
import VideoPlayer from "./components/VideoPlayer";

// Base URL configurada en vite.config.js
const BASE_URL = import.meta.env.BASE_URL;

// Content sections based on ProjectIdea.docx
const sections = [
  {
    id: "intro",
    title: "The Beginning",
    subtitle: "Choosing the MMR Project",
    content: `When I was thinking about what I hoped to do for my final degree project, I wanted to take advantage of university funding, which means that the university gives you money so that you can buy the necessary materials for your project. So, I chose the MMR (Mobile Manipulator Robot) project, but when I got in touch with the professor, there were a few things that I had to keep in mind, such as having to fix some parts of the mobile platform.`,
    images: [],
    videos: [],
  },
  {
    id: "initial-state",
    title: "Initial State",
    subtitle: "The Robot As I Found It",
    content: `The image above shows the state of the robot at this moment, the robot didn't have a battery, sensors, a battery cover, and the majority of the shell. The mobile platform was a little incomplete, so I had to find a way to leverage this space in order to accommodate the battery to power and control electronics, and of course, it should be a modular design.`,
    images: [
      {
        src: `${BASE_URL}images/IM1.JPG`,
        alt: "Initial state of the mobile platform",
        title: "Initial State",
        caption: "The mobile platform was incomplete - no battery, sensors, battery cover, or shell"
      },
    ],
  },
  {
    id: "shell-design",
    title: "Shell Design & Manufacturing",
    subtitle: "Mobile Platform Shell",
    content: `After designing some parts of the robot and an iteration process, I accomplished manufacturing the shell of the mobile platform. It considered the requirements, such as having enough space for the battery and being able to hold onto the main chassis.`,
    images: [
      {
        src: `${BASE_URL}images/IM2.JPG`,
        alt: "Manufactured shell of the mobile platform",
        title: "Mobile Platform Shell",
        caption: "The manufactured shell with space for battery and mounting to main chassis"
      },
    ],
  },
  {
    id: "platform-ready",
    title: "Platform Ready",
    subtitle: "Center of Mass Corrected",
    content: `At this moment, I would say that the mobile platform is ready because it can stay still. Before, its center of mass was not in the center, so the platform tended to tilt slightly. So, the next step was thinking about the upper part, which means the robot had to house the different parts like sensors, the embedded system, batteries, and the manipulator system.`,
    images: [],
    videos: [],
  },
  {
    id: "upper-shell",
    title: "Upper Shell Design",
    subtitle: "Housing Electronics",
    content: `Thinking the possibilities related to house the electronics parts, I designed a shell for my robot, the idea was simple because the way for shell is similar to cylinder but I also add some holes for distribution of warm, and also I thought in the way of my robot could be check easier so the cylinder have a socket, and when I was thinking about how to manufacture so I was inclined to addition manufacturing as a result I prepared to slider and I get my design.`,
    images: [
      {
        src: `${BASE_URL}images/IM3.JPG`,
        alt: "Upper shell design for electronics housing",
        title: "Upper Shell Design",
        caption: "Cylindrical shell with ventilation holes and access socket for easy maintenance"
      },
    ],
  },
  {
    id: "standoffs",
    title: "Standoffs Manufacturing",
    subtitle: "Lathe Work",
    content: `Given that I already finished the shell of my robot, I designed the standoffs because I didn't just need to hold my electronics parts but also, I needed to hold my manipulator, so I made engineering plans and I built my standoffs using a lathe.`,
    images: [
      {
        src: `${BASE_URL}images/IM4.JPG`,
        alt: "Standoffs manufactured using a lathe",
        title: "Precision Standoffs",
        caption: "Custom standoffs machined on a lathe to hold electronics and manipulator"
      },
    ],
  },
  {
    id: "acrylic",
    title: "Acrylic Sheets",
    subtitle: "Cutting & Assembly",
    content: `At this point, I was missing acrylic sheets in order to place the different things, so I cut the sheets of acrylic letting a few holes, therefore I already saw my robot in a good way.`,
    images: [
      {
        src: `${BASE_URL}images/IM5.JPG`,
        alt: "Acrylic sheets cut with holes for components",
        title: "Acrylic Sheets",
        caption: "Laser-cut acrylic sheets with mounting holes for components"
      },
    ],
  },
  {
    id: "3d-printing",
    title: "3D Printing Parts",
    subtitle: "Enclosures & Sensor Mounts",
    content: `Then, I printed different parts of my robot, such as enclosures for the circuits, batteries, and sensors like the camera and LiDAR. Moreover, I was putting different things like screws and threaded inserts, and even I was fixing some parts because the process of manufacturing is not perfect. And obviously I had to buy all of the things that I have mentioned at this moment.`,
    images: [
      {
        src: `${BASE_URL}images/IM6.JPG`,
        alt: "3D printed enclosures for circuits, batteries, and sensors",
        title: "3D Printed Components",
        caption: "Enclosures for circuits, batteries, camera and LiDAR mounts with threaded inserts"
      },
    ],
  },
  {
    id: "manipulator-platform",
    title: "Manipulator Platform",
    subtitle: "Large Part Manufacturing",
    content: `And to almost wrap things up, I designed the platform that had to sustain my manipulator, this part was difficult because this part was very big, and the time for manufacturing was over 8 hours so I had to iterate several times, but I got it.`,
    images: [
      {
        src: `${BASE_URL}images/IM7.JPG`,
        alt: "Large platform for manipulator mounting",
        title: "Manipulator Platform",
        caption: "Large platform requiring 8+ hours of manufacturing, iterated multiple times"
      },
    ],
  },
  {
    id: "final-assembly",
    title: "Final Assembly",
    subtitle: "Complete Mobile Manipulator Robot",
    content: `Finally, I took whole of parts and I started to built all of my robot, including cables and devices for protection like switches or something like that, I had to put the threaded inserts because I needed my manipulator was pinned to my platform. As a result I achieved this:`,
    images: [
      {
        src: `${BASE_URL}images/IM8.JPG`,
        alt: "Fully assembled mobile manipulator robot",
        title: "Complete Robot - View 1",
        caption: "Fully assembled MMR with all subsystems integrated"
      },
      {
        src: `${BASE_URL}images/IM9.JPG`,
        alt: "Fully assembled mobile manipulator robot - different angle",
        title: "Complete Robot - View 2",
        caption: "Final result showing complete integration of mobile platform and manipulator"
      },
    ],
    // Text to show after images, before video
    afterImages: `After that, I struggled with different problems related to hardware and software. Eventually, I managed to move my robot. However, although I got my platform and manipulator to move, I still needed to program the different trajectories so that my robot could generate value for a specific application.`,
    videos: [
      {
        src: `${BASE_URL}images/RobotVideo.mp4`,
        poster: `${BASE_URL}images/IM8.JPG`,
        title: "Robot in Action",
        caption: "Watch the complete mobile manipulator robot in motion",
        autoplay: true,
        loop: true,
        muted: true,
        controls: true,
      },
    ],
  },
];

function Section({
  section,
  index
}: {
  section: typeof sections[0];
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const element = document.getElementById(section.id);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [section.id]);

  return (
    <section
      id={section.id}
      className="py-20 md:py-32 px-6 max-w-6xl mx-auto"
      ref={(el) => el}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="prose-custom"
      >
        {/* Section number and title */}
        <div className="mb-8">
          <span className="text-accent-500 font-medium text-sm tracking-widest uppercase">
            Stage {index + 1}
          </span>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink-900 mt-2 mb-4">
            {section.title}
          </h2>

          {section.subtitle && (
            <p className="text-ink-500 text-lg md:text-xl font-light italic max-w-2xl">
              {section.subtitle}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="space-y-6 max-w-3xl">
          {section.content.split('\n\n').map((paragraph, i) => (
            <p
              key={i}
              className="text-lg md:text-xl leading-relaxed text-ink-700"
            >
              {paragraph}
            </p>
          ))}

          {/* Images */}
          {section.images.length > 0 && (
            <div className="mt-10 space-y-10">
              {section.images.map((img, imgIndex) => (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + imgIndex * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <ScrollExpansionImage
                    src={img.src}
                    alt={img.alt}
                    title={img.title}
                    caption={img.caption}
                    className="shadow-2xl"
                    preserveAspectRatio
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Text after images */}
          {section.afterImages && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-10 pt-8 border-t border-ink-200 text-lg md:text-xl leading-relaxed text-ink-700 max-w-3xl"
            >
              <p>{section.afterImages}</p>
            </motion.div>
          )}

          {/* Videos */}
          {section.videos && section.videos.length > 0 && (
            <div className="mt-10 space-y-10">
              {section.videos.map((video, videoIndex) => (
                <motion.div
                  key={video.src}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + videoIndex * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
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
                    className="shadow-2xl"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Divider between sections */}
        {index < sections.length - 1 && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="mt-16 w-full h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent"
          />
        )}
      </motion.div>
    </section>
  );
}

export default function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-ink-50">

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrollY > 100 ? "rgba(250, 250, 250, 0.95)" : "transparent",
          backdropFilter: scrollY > 100 ? "blur(20px)" : "none",
          borderBottom: scrollY > 100 ? "1px solid rgba(228, 228, 230, 0.5)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.a
            href="#intro"
            className="font-display text-xl font-medium text-ink-900 hover:text-accent-500 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            MMR Project
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-sm font-medium text-ink-600 hover:text-ink-900 transition-colors relative group"
              >
                {index + 1}. {section.title}
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-100/30 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative z-10 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-4xl mx-auto"
          >
            {/* Category badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink-900/5 backdrop-blur-sm text-ink-600 text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-accent-500" />
              Final Degree Project
            </motion.span>

            {/* Main title */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-ink-900 leading-[1.1] mb-6 tracking-tight">
              Building a Mobile
              <br />
              <span className="text-accent-500">Manipulator Robot</span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl text-ink-500 font-light max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              From an incomplete mobile platform to a fully integrated mobile manipulator robot —
              a journey through design, manufacturing, and assembly.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
            >
              <div className="text-center">
                <div className="font-display text-3xl md:text-4xl font-semibold text-ink-900">
                  9
                </div>
                <div className="text-sm text-ink-500 uppercase tracking-wider">
                  Stages
                </div>
              </div>

              <div className="w-px h-8 bg-ink-200 mx-2" />

              <div className="text-center">
                <div className="font-display text-3xl md:text-4xl font-semibold text-ink-900">
                  8+
                </div>
                <div className="text-sm text-ink-500 uppercase tracking-wider">
                  Hours Print
                </div>
              </div>

              <div className="w-px h-8 bg-ink-200 mx-2" />

              <div className="text-center">
                <div className="font-display text-3xl md:text-4xl font-semibold text-ink-900">
                  1
                </div>
                <div className="text-sm text-ink-500 uppercase tracking-wider">
                  Complete Robot
                </div>
              </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-400"
            >
              <span className="text-xs uppercase tracking-widest font-medium">
                Scroll to begin
              </span>

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
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {sections.map((section, index) => (
          <Section
            key={section.id}
            section={section}
            index={index}
          />
        ))}
      </main>

      {/* Footer */}
      <footer className="border-t border-ink-200 bg-ink-50">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-3 gap-12">

            <div>
              <h3 className="font-display text-2xl font-semibold text-ink-900 mb-4">
                Project Summary
              </h3>
              <p className="text-ink-600 leading-relaxed">
                This project represents the complete development of a Mobile Manipulator Robot (MMR)
                for my final degree project. Starting from an incomplete mobile platform, I designed
                and manufactured every subsystem — from the shell and electronics housing to the
                manipulator mounting platform — resulting in a fully functional robot.
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl font-semibold text-ink-900 mb-4">
                Key Technologies
              </h3>
              <ul className="space-y-3 text-ink-600">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent-500" />
                  3D Printing (FDM)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent-500" />
                  CNC Lathe Machining
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent-500" />
                  Laser Cutting (Acrylic)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent-500" />
                  CAD Design & Iteration
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent-500" />
                  Electronics Integration
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-2xl font-semibold text-ink-900 mb-4">
                Subsystems
              </h3>
              <ul className="space-y-3 text-ink-600">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent-500" />
                  Mobile Platform & Shell
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent-500" />
                  Electronics Housing
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent-500" />
                  Battery & Power Management
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent-500" />
                  Sensor Integration (Camera, LiDAR)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent-500" />
                  Manipulator Mounting Platform
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-ink-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-ink-400 text-sm">
              Built as part of my Final Degree Project • Mobile Manipulator Robot
            </p>

            <div className="flex items-center gap-6">
              <a href="#" className="text-ink-400 hover:text-ink-900 transition-colors text-sm">
                GitHub
              </a>
              <a href="#" className="text-ink-400 hover:text-ink-900 transition-colors text-sm">
                Report
              </a>
              <a href="#" className="text-ink-400 hover:text-ink-900 transition-colors text-sm">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
