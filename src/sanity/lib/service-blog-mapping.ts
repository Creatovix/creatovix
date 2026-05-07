// src/lib/config/service-blog-mapping.ts
export const SERVICE_TO_SANITY_CATEGORY: Record<string, string> = {
  "web-design": "Web Design",
  "shopify-development": "Shopify", 
  "custom-development": "Development",
  "digital-marketing": "Marketing",
  "brand-identity": "Business",
  // Add more as you create services
};

export function getCategoryForService(serviceSlug: string): string | undefined {
  return SERVICE_TO_SANITY_CATEGORY[serviceSlug];
}