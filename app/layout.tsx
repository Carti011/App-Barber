import type { Metadata } from "next";
// [WHITE-LABEL] Fonte do projeto — troque "Geist" por outra de https://fonts.google.com/
// Para trocar: importe a nova fonte aqui e substitua `geist` abaixo
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "./_components/ui/sonner";
import Footer from "./_components/footer";
import AuthProvider from "./_providers/auth";

const geist = Geist({ subsets: ["latin"] });

// [WHITE-LABEL] Nome e descrição exibidos na aba do browser e em resultados de busca
export const metadata: Metadata = {
  title: "Withe Label - Barber Shop",
  description: "Sistema de agendamento para barbearias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // [WHITE-LABEL] Remova className="dark" para ativar tema claro por padrão
    <html lang="pt" className="dark">
      <body className={geist.className}>
        <AuthProvider>
          {children}
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
