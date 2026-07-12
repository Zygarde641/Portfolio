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
  metadataBase: new URL('https://arjun-sri-portfolio.vercel.app'),
  title: 'Arjun Sri | Software Engineer, DevOps & Full-Stack Developer',
  description:
    'Arjun Sri (Arjun Sri Dev) — Software Engineer and Full-Stack Developer with DevOps and AI/ML experience. Chandigarh University alumnus working with React, Next.js, Node, Docker, Kubernetes, and AWS.',
  keywords: [
    'Arjun Sri',
    'Arjun Sri Dev',
    'Arjun Sri Chandigarh University',
    'Arjun Sri Software Engineer',
    'Arjun Sri DevOps',
    'Arjun Sri Full Stack Developer',
    'Software Engineer',
    'Full-Stack Developer',
    'DevOps',
    'Chandigarh University',
    'React',
    'Next.js',
    'Node.js',
    'Kubernetes',
    'AWS',
    'AI/ML',
  ],
  authors: [{ name: 'Arjun Sri' }],
  creator: 'Arjun Sri',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Arjun Sri | Software Engineer, DevOps & Full-Stack Developer',
    description:
      'Arjun Sri (Arjun Sri Dev) — Software Engineer and Full-Stack Developer with DevOps and AI/ML experience. Chandigarh University alumnus.',
    url: '/',
    siteName: 'Arjun Sri',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/logo.png',
        width: 700,
        height: 700,
        alt: 'Arjun Sri — Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Arjun Sri | Software Engineer, DevOps & Full-Stack Developer',
    description:
      'Arjun Sri (Arjun Sri Dev) — Software Engineer and Full-Stack Developer with DevOps and AI/ML experience. Chandigarh University alumnus.',
    images: ['/logo.png'],
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Arjun Sri',
  alternateName: ['Arjun Sri Dev', 'Arjun Srivastava'],
  jobTitle: 'Software Engineer',
  url: 'https://arjun-sri-portfolio.vercel.app',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Chandigarh University',
  },
  email: 'mailto:zarjun641@gmail.com',
  sameAs: [
    'https://github.com/Zygarde641',
    'https://www.linkedin.com/in/arjun-sri-dev',
    'https://codeforces.com/profile/The__Two',
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
