"use client";

import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { opcoesBuscaRapida } from "../_constants/busca";
import Link from "next/link";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";

const SidebarSheet = () => {
  const { data } = useSession();
  const handleLoginComGoogleClick = () => signIn("google");
  const handleLogoutClick = () => signOut();

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        {/* [WHITE-LABEL] Título do menu lateral */}
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {/* ── PERFIL / LOGIN ── */}
      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data.user.image ?? ""} />
            </Avatar>
            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="text-xs">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <DialogHeader>
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
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      {/* ── NAVEGAÇÃO ── */}
      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>
        <Button className="justify-start gap-2" variant="ghost">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      {/* ── CATEGORIAS ── */}
      <div className="flex flex-col gap-2 border-b border-solid py-5">
        {opcoesBuscaRapida.map((opcao) => (
          <SheetClose key={opcao.titulo} asChild>
            <Button className="justify-start gap-2" variant="ghost" asChild>
              <Link href={`/barbearias?servico=${opcao.titulo}`}>
                <Image
                  alt={opcao.titulo}
                  src={opcao.imageUrl}
                  height={18}
                  width={18}
                />
                {opcao.titulo}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>

      {/* ── CONTA ── */}
      <div className="flex flex-col gap-2 py-5">
        {data?.user && (
          <Button
            variant="ghost"
            className="justify-start gap-2"
            onClick={handleLogoutClick}
          >
            <LogOutIcon size={18} />
            Sair da conta
          </Button>
        )}
      </div>
    </SheetContent>
  );
};

export default SidebarSheet;
