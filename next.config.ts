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
        protocol: "https",
        hostname: "utfs.io", // UploadThing — usado nas imagens do seed de desenvolvimento
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // fotos de perfil do Google OAuth
      },
    ],
  },
};

export default nextConfig;
