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

  // LocalBusiness schema (include on all pages)
  const localBusinessSchema = businessInfo
    ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: businessInfo.name,
        url: businessInfo.url,
        logo: businessInfo.logo,
        image: businessInfo.logo,
        telephone: businessInfo.phone,
        priceRange: businessInfo.priceRange || "$$",
        address: businessInfo.address
          ? {
              "@type": "PostalAddress",
              streetAddress: businessInfo.address.street,
              addressLocality: businessInfo.address.locality,
              postalCode: businessInfo.address.postalCode,
              addressCountry: businessInfo.address.addressCountry,
            }
          : undefined,
        areaServed: businessInfo.address ? "UK" : "Worldwide",
        sameAs: [
          "https://twitter.com/creatovix",
          "https://linkedin.com/company/creatovix",
        ],
      }
    : null;

  // Service schema (for service pages)
  const serviceSchema = service
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: service.title,
        provider: {
          "@type": "LocalBusiness",
          name: businessInfo?.name || "Creatovix",
          url: baseUrl,
        },
        areaServed: service.seo.location || "Worldwide",
        description: service.seo.description,
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          url: `${baseUrl}/services/${service.slug}`,
        },
      }
    : null;

  // FAQ schema (for service pages with FAQs)
  const faqSchema = service?.content.faqs?.length
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

  // Breadcrumb schema
  const breadcrumbSchema = service
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${baseUrl}/#services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: `${baseUrl}/services/${service.slug}`,
          },
        ],
      }
    : null;

  // Add this schema inside the component
  const articleSchema = articleData
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
            url: "https://creatovix.com/logo.png",
          },
        },
      }
    : null;

  const schemas = [
    localBusinessSchema,
    pageType === "service" && serviceSchema,
    pageType === "service" && faqSchema,
    pageType === "blog" && articleSchema,
    breadcrumbSchema,
  ].filter(Boolean);

  if (schemas.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
