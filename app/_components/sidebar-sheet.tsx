import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon } from "lucide-react";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { opcoesBuscaRapida } from "../_constants/busca";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import Image from "next/image";

const SidebarSheet = () => {
  return (
    <SheetContent className="overflow-y-auto">
      {/* [WHITE-LABEL] Título do menu lateral */}
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {/* ── PERFIL ──
       * Placeholder estático — será substituído pelo perfil real após autenticação
       */}
      <div className="flex items-center gap-3 border-b border-solid py-5">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </Avatar>
        <div>
          {/* [WHITE-LABEL] Nome e e-mail substituídos pelos dados reais do usuário logado */}
          <p className="font-bold">Felipe Rocha</p>
          <p className="text-xs">felipe@fullstackclub.io</p>
        </div>
      </div>

      {/* ── NAVEGAÇÃO ──
       * [WHITE-LABEL] Adicione, remova ou renomeie links conforme as páginas do cliente
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
        <Button className="justify-start gap-2" variant="ghost">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      {/* ── CATEGORIAS ── */}
      <div className="flex flex-col gap-2 border-b border-solid py-5">
        {opcoesBuscaRapida.map((opcao) => (
          <Button
            key={opcao.titulo}
            className="justify-start gap-2"
            variant="ghost"
          >
            <Image
              alt={opcao.titulo}
              src={opcao.imageUrl}
              height={18}
              width={18}
            />
            {opcao.titulo}
          </Button>
        ))}
      </div>

      {/* ── CONTA ── */}
      <div className="flex flex-col gap-2 py-5">
        <Button variant="ghost" className="justify-start gap-2">
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  );
};

export default SidebarSheet;
