// components/StructuredData.tsx
export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Creatovix",
    image: "https://www.creatovix.com/og-image.jpg",
    "@id": "https://www.creatovix.com",
    url: "https://www.creatovix.com",
    telephone: "+1-XXX-XXX-XXXX", // ✅ Update with your number
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US", // ✅ Update with your location
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      "https://twitter.com/creatovix",
      "https://linkedin.com/company/creatovix",
      "https://instagram.com/creatovix",
      "https://facebook.com/creatovix",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Design & Development",
          description: "Custom, high-converting websites built with modern technologies",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Shopify Development",
          description: "Expert Shopify store setup, customization, and optimization",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Brand Identity & UI/UX Design",
          description: "Strategic branding and user-centered design that converts",
        },
      },
    ],
    areaServed: "Worldwide",
    availableLanguage: ["English"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}