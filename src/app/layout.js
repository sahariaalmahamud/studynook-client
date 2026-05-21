import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainNavbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StudyNook — Study Rooms & Workspace Booking",
  description: "Book, manage, and discover private study rooms for students and teams.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
        <MainNavbar />
        <main className="grow">{children}</main>
        <Toaster />
        <Footer />

      </body>
    </html>
  );
}
