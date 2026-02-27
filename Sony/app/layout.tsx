import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
    title: 'Sony WH-1000XM6 | Silence, Perfected',
    description: 'Experience the Sony WH-1000XM6 flagship wireless noise cancelling headphones. Engineered for a world that never stops.',
    keywords: 'Sony WH-1000XM6, noise cancelling headphones, wireless headphones, Sony flagship',
    openGraph: {
        title: 'Sony WH-1000XM6 | Silence, Perfected',
        description: 'Flagship wireless noise cancelling, re-engineered for a world that never stops.',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className={`${inter.variable} font-sans antialiased bg-[#050505] text-white overflow-x-hidden`}>
                {children}
            </body>
        </html>
    )
}
