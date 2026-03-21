import { Barbearia } from "@/app/generated/prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import Link from "next/link";

interface BarbeariaItemProps {
  barbearia: Barbearia;
}

const BarbeariaItem = ({ barbearia }: BarbeariaItemProps) => {
  return (
    /*
     * [WHITE-LABEL] Largura mínima do card na listagem horizontal
     * Aumente min-w-[] para cards mais largos, diminua para caber mais na tela
     */
    <Card className="min-w-41.75 rounded-2xl">
      <CardContent className="p-0 px-1 pt-1">
        {/* ── IMAGEM ── */}
        {/*
         * [WHITE-LABEL] Altura da foto da barbearia no card
         * Ajuste h-[159px] conforme a proporção das fotos do cliente
         */}
        <div className="relative h-39.75 w-full">
          <Image
            alt={barbearia.nome}
            fill
            className="rounded-2xl object-cover"
            src={barbearia.imageUrl}
          />

          {/* [WHITE-LABEL] Badge de avaliação — substitua "5,0" por dado real ou remova o Badge */}
          <Badge
            className="absolute top-2 left-2 space-x-1"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>

        {/* ── TEXTO ── */}
        <div className="px-1 py-3">
          <h3 className="truncate font-semibold">{barbearia.nome}</h3>
          <p className="truncate text-sm text-gray-400">{barbearia.endereco}</p>
          {/* [WHITE-LABEL] Texto do botão de reserva */}
          <Button variant="secondary" className="mt-3 w-full" asChild>
            <Link href={`/barbearias/${barbearia.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbeariaItem;
