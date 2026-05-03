// src/lib/sanity-portabletext.tsx
"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export const sanityPortableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4" style={{ fontFamily: "'Bebas Neue','Impact',sans-serif", letterSpacing: "0.02em" }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold mt-7 mb-3" style={{ fontFamily: "'Bebas Neue','Impact',sans-serif", letterSpacing: "0.02em" }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold mt-6 mb-3" style={{ fontFamily: "'Bebas Neue','Impact',sans-serif", letterSpacing: "0.02em" }}>
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-[#a8b4cc] text-[15px] leading-[1.85] mb-5" style={{ fontFamily: "'DM Mono','Courier New',monospace" }}>
        {children}
      </p>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const target = (value.href || "").startsWith("http") ? "_blank" : undefined;
      return (
        <a href={value.href} target={target} rel={target ? "noopener noreferrer" : undefined} className="text-[#ff4d00] hover:underline transition-colors">
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-6 relative w-full aspect-video rounded-xl overflow-hidden border border-white/10">
          <Image
            src={urlFor(value).width(1200).height(675).url()}
            alt={value.alt || "Blog post image"}
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
      );
    },
  },
};

// Reusable wrapper component
export function SanityContent({ content }: { content: any[] }) {
  return <PortableText value={content} components={sanityPortableTextComponents} />;
}