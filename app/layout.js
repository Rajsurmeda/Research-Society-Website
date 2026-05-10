import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Academic & Research Society – Inauguration",
  description:
    "Welcome to the grand inauguration of the Academic & Research Society. Empowering minds, fostering innovation, and building a community of scholars.",
  keywords: "academic, research, society, inauguration, university, scholars",
  openGraph: {
    title: "Academic & Research Society – Inauguration",
    description:
      "Welcome to the grand inauguration of the Academic & Research Society.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
