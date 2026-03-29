import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import LayoutShell from "@/components/LayoutShell";

export const metadata: Metadata = {
  title: "Chalamoti — Vins Géorgiens d'Exception",
  description:
    "Découvrez Chalamoti, une sélection de vins géorgiens authentiques et premium. Commandez en ligne, retirez sur place. Saperavi, Rkatsiteli, Kindzmarauli.",
  keywords: "vin géorgien, Chalamoti, Saperavi, Rkatsiteli, Kindzmarauli, vin premium, vin artisanal",
  openGraph: {
    title: "Chalamoti — Vins Géorgiens d'Exception",
    description: "Vins géorgiens authentiques, issus d'un savoir-faire millénaire.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <AuthProvider>
          <CartProvider>
            <LayoutShell>{children}</LayoutShell>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
