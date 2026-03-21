"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "./ui/sheet";
import SidebarSheet from "./sidebar-sheet";
import Link from "next/link";

const Header = () => {
  return (
    // [WHITE-LABEL] Fundo e borda do header vêm de --card e --border em globals.css
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Link href="/">
          {/*
           * [WHITE-LABEL] Logo do cliente
           * Substitua /logo.png em public/ pela logo do cliente
           * width/height: ajuste conforme as proporções da logo (atual: 120x18px)
           */}
          <Image alt="FSW Barber" src="/logo.png" height={18} width={120} />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            {/* [WHITE-LABEL] Botão de menu — variant="outline" usa as cores de --border e --background */}
            <Button size="icon" variant="outline">
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
