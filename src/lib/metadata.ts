import { CONTENT } from '@/constants/site-contentent';
import { Metadata } from 'next';

const {
  NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_TWITTER_CREATOR,
  NEXT_PUBLIC_AUTHOR_SITE,
  NEXT_PUBLIC_AUTHOR_NAME,
} = process.env;

const baseUrl = NEXT_PUBLIC_BASE_URL
  ? `${NEXT_PUBLIC_BASE_URL}`
  : 'http://localhost:3000';

export const commonMetadata: Metadata = {
  title: {
    default: NEXT_PUBLIC_SITE_NAME || 'Enrollix',
    template: `%s | ${NEXT_PUBLIC_SITE_NAME || 'Enrollix'}`,
  },
  description: CONTENT.metadata.description,
  keywords: CONTENT.metadata.keyWords,
  referrer: 'origin-when-cross-origin',
  creator: NEXT_PUBLIC_AUTHOR_NAME,
  publisher: NEXT_PUBLIC_AUTHOR_NAME,
  authors: [
    {
      name: NEXT_PUBLIC_AUTHOR_NAME,
      url: NEXT_PUBLIC_AUTHOR_SITE,
    },
  ],
  openGraph: {
    title: NEXT_PUBLIC_SITE_NAME,
    description: CONTENT.metadata.description,
    url: 'https://crm.university.edu',
    siteName: NEXT_PUBLIC_AUTHOR_SITE,
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'University CRM Dashboard',
      },
    ],
    locale: 'pt-PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'University CRM',
    description: 'Centralized CRM system for a universitie.',
    images: [`${baseUrl}/og-image.png`],
    creator: NEXT_PUBLIC_TWITTER_CREATOR,
  },
  alternates: {
    canonical: '/',
    languages: { 'pt-PT': '/pt-PT' },
  },
  metadataBase: new URL(baseUrl),
  category: 'education',
};
