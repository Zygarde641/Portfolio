import type { Metadata } from 'next'
import { Inter, Big_Shoulders_Display, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const bigShoulders = Big_Shoulders_Display({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-nine-navy-83.vercel.app'),
  title: 'Arjun Srivastava | Full-Stack Developer',
  description:
    'Full-stack software developer with DevOps experience and AI/ML exposure — React, Next.js, Node, Docker, Kubernetes, AWS.',
  keywords: [
    'Full-Stack Developer',
    'DevOps',
    'React',
    'Next.js',
    'Node.js',
    'Kubernetes',
    'AWS',
    'AI/ML',
  ],
  authors: [{ name: 'Arjun Srivastava' }],
  openGraph: {
    title: 'Arjun Srivastava | Full-Stack Developer',
    description:
      'Full-stack software developer with DevOps experience and AI/ML exposure.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${bigShoulders.variable} ${plexMono.variable} font-sans bg-black text-white antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
