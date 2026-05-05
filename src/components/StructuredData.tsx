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
          areaServed: "UK",
        }),
        ...(!businessInfo.address && { areaServed: "Worldwide" }),
        sameAs: [
          "https://twitter.com/creatovix",
          "https://linkedin.com/company/creatovix",
        ],
      }
    : null;

  // Service schema (for service pages)
  // FIX: Google requires offers to have priceSpecification or use AggregateOffer,
  // and the provider should be a full object. Removed bare "url" from Offer
  // (not a valid property) and replaced with priceSpecification.
  const serviceSchema =
    service && pageType === "service"
      ? {
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          serviceType: service.title,
          provider: {
            "@type": "LocalBusiness",
            name: businessInfo?.name || "Creatovix",
            url: baseUrl,
          },
          areaServed: service.seo.location || "Worldwide",
          description: service.seo.description,
          url: `${baseUrl}/services/${service.slug}`,
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            url: `${baseUrl}/services/${service.slug}`,
            priceCurrency: "GBP",
            price: "0",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "GBP",
              description: "Contact for pricing",
            },
          },
        }
      : null;

  // FAQ schema (for service pages with FAQs)
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

  // Breadcrumb schema
  // FIX: BreadcrumbList is valid on all page types but previously could
  // render even on non-service pages where `service` is undefined.
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

  // FIX: Each schema MUST be its own <script> tag.
  // Google's Rich Results validator rejects a single <script> containing
  // a JSON array of schemas — each must be a separate ld+json block.
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