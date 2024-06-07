import React from "react";
import Footer from "@/src/components/Footer";
import TopBar from "@/src/components/TopBar";
import { Metadata } from "next";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import hm from "@/styles/Home.module.css";
import WalletProviderContext from "@/src/contexts/WalletProviderContext";

export const metatdata: Metadata = {
  metadataBase: new URL("https://swap.dpo-global.com/"),
  description:
    "A Decentralized Swap Exchange of the DPO (Direct Private Offers) Security token, the main domain is at https://directprivateoffers.com",
  keywords: [
    "DEX",
    "SWAP",
    "EXCHANGE",
    "WEB3",
    " BLOCKCHAIN",
    "DPO",
    "ARBITRIUM",
    "SECURITY",
    "TOKEN",
  ],
  alternates: {
    canonical: "https://swap.dpo-global.com/",
  },
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <title> Decentralized Swap Exchange | Direct Private Offers </title>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://swap.dpo-global.com" />
      </head>
      <body>
      <TopBar mode={hm} />
      <main >
        <WalletProviderContext>{children}</WalletProviderContext>
      </main>
      <Footer mode={hm} />
      </body>
    </html>
  );
}

export default RootLayout;
