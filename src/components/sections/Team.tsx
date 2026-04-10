"use client";

import { useEffect, useRef } from "react";

const team = [
  {
    name: "Ahmad Raza",
    role: "Lead Full Stack Developer",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop&crop=face",
    bio: "Architect of complex applications. 8 years across React, Node.js, and cloud infrastructure.",
    skills: ["React", "Next.js", "Node.js", "AWS"],
    accentColor: "#4A90C2",
  },
  {
    name: "Sara Khalid",
    role: "UI/UX & Web Designer",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop&crop=face",
    bio: "Creates beautiful, intuitive interfaces for fintech and e-commerce brands worldwide.",
    skills: ["Figma", "Webflow", "Branding", "Prototyping"],
    accentColor: "#E84E9C",
  },
  {
    name: "Usman Tariq",
    role: "WordPress & Shopify Expert",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop&crop=face",
    bio: "Built 60+ Shopify and WordPress sites that rank on Google and convert browsers to buyers.",
    skills: ["Shopify", "WordPress", "WooCommerce", "SEO"],
    accentColor: "#9AB84A",
  },
  {
    name: "Zara Noor",
    role: "Graphic Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop&crop=face",
    bio: "Brand identity expert with a sharp eye for detail and a passion for visual storytelling.",
    skills: ["Illustrator", "Photoshop", "Brand Identity", "Print"],
    accentColor: "#C4622D",
  },
  {
    name: "Hassan Ali",
    role: "Backend & DevOps Engineer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop&crop=face",
    bio: "Ensures every application is fast, secure, scalable, and always online with zero downtime.",
    skills: ["Node.js", "Docker", "PostgreSQL", "CI/CD"],
    accentColor: "#7B6CE8",
  },
  {
    name: "Fatima Sheikh",
    role: "Project Manager",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=800&fit=crop&crop=face",
    bio: "Keeps every project on track, on budget, and bridges the gap between strategy and execution.",
    skills: ["Strategy", "Agile", "Client Relations", "Planning"],
    accentColor: "#2DAE85",
  },
];

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const cards = cardRefs.current.filter(Boolean);
      const navItems = navItemRefs.current.filter(Boolean);
      const totalCards = cards.length;

      // Create a timeline for the sticky scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: "top top",
          end: `+=${totalCards * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate each card AND update nav items
      cards.forEach((card, index) => {
        if (!card) return;

        // Set initial state for cards
        gsap.set(card, {
          opacity: index === 0 ? 1 : 0,
          scale: index === 0 ? 1 : 0.95,
          zIndex: index === 0 ? totalCards - index : 0,
        });

        // Set initial state for nav items
        if (navItems[index]) {
          gsap.set(navItems[index], {
            opacity: index === 0 ? 1 : 0.4,
            borderColor: index === 0 ? team[index].accentColor : "#E0DDD8",
            backgroundColor: index === 0 ? "#fff" : "#fff",
          });

          // Highlight the indicator dot
          const indicator = navItems[index].querySelector(".nav-indicator");
          if (indicator) {
            gsap.set(indicator, {
              opacity: index === 0 ? 1 : 0,
            });
          }
        }

        // Add animation to timeline
        if (index > 0) {
          // Fade out previous card
          tl.to(
            cards[index - 1],
            {
              opacity: 0,
              scale: 0.95,
              duration: 1,
              ease: "power2.inOut",
            },
            index,
          );

          // Fade in current card
          tl.to(
            card,
            {
              opacity: 1,
              scale: 1,
              zIndex: totalCards - index,
              duration: 1,
              ease: "power2.inOut",
            },
            index,
          );

          // Update nav items - dim previous
          if (navItems[index - 1]) {
            tl.to(
              navItems[index - 1],
              {
                opacity: 0.4,
                borderColor: "#E0DDD8",
                duration: 0.5,
                ease: "power2.inOut",
              },
              index,
            );

            const prevIndicator =
              navItems[index - 1]?.querySelector(".nav-indicator");
            if (prevIndicator) {
              tl.to(
                prevIndicator,
                {
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.inOut",
                },
                index,
              );
            }
          }

          // Update nav items - highlight current
          if (navItems[index]) {
            tl.to(
              navItems[index],
              {
                opacity: 1,
                borderColor: team[index].accentColor,
                duration: 0.5,
                ease: "power2.inOut",
              },
              index,
            );

            const currentIndicator =
              navItems[index]?.querySelector(".nav-indicator");
            if (currentIndicator) {
              tl.to(
                currentIndicator,
                {
                  opacity: 1,
                  duration: 0.5,
                  ease: "power2.inOut",
                },
                index,
              );
            }
          }
        }
      });

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    };

    init();
  }, []);

  return (
    <section className="px-3" ref={sectionRef} id="team" style={{ background: "#F5F3F0" }}>
      {/* Header - Scrolls away normally */}
      <div
        style={{
          padding: "clamp(4rem, 8vw, 6rem) 0 clamp(2rem, 4vw, 3rem)",
          textAlign: "center",
        }}
      >
        <span
          className="tag"
          style={{ marginBottom: "1.25rem", display: "inline-flex" }}
        >
          The Team
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            letterSpacing: "-0.05em",
            lineHeight: 1.0,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            marginBottom: "1rem",
            color: "#1A1916",
          }}
        >
          Meet the experts
          <br />
          behind the code.
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "#6B6860",
            lineHeight: 1.75,
            maxWidth: 560,
            margin: "0 auto",
          }}
        >
          Scroll to meet the specialists who bring deep expertise and genuine
          passion to every single project.
        </p>
      </div>

      {/* Sticky Cards Container - Pins when this hits the top */}
      <div
        ref={cardsContainerRef}
        style={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <div className="container min-h-screen flex items-center py-[clamp(2rem,4vw,4rem)]">
          <div
            className="
      w-full 
      grid 
      grid-cols-1 
      md:grid-cols-2 
      gap-[clamp(2rem,4vw,4rem)] 
      items-center
    "
          >
            {/* Left: Sticky Image Card - FIXED LAYOUT */}
            <div className="md:h-[70vh] h-[80vh]" style={{ position: "relative", }}>
              {team.map((member, index) => (
                <div
                  key={member.name}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="team-card-sticky"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 24,
                    overflow: "hidden",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                    border: "1px solid #E0DDD8",
                    background: "#fff",
                    willChange: "opacity, transform",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Image Section - 65% height */}
                  <div
                    style={{
                      position: "relative",
                      height: "65%",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center top",
                      }}
                    />
                    {/* Gradient Overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to bottom, transparent 0%, rgba(26,25,22,0.8) 100%)",
                      }}
                    />

                    {/* Role Badge */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 20,
                        left: 24,
                        padding: "6px 16px",
                        borderRadius: 999,
                        background: member.accentColor,
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                    >
                      {member.role}
                    </div>
                  </div>

                  {/* Content Section - 35% height */}
                  <div
                    style={{
                      padding: "24px",
                      height: "35%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                          fontWeight: 800,
                          color: "#1A1916",
                          marginBottom: 12,
                          lineHeight: 1.2,
                        }}
                      >
                        {member.name}
                      </h3>
                      <p
                        style={{
                          fontSize: 14,
                          color: "#6B6860",
                          lineHeight: 1.6,
                          marginBottom: 16,
                        }}
                      >
                        {member.bio}
                      </p>
                    </div>

                    {/* Skills */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {member.skills.map((skill) => (
                        <span
                          key={skill}
                          style={{
                            padding: "6px 14px",
                            background: `${member.accentColor}15`,
                            border: `1px solid ${member.accentColor}30`,
                            borderRadius: 999,
                            fontSize: 12,
                            fontWeight: 600,
                            color: member.accentColor,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Navigation Indicators - WITH ACTIVE STATES */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {team.map((member, index) => (
                <div
                  key={member.name}
                  ref={(el) => {
                    navItemRefs.current[index] = el;
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: 20,
                    borderRadius: 16,
                    background: "#fff",
                    border: "1px solid #E0DDD8",
                    opacity: 0.4,
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  className="team-nav-item"
                  data-index={index}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: `2px solid ${member.accentColor}`,
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#1A1916",
                        margin: 0,
                      }}
                    >
                      {member.name}
                    </h4>
                    <p
                      style={{
                        fontSize: 13,
                        color: member.accentColor,
                        fontWeight: 600,
                        margin: "4px 0 0",
                      }}
                    >
                      {member.role}
                    </p>
                  </div>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: member.accentColor,
                      opacity: 0,
                      transition: "opacity 0.3s",
                    }}
                    className="nav-indicator"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .team-nav-item { display: none !important; }
        }
      `}</style>
    </section>
  );
}
