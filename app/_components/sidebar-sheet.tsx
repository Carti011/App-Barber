"use client";

import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { opcoesBuscaRapida } from "../_constants/busca";
import Link from "next/link";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DialogoLogin from "./dialogo-login";

const SidebarSheet = () => {
  const { data } = useSession();
  const handleLogoutClick = () => signOut();

  return (
    // [WHITE-LABEL] Padding horizontal: px-4 mobile | md:px-6 desktop
    <SheetContent className="overflow-y-auto px-4 md:px-6">
      <SheetHeader className="px-0">
        {/* [WHITE-LABEL] Título do menu lateral */}
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {/* ── PERFIL / LOGIN ── */}
      <div className="border-b border-solid py-5">
        {data?.user ? (
          <div className="flex items-center gap-3">
            {/*
             * [WHITE-LABEL] Avatar com borda na cor --primary
             * Mobile: h-10 w-10 | Desktop: md:h-14 md:w-14
             */}
            <Avatar className="ring-primary ring-offset-background h-10 w-10 ring-2 ring-offset-2 md:h-14 md:w-14">
              <AvatarImage src={data.user.image ?? ""} />
              <AvatarFallback>{data.user.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              {/* [WHITE-LABEL] Nome e e-mail do usuário logado */}
              <p className="truncate font-bold md:text-lg">{data.user.name}</p>
              <p className="truncate text-xs text-gray-400 md:text-sm">
                {data.user.email}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <DialogoLogin />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>

      {/* ── NAVEGAÇÃO ── */}
      <div className="flex flex-col gap-1 border-b border-solid py-4">
        <SheetClose asChild>
          {/*
           * [WHITE-LABEL] "Início" com destaque visual (variant default = cor --primary)
           * Troque para variant="ghost" para remover o destaque
           */}
          <Button
            className="justify-start gap-2 text-sm md:gap-3 md:text-base"
            asChild
          >
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>

        <SheetClose asChild>
          <Button
            className="justify-start gap-2 text-sm md:gap-3 md:text-base"
            variant="ghost"
            asChild
          >
            <Link href="/agendamentos">
              <CalendarIcon size={18} />
              Agendamentos
            </Link>
          </Button>
        </SheetClose>
      </div>

      {/* ── CATEGORIAS ── */}
      <div className="flex flex-col gap-1 border-b border-solid py-4">
        {opcoesBuscaRapida.map((opcao) => (
          <SheetClose key={opcao.titulo} asChild>
            <Button
              className="justify-start gap-2 text-sm md:gap-3 md:text-base"
              variant="ghost"
              asChild
            >
              <Link href={`/barbearias?servico=${opcao.titulo}`}>
                {/* [WHITE-LABEL] Ícone da categoria — troque a imagem em _constants/busca.ts */}
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
      <div className="py-4">
        {data?.user && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="justify-start gap-2 text-sm md:gap-3 md:text-base"
              >
                <LogOutIcon size={18} />
                Sair da conta
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90%] max-w-sm overflow-hidden p-0">
              <div className="px-8 pt-8 pb-6 text-center">
                <DialogHeader className="space-y-3">
                  <DialogTitle className="text-xl font-bold">Sair</DialogTitle>
                  <DialogDescription className="text-sm text-gray-400">
                    Deseja mesmo sair da plataforma?
                  </DialogDescription>
                </DialogHeader>
              </div>
              <DialogFooter className="bg-secondary flex flex-row gap-3 px-8 py-5">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="w-full rounded-full text-base font-bold"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    variant="destructive"
                    className="w-full rounded-full text-base font-bold"
                    onClick={handleLogoutClick}
                  >
                    Sair
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </SheetContent>
  );
};

export default SidebarSheet;
