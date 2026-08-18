import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Le Cong Hoan — Full-stack Developer | Angular, Next.js, Spring Boot, Go",
  description:
    "Portfolio of Le Cong Hoan, Senior Full-stack Developer in Hanoi, Vietnam. Engineering scalable web architectures, micro-frontends, high-throughput backend services, and cloud-native systems.",
  keywords: [
    "Le Cong Hoan",
    "Full-stack Developer",
    "Angular Developer",
    "Next.js Developer",
    "Java Spring Boot",
    "Go Golang Developer",
    "Kubernetes",
    "PostgreSQL",
    "Software Engineer Hanoi Vietnam"
  ],
  authors: [{ name: "Le Cong Hoan", url: "https://github.com/hoan02" }],
  creator: "Le Cong Hoan",
  metadataBase: new URL("https://hoan.io.vn"),
  openGraph: {
    title: "Le Cong Hoan — Full-stack Developer",
    description:
      "Senior Full-stack Developer with expertise in Angular, Next.js, Java / Spring Boot, Go, and Kubernetes.",
    url: "https://hoan.io.vn",
    siteName: "Le Cong Hoan Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#090a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased dark`}
    >
      <body className="min-h-screen bg-[#090a0f] text-[#f4f4f5] font-sans selection:bg-emerald-500 selection:text-black overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
