import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zevray — Games, Apps & Creative Software",
  description: "Zevray is an independent studio building games, apps, and creative software with curiosity, craft, and personality.",
  metadataBase: new URL("https://zevray.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Zevray — Games, Apps & Creative Software",
    description: "An independent studio making games, apps, and creative software.",
    url: "https://zevray.com",
    siteName: "Zevray",
    type: "website"
  },
  twitter: { card: "summary_large_image", title: "Zevray", description: "Games, apps, and creative software." }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
