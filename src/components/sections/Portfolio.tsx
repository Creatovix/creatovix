"use client";
import { useState, useEffect, useRef } from "react";

// Dummy project data
const PROJECTS = [
  {
    _id: "1",
    title: "E-Commerce Platform",
    category: "Web Development",
    color: "#ff4d00",
    mainImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    description: "Custom Shopify Plus solution with advanced analytics and 3x conversion improvement.",
    tags: ["Shopify", "React", "Node.js"],
    year: "2024",
    client: "TechStore Inc.",
  },
  {
    _id: "2",
    title: "Brand Identity System",
    category: "Graphic Design",
    color: "#00c8ff",
    mainImage: "https://images.unsplash.com/photo-1626785774573-4b7993125651?auto=format&fit=crop&w=800&q=80",
    description: "Complete brand overhaul including logo, packaging, and digital assets for luxury cosmetics brand.",
    tags: ["Branding", "UI/UX", "Print"],
    year: "2024",
    client: "Luxe Beauty",
  },
  {
    _id: "3",
    title: "SaaS Dashboard",
    category: "Web Design",
    color: "#a855f7",
    mainImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    description: "Analytics dashboard with real-time data visualization and intuitive user experience.",
    tags: ["React", "TypeScript", "D3.js"],
    year: "2023",
    client: "DataFlow",
  },
  {
    _id: "4",
    title: "Mobile Banking App",
    category: "Full Stack",
    color: "#10d4a0",
    mainImage: "https://images.unsplash.com/photo-1551654818-1e2d5d9c5f4a?auto=format&fit=crop&w=800&q=80",
    description: "Secure mobile banking solution with biometric authentication and instant transfers.",
    tags: ["React Native", "Node.js", "AWS"],
    year: "2023",
    client: "FinanceHub",
  },
  {
    _id: "5",
    title: "Restaurant Website",
    category: "Web Design",
    color: "#f59e0b",
    mainImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    description: "Elegant online presence with reservation system and menu management.",
    tags: ["Next.js", "Sanity CMS", "Stripe"],
    year: "2024",
    client: "Bistro Moderne",
  },
  {
    _id: "6",
    title: "Corporate Portal",
    category: "Web Development",
    color: "#ff4d00",
    mainImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    description: "Enterprise intranet with document management and team collaboration tools.",
    tags: ["Angular", "Python", "PostgreSQL"],
    year: "2023",
    client: "GlobalTech",
  },
  {
    _id: "7",
    title: "Fitness Tracking App",
    category: "Mobile App",
    color: "#10d4a0",
    mainImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    description: "Cross-platform fitness app with workout plans, progress tracking, and social features.",
    tags: ["React Native", "Firebase", "HealthKit"],
    year: "2024",
    client: "FitLife",
  },
  {
    _id: "8",
    title: "Real Estate Platform",
    category: "Web Development",
    color: "#a855f7",
    mainImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    description: "Property search platform with virtual tours, mortgage calculator, and agent matching.",
    tags: ["Next.js", "Mapbox", "Stripe"],
    year: "2023",
    client: "HomeFind",
  },
  {
    _id: "9",
    title: "Fashion E-Commerce",
    category: "Shopify",
    color: "#f59e0b",
    mainImage: "https://images.unsplash.com/photo-1445205170232-277528bb6b53?auto=format&fit=crop&w=800&q=80",
    description: "Luxury fashion store with AR try-on, personalized recommendations, and seamless checkout.",
    tags: ["Shopify Plus", "Three.js", "Klaviyo"],
    year: "2024",
    client: "StyleHub",
  },
  {
    _id: "10",
    title: "Healthcare Portal",
    category: "Full Stack",
    color: "#00c8ff",
    mainImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    description: "Patient management system with appointment scheduling, telemedicine, and EHR integration.",
    tags: ["React", "Node.js", "HIPAA"],
    year: "2023",
    client: "MediCare+",
  },
  {
    _id: "11",
    title: "Travel Booking App",
    category: "Mobile App",
    color: "#ff4d00",
    mainImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    description: "All-in-one travel app with flight/hotel booking, itinerary planning, and local guides.",
    tags: ["Flutter", "Google Maps", "Stripe"],
    year: "2024",
    client: "Wanderlust",
  },
  {
    _id: "12",
    title: "Education Platform",
    category: "Web Design",
    color: "#10d4a0",
    mainImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    description: "Online learning platform with interactive courses, progress tracking, and certification.",
    tags: ["Next.js", "Video.js", "Auth0"],
    year: "2023",
    client: "EduLearn",
  },
];

