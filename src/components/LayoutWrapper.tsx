"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // ✅ Hide on /studio AND all nested routes
  const hideLayout = pathname.startsWith("/studio");

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}