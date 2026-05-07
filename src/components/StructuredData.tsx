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
    description?: string;
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

  // 1. LocalBusiness Schema (Homepage/Footer context)
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

  // 2. Service Schema (The fix for Ahrefs Error)
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
            : {}),
          
          // FIX: Use 'Offer' directly. 
          // If price is unknown, do NOT include 'price' or 'priceSpecification'.
          // Just include availability and the URL to the offer (the service page).
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            url: `${baseUrl}/services/${service.slug}`,
            // Note: We intentionally omit 'price' and 'priceCurrency' here.
            // This tells Google "This item is available, check the URL for details."
            // This resolves the "Rich results validation error".
          },
        }
      : null;

  // 3. FAQ Schema
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

  // 4. Breadcrumb Schema
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

  // 5. Article Schema (Blog)
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