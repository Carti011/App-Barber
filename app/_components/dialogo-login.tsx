"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import Image from "next/image";

const DialogoLogin = () => {
  const handleLoginComGoogleClick = () => signIn("google");

  return (
    <>
      <DialogHeader>
        {/* [WHITE-LABEL] Título e descrição do diálogo de login */}
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta do Google.
        </DialogDescription>
      </DialogHeader>

      {/* [WHITE-LABEL] Adicione outros provedores OAuth aqui se necessário */}
      <Button
        variant="outline"
        className="gap-1 font-bold"
        onClick={handleLoginComGoogleClick}
      >
        <Image
          alt="Entrar com Google"
          src="/google.svg"
          width={18}
          height={18}
        />
        Google
      </Button>
    </>
  );
};

export default DialogoLogin;
