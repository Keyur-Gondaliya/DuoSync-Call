import type { Metadata } from "next";
import { Raleway, Vollkorn } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Vollkorn({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "DuoSynac Call",
  description: "One to One Video and Audio call for Free.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.css"
          rel="stylesheet"
        />
      </Head>
      <body className={inter.className}>
        {children}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js"></script>
      </body>
    </html>
  );
}
