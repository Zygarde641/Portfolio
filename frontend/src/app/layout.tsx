import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LenisProvider } from '@/components/providers/LenisProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Arjun Srivastava | Full-Stack Developer',
  description: 'Full-Stack Developer specializing in React, Next.js, and Node.js. Building modern, performant web applications.',
  keywords: ['Full-Stack Developer', 'React', 'Next.js', 'Node.js', 'TypeScript', 'Web Developer'],
  authors: [{ name: 'Arjun Srivastava' }],
  openGraph: {
    title: 'Arjun Srivastava | Full-Stack Developer',
    description: 'Full-Stack Developer specializing in React, Next.js, and Node.js.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-black text-white antialiased`}>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
