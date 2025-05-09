import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./Provider/StoreProvider";
import SessionLayout from "./Provider/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pespembe Blog",
  description: "Generated by Fahri, Yunus and Beyzaa",
};

export default function RootLayout({ children }) {
  return (
    <SessionLayout>
      <StoreProvider>
        <html lang="en ">
          <body className={`${geistSans.variable} ${geistMono.variable}`}>
            {children}
          </body>
        </html>
      </StoreProvider>
    </SessionLayout>
  );
}
