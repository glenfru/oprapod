import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/components/auth/auth-provider';
import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/layout/header';
import { MobileNav } from '@/components/layout/mobile-nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Oprah Podcast Community',
  description: 'Join the conversation about Oprah\'s latest podcast episodes and book discussions',
  keywords: ['Oprah', 'podcast', 'community', 'books', 'discussion'],
  authors: [{ name: 'The Oprah Podcast Community' }],
  openGraph: {
    title: 'The Oprah Podcast Community',
    description: 'Join the conversation about Oprah\'s latest podcast episodes and book discussions',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5">
              <Header />
              <main className="container mx-auto px-4 py-6 pb-20 lg:pb-6">
                {children}
              </main>
              <MobileNav />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}