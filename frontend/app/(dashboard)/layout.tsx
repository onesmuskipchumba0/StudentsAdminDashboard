import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";



export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <body
        className={`flex flex-row min-h-screen  antialiased`}
      >
        <Navbar />
        <div className="flex-1">
            <SearchBar />
            {children}
        </div>
      </body>
  );
}
