// src/app/services/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/services";
import ServiceContent from "./ServiceContent";
import StructuredData from "@/components/StructuredData";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { SERVICES } = await import("@/lib/services");
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  
  if (!service) {
    return {
      title: "Service Not Found | Creatovix",
      description: "The requested service could not be found."
    };
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://creatovix.com";
  
  return {
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    alternates: { canonical: `${baseUrl}/services/${service.slug}` },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      type: "website",
      url: `${baseUrl}/services/${service.slug}`,
      siteName: "Creatovix",
      images: [{ 
        url: service.images.hero.src.startsWith('http') 
          ? service.images.hero.src 
          : `${baseUrl}${service.images.hero.src}`, 
        width: service.images.hero.width, 
        height: service.images.hero.height, 
        alt: service.images.hero.alt 
      }]
    },
    twitter: {
      card: "summary_large_image",
      title: service.seo.title,
      description: service.seo.description,
      images: [service.images.hero.src.startsWith('http') 
        ? service.images.hero.src 
        : `${baseUrl}${service.images.hero.src}`]
    }
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  
  if (!service) {
    notFound();
  }
  
  return (
    <>
      <StructuredData 
        service={service} 
        pageType="service" 
        businessInfo={{
          name: "Creatovix",
          url: "https://creatovix.com",
          logo: "https://creatovix.com/logo.png",
          phone: "+44 XXX XXX XXXX",
          address: {
            street: "123 Design Street",
            locality: "London",
            postalCode: "SW1A 1AA",
            addressCountry: "GB"
          },
          priceRange: "££"
        }} 
      />
      <ServiceContent service={service} />
    </>
  );
}