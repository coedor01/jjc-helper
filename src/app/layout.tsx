import * as React from "react";
import type { Metadata } from "next";

import LocalFont from "next/font/local";

import "./globals.css";
import { Box } from "@mui/material";
import ClientLayout from "./components/clientLayout";
const pingFang = LocalFont({
  src: "./fonts/PingFang Regular.ttf",
  variable: "--pingfang-regular",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={pingFang.variable} style={{ margin: 0 }}>
        <div className="fixed size-full bg-sky-900">
          <ClientLayout>{children}</ClientLayout>
        </div>
      </body>
    </html>
  );
}
