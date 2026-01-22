import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kevin & Wenona's Wedding",
  description: "Our wedding day timeline",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
