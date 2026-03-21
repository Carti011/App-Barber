import type { Metadata } from "next";
// [WHITE-LABEL] Fonte do projeto — troque "Geist" por outra de https://fonts.google.com/
// Para trocar: importe a nova fonte aqui e substitua `geist` abaixo
import { Geist } from "next/font/google";
import "./globals.css";

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
      <body className={`${geist.className} h-full`}>
        <div className="flex h-full flex-col">
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
