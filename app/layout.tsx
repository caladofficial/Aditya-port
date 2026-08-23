import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./preloader.css";

export const metadata: Metadata = {
  title: "Aditya Rai — Technology, Design, Leadership",
  description:
    "Aditya Rai is an AI/ML and frontend developer, UI/UX and graphic designer, and technology & design leader.",
  metadataBase: new URL("https://adityarai.dev"),
};

export const viewport: Viewport = {
  themeColor: "#0b0f0d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
