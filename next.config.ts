import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
     * [WHITE-LABEL] Domínios de imagens externas permitidos pelo Next.js
     * Adicione aqui o domínio do serviço de storage do cliente
     * Exemplos: "res.cloudinary.com", "supabase.storage.com", "meu-bucket.s3.amazonaws.com"
     */
    remotePatterns: [
      {
        hostname: "utfs.io", // UploadThing — usado nas imagens do seed de desenvolvimento
      },
      {
        hostname: "placehold.co", // Placeholder — apenas desenvolvimento, remova em produção
      },
    ],
  },
};

export default nextConfig;
