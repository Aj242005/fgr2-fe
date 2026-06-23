import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Space_Mono, Geist } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata = {
  title: "Traffic Violation AI",
  description: "Next-gen intelligent traffic violation detection system.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        </head>
        <body className={`${inter.variable} ${spaceMono.variable} ${geist.variable}`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
