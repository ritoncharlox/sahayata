import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar.js";
import Footer from "@/components/Footer/Footer.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sahayata - Quick Home Fixes At your Fingertips",
  description: "Yo description vanni chiz aaila maddath randi ko baan ley akxin ma halxa, aaila chai tyo muji tai na tui sga kk ho kk herirako xaw. And I want to say that to Maddath Subedi vanni damno fuck you bitch.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
