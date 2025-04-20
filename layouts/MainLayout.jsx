import { Raleway } from 'next/font/google';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { SpeedInsights } from '@vercel/speed-insights/next';

/**
 * Load the Raleway font from Google Fonts with specified weights and subsets.
 */
const raleway = Raleway({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-raleway',
});

/**
 * MainLayout Component
 *
 * Provides the main layout structure with a header, footer, and dynamic content.
 *
 * @component
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The content to be displayed inside the layout.
 * @returns {JSX.Element} The rendered MainLayout component.
 */
const MainLayout = ({ children }) => {
  return (
    <>
      <div
        className={`${raleway.variable} min-h-screen w-full bg-primary-gray p-2 font-sans text-black-primary lg:p-6`}
      >
        <div className="mx-auto max-w-2xl pt-4">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </div>
      <SpeedInsights />
    </>
  );
};

export default MainLayout;
