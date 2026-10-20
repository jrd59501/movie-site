import Link from "next/link";
import { Geist } from "next/font/google";
import "./globals.css";

// Link lets us switch pages without reloading the whole site
// Geist is the font that came with create-next-app
// globals.css is where Tailwind gets loaded

const geist = Geist({
  subsets: ["latin"],
});

// sets up the font so we can use it on the page

export const metadata = {
  title: "Movie Site",
  description: "A movie site built with Contentful, GraphQL and Next.js",
};

// metadata is the title in the browser tab and the description search engines show

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <header>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/movies"> Movies</Link>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}

// the header shows on every page because it's in the layout
// {children} is whatever page you're on, so the header stays and only the page part changes