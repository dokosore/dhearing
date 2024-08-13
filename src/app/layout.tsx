import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Header, { HEADER_HEIGHT } from "./components/Header";
import { Box } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "dheating",
  description: "Project specification management tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Providers>
          <Header />
          <Box pt={HEADER_HEIGHT}>
            <main>{children}</main>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
