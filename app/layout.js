import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { SessionProvider } from 'next-auth/react';
import { auth } from "@/auth";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sahayata - Quick Home Fixes At your Fingertips",
  description: "Yo description vanni chiz aaila sudip randi ko baan ley akxin ma halxa, aaila chai tyo muji tai na tui sga kk ho kk herirako xaw. And I want to say that to Sudip Lamichhane vanni damno fuck you bitch.",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Navbar session={session} />
          <NextTopLoader color="#EE7214" showSpinner={false} />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
