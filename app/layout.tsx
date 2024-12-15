// app/layout.tsx
import './globals.css'
import { GlobalProvider } from '@@/src/providers/GlobalContext';
import { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';
import "@@/src/utils/script"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NextThemes } from '@@/src/providers/NextThemes';
import Head from 'next/head';

const APP_NAME = "Rentalin";
const APP_DEFAULT_TITLE = "Rentalin";
const APP_TITLE_TEMPLATE = "%s - Rentalin";
const APP_DESCRIPTION = "Rentalin is a rental website";
const KEYWORDS = ['Rentalin']
const PUBLISHER = 'PT. Zinedine Sejahtera'
const AUTHORS = [{ name: 'Zinedine Ziddan Fahdlevy', url: 'https://www.linkedin.com/in/zinedine-fahdlevy-5137471b4/' }]
const BASE_DOMAIN = process.env.BASE_DOMAIN
const IMAGEICON = '/static-LP/iconlogobeyondtech.png'

export const metadata: Metadata = {
  applicationName: APP_NAME,
  keywords: KEYWORDS,
  publisher: PUBLISHER,
  authors: AUTHORS,
  creator: 'Zinedine Ziddan Fahdlevy',
  // referrer: 'origin-when-cross-origin',
  referrer: "no-referrer-when-downgrade",
  // colorScheme: 'light dark',
  // themeColor: '#00526c',
  metadataBase: new URL(BASE_DOMAIN),
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    startupImage: ['/icongen/apple-touch-icon.png'],
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
    date: true,
    url: true
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    url: BASE_DOMAIN,
    images: [IMAGEICON],
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    images: [IMAGEICON],
    description: APP_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icongen/apple-touch-icon.png",
    other: {
      rel: "icon",
      url: "/icongen/tile70x70.png"
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#00526c",
};


export default async function RootLayout({
  children,
  params
}: {
  children: ReactNode,
  params: {
    lang: string
  }
}) {

  return (
      <html lang="en" >
        <Head>
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          
        </Head>
        <body>
          {/* <WebVitals /> */}
          <ToastContainer />
          <GlobalProvider lang={params.lang}>
            <NextThemes>
              {children}
            </NextThemes>
          </GlobalProvider>
        </body>
      </html>
  );
}
