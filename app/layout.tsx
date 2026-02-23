import type { Metadata } from "next";
import { Lexend, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Rahul Rana | Full Stack Developer",
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
        className={`${lexend.className} ${sourceSerif.variable} ${jetbrainsMono.variable} antialiased w-screen min-h-screen overflow-x-hidden scroll-smooth`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
         
          <TooltipProvider delayDuration={200}>
            <SiteHeader />
            <div className="w-full h-full z-20">{children}</div>
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
