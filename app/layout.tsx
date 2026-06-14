import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";
import "./globals.css";
import { PortfolioChatProvider } from "@/components/portfolio-chat-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "@/lib/site-url";

const varelaRound = Varela_Round({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-varela-round",
  weight: "400",
});

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
  ],
  authors: [{ name: "Rahul Rana" }],
  icons: {
    icon: "/rahul-bot-logo.png",
    apple: "/rahul-bot-logo.png",
  },
  openGraph: {
    title: "Rahul Rana | Full Stack Developer",
    description: "Interactive portfolio with AI-powered chat interface",
    type: "website",
    url: "/",
    images: [
      {
        url: "/rahul-bot-logo.png",
        alt: "Rahul Rana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Rana | Full Stack Developer",
    description: "Interactive portfolio with AI-powered chat interface",
    images: ["/rahul-bot-logo.png"],
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
        className={`${varelaRound.className} antialiased w-screen min-h-screen overflow-x-hidden scroll-smooth`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PortfolioChatProvider>
            <TooltipProvider delayDuration={200}>
              <SiteHeader />
              <div className="w-full h-full z-20">{children}</div>
            </TooltipProvider>
          </PortfolioChatProvider>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
