"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, MenuIcon, UserCircleIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "./ui/sheet";
import SidebarSheet from "./sidebar-sheet";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import DialogoLogin from "./dialogo-login";
import Busca from "./busca";

interface HeaderProps {
  exibirBusca?: boolean;
}

const Header = ({ exibirBusca = false }: HeaderProps) => {
  const { data } = useSession();

  return (
    // [WHITE-LABEL] Fundo e borda do header vêm de --card e --border em globals.css
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5 md:px-16 lg:px-32">
        <Link href="/">
          {/*
           * [WHITE-LABEL] Logo do cliente
           * Substitua /logo.png em public/ pela logo do cliente
           * width/height: ajuste conforme as proporções da logo (atual: 120x18px)
           */}
          <Image alt="FSW Barber" src="/logo.png" height={18} width={120} />
        </Link>

        {/* ── BUSCA CENTRAL — apenas desktop, quando exibirBusca=true ── */}
        {exibirBusca && (
          <div className="hidden flex-1 px-8 md:block">
            {/* [WHITE-LABEL] Placeholder da busca no header */}
            <Busca placeholder="Buscar Barbearias" />
          </div>
        )}

        {/* ── NAVEGAÇÃO DESKTOP ──
         * [WHITE-LABEL] Links de navegação visíveis apenas em md+
         * Agendamentos + Perfil/Avatar sempre no mesmo container → posição fixa
         */}
        <div className="hidden items-center gap-4 md:flex">
          {/* [WHITE-LABEL] Link de agendamentos — navega se logado, abre login se não */}
          {data?.user ? (
            <Button variant="ghost" className="gap-2" asChild>
              <Link href="/agendamentos">
                <CalendarIcon size={18} />
                Agendamentos
              </Link>
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <CalendarIcon size={18} />
                  Agendamentos
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <DialogoLogin />
              </DialogContent>
            </Dialog>
          )}

          {data?.user ? (
            /* Desktop (logado): avatar + nome abre o menu lateral com logout */
            <Sheet>
              <SheetTrigger asChild>
                {/*
                 * [WHITE-LABEL] Exibição do usuário logado
                 * hover:bg-accent indica visualmente que é clicável
                 */}
                <button className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={data.user.image ?? ""} />
                    <AvatarFallback>{data.user.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{data.user.name}</span>
                </button>
              </SheetTrigger>
              <SidebarSheet />
            </Sheet>
          ) : (
            /* Desktop (deslogado): botão Perfil abre dialog de login */
            <Dialog>
              <DialogTrigger asChild>
                {/* [WHITE-LABEL] Botão de login — variant default usa a cor --primary */}
                <Button className="gap-2">
                  <UserCircleIcon size={18} />
                  Perfil
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <DialogoLogin />
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* ── HAMBÚRGUER MOBILE ──
         * [WHITE-LABEL] Botão de menu — variant="outline" usa as cores de --border e --background
         */}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="md:hidden">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
