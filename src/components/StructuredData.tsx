// src/components/StructuredData.tsx
import type { Service } from "@/lib/services";

interface StructuredDataProps {
  service?: Service;
  pageType?: "service" | "homepage" | "blog";
  businessInfo?: {
    name: string;
    url: string;
    logo: string;
    phone: string;
    address?: {
      street: string;
      locality: string;
      postalCode: string;
      addressCountry: string;
    };
    priceRange?: string;
    description?: string; // ← ADD THIS
  };
  articleData?: {
    headline: string;
    description: string;
    datePublished: string;
    image: string;
    author: string;
  };
}

export default function StructuredData({
  service,
  pageType = "homepage",
  businessInfo,
  articleData,
}: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://creatovix.com";

  // FIX 1: Add @id and description to LocalBusiness
  const localBusinessSchema = businessInfo
    ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#business`,
        name: businessInfo.name,
        description: businessInfo.description || "Digital agency offering web design, development, and graphic design services.",
        url: businessInfo.url,
        logo: {
          "@type": "ImageObject",
          url: businessInfo.logo,
        },
        image: businessInfo.logo,
        telephone: businessInfo.phone,
        priceRange: businessInfo.priceRange || "$$",
        ...(businessInfo.address && {
          address: {
            "@type": "PostalAddress",
            streetAddress: businessInfo.address.street,
            addressLocality: businessInfo.address.locality,
            postalCode: businessInfo.address.postalCode,
            addressCountry: businessInfo.address.addressCountry,
          },
          areaServed: {
            "@type": "Country",
            name: "GB",
          },
        }),
        ...(!businessInfo.address && {
          areaServed: "Worldwide",
        }),
        sameAs: [
          "https://twitter.com/creatovix",
          "https://linkedin.com/company/creatovix",
        ],
      }
    : null;

  // FIX 2: Remove contradictory price:"0" — use UnitPriceSpecification with no
  // numeric price, or use Offer with just availability + url for "contact us" services.
  // Also fix areaServed to avoid plain "Worldwide" string when location is missing.
  const serviceSchema =
    service && pageType === "service"
      ? {
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          serviceType: service.title,
          description: service.seo.description,
          url: `${baseUrl}/services/${service.slug}`,
          provider: {
            "@type": "LocalBusiness",
            "@id": `${baseUrl}/#business`,
            name: businessInfo?.name || "Creatovix",
            url: baseUrl,
          },
          ...(service.seo.location
            ? { areaServed: service.seo.location }
            : {}), // FIX: omit areaServed entirely if no location rather than "Worldwide"
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            url: `${baseUrl}/services/${service.slug}`,
            // FIX: For "contact for pricing", omit price/priceCurrency entirely.
            // A missing price is valid; price:"0" with a description is contradictory.
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "GBP",
              description: "Contact for pricing",
            },
          },
        }
      : null;

  // No changes needed for FAQ schema
  const faqSchema =
    service?.content.faqs?.length && pageType === "service"
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.content.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer.replace(/<[^>]*>/g, ""),
            },
          })),
        }
      : null;

  const breadcrumbSchema = service
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/#services` },
          { "@type": "ListItem", position: 3, name: service.title, item: `${baseUrl}/services/${service.slug}` },
        ],
      }
    : null;

  const articleSchema =
    articleData && pageType === "blog"
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: articleData.headline,
          description: articleData.description,
          datePublished: articleData.datePublished,
          image: articleData.image,
          author: { "@type": "Organization", name: articleData.author },
          publisher: {
            "@type": "Organization",
            name: "Creatovix",
            logo: {
              "@type": "ImageObject",
              url: "https://creatovix.com/logo.webp",
            },
          },
        }
      : null;

  const schemas = [
    localBusinessSchema,
    serviceSchema,
    faqSchema,
    articleSchema,
    breadcrumbSchema,
  ].filter(Boolean) as object[];

  if (schemas.length === 0) return null;

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}