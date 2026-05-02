// src/app/services/[slug]/generate-static-params.ts
import { getAllServiceSlugs } from "@/lib/services";

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  
  return slugs.map((slug) => ({
    slug,
  }));
}