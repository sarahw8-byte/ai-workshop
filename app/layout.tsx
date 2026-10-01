import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Study Tasks",
  description: "A study task list for people learning a language.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
