import type { Metadata } from "next";
import "./globals.css";
import ApolloWrapper from "../../lib/apollo-wrapper";

export const metadata: Metadata = {
  title: "Brighte Eats - Interest Registration",
  description: "Register your interest in Brighte Eats services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
