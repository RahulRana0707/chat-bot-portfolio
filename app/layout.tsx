import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { BackgroundRippleEffect } from "@/components/background-ripple-effect";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
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
        className={`${lexend.className} antialiased w-screen min-h-screen overflow-x-hidden scroll-smooth`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden">
            <div className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden">
              <BackgroundRippleEffect />
            </div>
          </div>

          <div className="w-full h-full z-20">{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
