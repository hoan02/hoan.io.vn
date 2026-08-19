import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
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
  icons: {
    icon: [
      { url: "/images/logo-dark.svg", media: "(prefers-color-scheme: dark)" },
      { url: "/images/logo-light.svg", media: "(prefers-color-scheme: light)" },
      { url: "/images/logo-dark.svg" },
    ],
    shortcut: "/images/logo-dark.svg",
    apple: "/images/logo-dark.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#090a0f" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Le Cong Hoan",
  alternateName: "Lê Công Hoan",
  url: "https://hoan.io.vn",
  image: "https://hoan.io.vn/images/logo-dark.svg",
  jobTitle: "Senior Full-stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "Software Engineering",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hanoi",
    addressCountry: "Vietnam",
  },
  sameAs: [
    "https://github.com/hoan02",
    "https://linkedin.com/in/hoan02",
    "https://facebook.com/hoan02",
  ],
  knowsAbout: [
    "Angular",
    "Next.js",
    "TypeScript",
    "Java",
    "Spring Boot",
    "Golang",
    "Kubernetes",
    "Docker",
    "PostgreSQL",
    "Microservices",
  ],
};

const themeInitScript = `
  (function() {
    try {
      var saved = localStorage.getItem('portfolio_theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var isDark = saved === 'dark' || (!saved && prefersDark) || (saved === 'system' && prefersDark);
      if (saved === 'light' || (!saved && !prefersDark)) {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        document.documentElement.style.colorScheme = 'light';
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        document.documentElement.style.colorScheme = 'dark';
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased dark`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-[#090a0f] text-slate-900 dark:text-[#f4f4f5] font-sans selection:bg-emerald-500 selection:text-black overflow-x-hidden transition-colors duration-200">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
