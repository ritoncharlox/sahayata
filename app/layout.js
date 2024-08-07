import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { SessionProvider } from 'next-auth/react';
import { auth } from "@/auth";
import OrderProvider from "@/contexts/orderContext";
import Order from "@/components/Order/Order";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sahayata - Expert Home Fixes & Trusted Solution",
  description: "Yo description vanni chiz aaila sudip randi ko baan ley akxin ma halxa, aaila chai tyo muji tai na tui sga kk ho kk herirako xaw. And I want to say that to Sudip Lamichhane vanni damno fuck you bitch.",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <OrderProvider>
            <Order session={session}/>
            <Navbar session={session} />
              <NextTopLoader color="#EE7214" showSpinner={false} />
            {children}
            <Footer />
          </OrderProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
