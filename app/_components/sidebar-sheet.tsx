"use client";

import { CalendarIcon, HomeIcon, LogInIcon } from "lucide-react";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import Link from "next/link";
import { Button } from "./ui/button";

const SidebarSheet = () => {
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        {/* [WHITE-LABEL] Título do menu lateral */}
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {/* Seção de login — será substituída pelo perfil do usuário após autenticação */}
      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        <h2 className="font-bold">Olá, faça seu login!</h2>
        <Button size="icon">
          <LogInIcon />
        </Button>
      </div>

      {/*
       * [WHITE-LABEL] Itens de navegação
       * Adicione, remova ou renomeie os links conforme as páginas do cliente
       * Para adicionar: copie um <Button> e ajuste href e ícone (https://lucide.dev)
       */}
      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>
        <Button className="justify-start gap-2" variant="ghost" asChild>
          <Link href="/agendamentos">
            <CalendarIcon size={18} />
            Agendamentos
          </Link>
        </Button>
      </div>
    </SheetContent>
  );
};

export default SidebarSheet;