const CATEGORIES = ["All", "Web Design", "Web Development", "Graphic Design", "Full Stack", "Shopify", "Mobile App"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const scrollAnimations = useRef<Record<string, ReturnType<typeof requestAnimationFrame>>>({});

  const filteredProjects = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setIsLoadingMore(false);
    }, 800);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(6);
  };

  // Cleanup animations on unmount
  useEffect(() => {
    return () => {
      Object.values(scrollAnimations.current).forEach((anim) => {
        if (anim) cancelAnimationFrame(anim);
      });
    };
  }, []);

  return (
    <section className="relative py-[10vh] xl:py-[14vh] overflow-hidden font-mono" style={{
      fontFamily: `'DM Mono', 'Courier New', monospace`,
      background: "linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)",
    }}>
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 80% 50% at 20% 40%, rgba(255,77,0,0.10) 0%, transparent 50%),
          radial-gradient(ellipse 60% 40% at 80% 60%, rgba(0,200,255,0.08) 0%, transparent 50%)
        `,
      }} />

      {/* Animated grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,77,0,0.04) 1px, transparent 1px),linear-gradient(90deg, rgba(255,77,0,0.04) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        animation: "portfolioGridDrift 26s linear infinite",
        opacity: 0.6,
      }} />

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.02) 3px, rgba(0,0,0,0.02) 4px)",
        opacity: 0.4,
      }} />

      {/* Decorative glows */}
      <div className="absolute pointer-events-none rounded-full blur-[90px] w-[700px] h-[700px] top-[-120px] left-[-180px]" style={{ background: "radial-gradient(circle, rgba(255,77,0,0.11), transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[90px] w-[550px] h-[550px] bottom-[-80px] right-[-100px]" style={{ background: "radial-gradient(circle, rgba(16,212,160,0.09), transparent 70%)" }} />

      <div className="max-w-[1600px] mx-auto xl:px-10 px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-[640px] mx-auto mb-12 xl:mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="inline-block w-[52px] h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
            <span className="text-[10.5px] tracking-[0.38em] text-[#ff4d00] uppercase">Our Work</span>
            <span className="inline-block w-[52px] h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
          </div>
          <h2 className="font-bebas text-[clamp(38px,5.5vw,62px)] text-white leading-[1.02] tracking-[0.03em] m-0 mb-4">
            Featured<br />
            <span className="text-[#ff4d00] drop-shadow-[0_0_50px_rgba(255,77,0,0.45)]">Projects</span>
          </h2>
          <p className="text-[13.5px] text-white/50 leading-[1.75] max-w-[480px] mx-auto">
            Explore our latest work and see how we've helped brands transform their digital presence.
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 xl:mb-16">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`
                px-5 py-2.5 rounded-full text-[11px] tracking-[0.25em] uppercase
                transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                backdrop-blur-sm border font-dmMono
                ${activeCategory === category
                  ? "bg-[#ff4d00] text-white border-[#ff4d00] shadow-[0_0_20px_rgba(255,77,0,0.4)]"
                  : "bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 xl:gap-8">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
              isHovered={hoveredProject === project._id}
              onHoverChange={setHoveredProject}
              scrollAnimations={scrollAnimations}
            />
          ))}

          {/* Skeleton Loader for Load More */}
          {isLoadingMore &&
            [...Array(6)].map((_, index) => (
              <div
                key={"loader-" + index}
                className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="relative h-[380px] bg-white/10 animate-pulse" />
                <div className="p-5">
                  <div className="h-6 bg-white/10 rounded w-3/4 mx-auto animate-pulse" />
                </div>
              </div>
            ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-16 xl:mt-20">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className={`
                inline-flex items-center gap-3.5 py-4 px-[42px] 
                font-mono text-[12px] tracking-[.22em] uppercase 
                rounded-none transition-all duration-300
                ${isLoadingMore
                  ? "bg-white/20 text-white/50 cursor-not-allowed"
                  : "bg-gradient-to-br from-[#ff4d00] to-[#ff8c00] text-white hover:-translate-y-0.5 hover:shadow-lg"
                }
              `}
              style={{
                clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                boxShadow: isLoadingMore ? "none" : "0 10px 42px rgba(255,77,0,0.42)",
              }}
            >
              <span>{isLoadingMore ? "Loading..." : "Load More Projects"}</span>
              <span className="text-[18px]">→</span>
            </button>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes portfolioGridDrift {
          0% { background-position: 0 0; }
          100% { background-position: 64px 64px; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        @font-face {
          font-family: 'Bebas Neue';
          font-style: normal;
          font-weight: 400;
          src: local('Bebas Neue'), url('https://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg1_i6t8kCHKm459WxRxC7m0dR7G4w.woff2') format('woff2');
        }
        @font-face {
          font-family: 'DM Mono';
          font-style: normal;
          font-weight: 400;
          src: local('DM Mono'), url('https://fonts.gstatic.com/s/dmmono/v5/aFTR7PB1QTsUX8KYvrGyDQ.woff2') format('woff2');
        }
      `}</style>
    </section>
  );
}

