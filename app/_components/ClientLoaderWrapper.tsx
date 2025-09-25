"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientLoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // fake delay to show loader clearly
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname]); // run whenever route changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-500"></div>
        <p className="ml-3 text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
