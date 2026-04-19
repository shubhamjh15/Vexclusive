import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'V Exclusive | Discover Goa',
  description: 'Unlock Goa\'s best restaurants, clubs, and exclusive offers.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} dark`}>
      <body className="font-sans antialiased bg-[#050505] text-white overflow-x-hidden selection:bg-amber-500/30 selection:text-white" suppressHydrationWarning>{children}</body>
    </html>
  );
}
