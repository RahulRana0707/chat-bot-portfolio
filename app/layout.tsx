import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SITE_URL } from "@/lib/site";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rahul Rana | Full Stack Developer",
    template: "%s | Rahul Rana",
  },
  description:
    "Full Stack Developer passionate about building interactive apps and AI-driven tools. Explore my projects, skills, and experiences through an interactive AI chat interface.",
  keywords: [
    "Rahul Rana",
    "Full Stack Developer",
    "Portfolio",
    "React",
    "Next.js",
    "AI Chat",
    "Web Development",
    "Frontend Engineer",
  ],
  authors: [{ name: "Rahul Rana", url: SITE_URL }],
  creator: "Rahul Rana",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Rahul Rana",
    title: "Rahul Rana | Full Stack Developer",
    description:
      "Full Stack Developer passionate about building interactive apps and AI-driven tools. Explore projects, skills, and experiences through an AI chat interface.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Rana | Full Stack Developer",
    description:
      "Full Stack Developer. Explore my projects, skills, and experiences through an interactive AI chat interface.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${lexend.className} antialiased w-screen min-h-screen overflow-x-hidden scroll-smooth`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="w-full h-full min-h-screen">{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