// ProjectCard with smooth vertical scroll effect on hover
const ProjectCard = ({
  project,
  index,
  isHovered,
  onHoverChange,
  scrollAnimations,
}: {
  project: typeof PROJECTS[0];
  index: number;
  isHovered: boolean;
  onHoverChange: (id: string | null) => void;
  scrollAnimations: React.MutableRefObject<Record<string, ReturnType<typeof requestAnimationFrame>>>;
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle scroll animation
  useEffect(() => {
    // Cancel any existing animation for this project
    if (scrollAnimations.current[project._id]) {
      cancelAnimationFrame(scrollAnimations.current[project._id]);
    }

    if (!isHovered) {
      setScrollProgress(0);
      return;
    }

    const duration = 2800; // 2.8 seconds for full scroll
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Apply ease-in-out easing
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      setScrollProgress(eased);

      if (progress < 1) {
        scrollAnimations.current[project._id] = requestAnimationFrame(animate);
      } else {
        delete scrollAnimations.current[project._id];
      }
    };

    scrollAnimations.current[project._id] = requestAnimationFrame(animate);

    return () => {
      if (scrollAnimations.current[project._id]) {
        cancelAnimationFrame(scrollAnimations.current[project._id]);
        delete scrollAnimations.current[project._id];
      }
    };
  }, [isHovered, project._id, scrollAnimations]);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl backdrop-blur-md border cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        border: `1px solid ${isHovered ? project.color : "rgba(255,255,255,0.12)"}`,
        boxShadow: isHovered
          ? `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${project.color}33`
          : "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
      }}
      onMouseEnter={() => onHoverChange(project._id)}
      onMouseLeave={() => onHoverChange(null)}
    >
      {/* Image Container with Vertical Scroll Effect */}
      <div className="relative h-[380px] overflow-hidden">
        {/* Tall image container - 2.5x height for scroll effect */}
        <div className="relative w-full h-[950px]">
          <img
            src={project.mainImage}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
            style={{
              // Vertical scroll: translate Y based on progress
              transform: `translateY(-${scrollProgress * 60}%)`,
              transition: isHovered 
                ? "transform 0ms linear" // Smooth via JS animation
                : "transform 700ms cubic-bezier(0.16,1,0.3,1)",
            }}
          />
          
          {/* Gradient overlay for readability */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, 
                rgba(5,3,13,0.1) 0%, 
                rgba(5,3,13,0.4) 40%, 
                rgba(5,3,13,0.92) 100%)`,
            }}
          />
        </div>

        {/* Scroll indicator (shows on hover) */}
        <div
          className={`
            absolute right-4 top-1/2 -translate-y-1/2 w-px h-20
            transition-opacity duration-500
            ${isHovered ? "opacity-100" : "opacity-0"}
          `}
          style={{
            background: `linear-gradient(180deg, ${project.color}, transparent)`,
            boxShadow: `0 0 12px ${project.color}`,
          }}
        >
          {/* Animated dot */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
            style={{
              background: project.color,
              boxShadow: `0 0 8px ${project.color}`,
              transform: `translate(-50%, -${scrollProgress * 100}%)`,
              transition: "transform 0ms linear",
            }}
          />
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className="px-4 py-1.5 rounded-full text-white text-[9px] tracking-[0.25em] uppercase font-dmMono backdrop-blur-md border"
            style={{
              background: `rgba(5,3,13,0.85)`,
              borderColor: `${project.color}44`,
              boxShadow: `0 0 16px ${project.color}33`,
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Content Overlay - appears on hover */}
        <div className={`
          absolute inset-0 p-5 flex flex-col justify-end
          transition-opacity duration-500
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}>
          {/* Title */}
          <h4 className="font-bebas text-[26px] text-white leading-none mb-2 tracking-[0.02em]">
            {project.title}
          </h4>

          {/* Meta info */}
          {(project.client || project.year) && (
            <div className="flex items-center gap-3 mb-3">
              {project.client && (
                <span className="font-dmMono text-[11px] text-white/60">{project.client}</span>
              )}
              {project.client && project.year && (
                <span className="w-1 h-1 rounded-full bg-white/30" />
              )}
              {project.year && (
                <span className="font-dmMono text-[11px] text-white/40">{project.year}</span>
              )}
            </div>
          )}

          {/* Description */}
          {project.description && (
            <p className="font-dmMono text-[12px] text-white/70 leading-[1.6] mb-4 line-clamp-3">
              {project.description}
            </p>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg text-[10px] bg-white/10 border border-white/15 text-white/70 backdrop-blur-sm font-dmMono"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* View Project Link */}
          <div className="flex items-center gap-2">
            <span className="font-dmMono text-[11px] tracking-[0.25em] uppercase" style={{ color: project.color }}>
              View Project
            </span>
            <span className="text-[14px]" style={{ color: project.color }}>→</span>
          </div>
        </div>

        {/* Default content (shown when not hovered) */}
        <div className={`
          absolute bottom-0 left-0 right-0 p-5
          transition-opacity duration-500
          ${isHovered ? "opacity-0" : "opacity-100"}
        `}>
          <h4 className="font-bebas text-[24px] text-white leading-none mb-2 tracking-[0.02em]">
            {project.title}
          </h4>
          {project.description && (
            <p className="font-dmMono text-[12px] text-white/50 leading-[1.6] line-clamp-2">
              {project.description}
            </p>
          )}
        </div>

        {/* Accent corner */}
        <div
          className="absolute top-0 right-0 w-16 h-16"
          style={{
            background: `linear-gradient(135deg, ${project.color}, transparent)`,
            clipPath: "polygon(100% 0, 0 0, 100% 100%)",
            opacity: isHovered ? 0.85 : 0.6,
            transition: "opacity 0.5s",
          }}
        />

        {/* Hover glow overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at top, ${project.color}18, transparent 65%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
};