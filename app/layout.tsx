import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PokemonCacheProvider } from "@/contexts/PokemonCacheContext";

export const metadata: Metadata = {
  title: "Pokémon Explorer | Browse and Discover Pokémon",
  description: "Explore the world of Pokémon with our interactive browser. Search, discover, and learn about your favorite Pokémon using the PokéAPI.",
  keywords: ["pokemon", "pokedex", "pokemon explorer", "pokemon browser", "pokeapi"],
  authors: [{ name: "Pokémon Explorer" }],
  openGraph: {
    title: "Pokémon Explorer",
    description: "Browse and explore Pokémon using the PokéAPI",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#3B4CCA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased">
        <PokemonCacheProvider>
          {children}
        </PokemonCacheProvider>
      </body>
    </html>
  );
}
