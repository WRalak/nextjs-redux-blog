// app/metadata.ts
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Modern Blog - Next.js Redux Application',
  description: 'A full-featured blog application built with Next.js, Redux Toolkit, and Redux-Saga',
  keywords: ['Next.js', 'Redux', 'Blog', 'React', 'TypeScript', 'Tailwind CSS'],
  authors: [{ name: 'Modern Blog Team' }],
  openGraph: {
    title: 'Modern Blog - Next.js Redux Application',
    description: 'A full-featured blog application built with Next.js, Redux Toolkit, and Redux-Saga',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Blog',
    description: 'A full-featured blog application built with Next.js, Redux Toolkit, and Redux-Saga',
    images: ['https://your-domain.com/og-image.jpg'],
  },
  robots: {
    index: true,
  },
}
