import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "../components/StoreProvider";
import AuthWrapper from "../components/AuthWrapper";

export const metadata: Metadata = {
  title: "SantimPay POS Elite",
  description: "Next-generation Point of Sale Terminal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <StoreProvider>
          <AuthWrapper>
            {children}
          </AuthWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
