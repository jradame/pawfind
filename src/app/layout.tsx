import type { Metadata } from "next"
import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "PawFind — Adopt a Pet in Austin",
  description: "Find your perfect rescue pet in Austin, TX.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}