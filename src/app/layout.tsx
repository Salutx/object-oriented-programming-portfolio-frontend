import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/global/reset.scss";
import ProvidersGroup from "./ProvidersGroup";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vehicles DB",
  description: "Its project for car database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${interFont.variable}`} cz-shortcut-listen="true">
        <ProvidersGroup>{children}</ProvidersGroup>
      </body>
    </html>
  );
}
