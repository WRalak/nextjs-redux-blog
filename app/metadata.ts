// app/metadata.ts
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chemutai Blog - Next.js Redux Application',
  description: 'A full-featured blog application built with Next.js, Redux Toolkit, and Redux-Saga',
  keywords: ['Next.js', 'Redux', 'Blog', 'React', 'TypeScript', 'Tailwind CSS'],
  authors: [{ name: 'Chemutai Blog Team' }],
  openGraph: {
    title: 'Chemutai Blog - Next.js Redux Application',
    description: 'A full-featured blog application built with Next.js, Redux Toolkit, and Redux-Saga',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chemutai Blog',
    description: 'A full-featured blog application built with Next.js, Redux Toolkit, and Redux-Saga',
    images: ['https://your-domain.com/og-image.jpg'],
  },
  robots: {
    index: true,
  },
}
