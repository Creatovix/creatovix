import PortfolioSection from "@/components/sections/Portfolio";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Creatovix",
  description:
    "Explore our latest web design, development, and graphic design projects.",
  alternates: {
    canonical: "https://www.creatovix.com/portfolio",
  },
};

export default function Portfolio() {
  return (
    <div>
      <PortfolioSection />
    </div>
  );
}