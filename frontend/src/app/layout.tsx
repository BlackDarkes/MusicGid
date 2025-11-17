import type { Metadata } from "next";
import { Lato, EB_Garamond, Inter } from "next/font/google";
import "./styles/base/normalize.scss";
import "./styles/base/globals.scss";
import { QueryRouter } from "./routers/QueryRouter";

const lato = Lato({
  variable: "--font-lato",
  weight: ["400", "700", "900"],
  subsets: ["latin"],
})

const ebGaramond = EB_Garamond({
  variable: "--font-eb_garamond",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MusicGid",
  description: "shop for musical instruments and help with their tuning",
  keywords: ["MusicGid"],
  authors: [
    { name: "DaniilGordeev(BlackDarks)", url: "https://t.me/BlackDarkes" }
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${lato.variable} ${ebGaramond.variable} ${inter.variable}`}>
        <QueryRouter>
          {children}
        </QueryRouter>
      </body>
    </html>
  );
}
