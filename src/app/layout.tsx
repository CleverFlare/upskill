import "@/app/globals.css";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "jotai";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./session-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Upskill",
  description:
    "Upskill is your on-demand platform to future-proof your career.  Upskill offers a wide range of courses to help you learn new skills, advance your knowledge, and stay competitive in today's job market.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("flex min-h-screen flex-col font-sans", inter.variable)}
      >
        <Provider>
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <TRPCReactProvider>
                {children}
                <Toaster />
              </TRPCReactProvider>
            </ThemeProvider>
          </Providers>
        </Provider>
      </body>
    </html>
  );
}
