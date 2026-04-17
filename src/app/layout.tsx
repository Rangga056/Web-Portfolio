import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ShellProvider } from "@/context/ShellContext";
import { ShellLayout } from "@/components/shell/ShellLayout";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Rangga Miftahul Falah | Software Engineer",
  description:
    "Portfolio of Muhammad Rangga Miftahul Falah - Fullstack Developer & AI Automation Enthusiast.",
  verification: {
    google: "fT-00BBi_MPf6xCfLtVDbET3LNw_5ZH393qYrwwprDE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="h-full overflow-hidden selection:bg-tokyo-blue selection:text-white bg-ide-bg text-foreground flex flex-col">
        <ShellProvider>
          <ShellLayout>{children}</ShellLayout>
        </ShellProvider>
      </body>
    </html>
  );
}
