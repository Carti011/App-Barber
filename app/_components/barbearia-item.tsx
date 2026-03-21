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
    <Card className="min-w-[167px] rounded-2xl">
      <CardContent className="p-0 px-1 pt-1">
        {/* IMAGEM */}
        <div className="relative h-[159px] w-full">
          <Image
            alt={barbearia.nome}
            fill
            className="rounded-2xl object-cover"
            src={barbearia.imageUrl}
          />

          <Badge
            className="absolute top-2 left-2 space-x-1"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>

        {/* TEXTO */}
        <div className="px-1 py-3">
          <h3 className="truncate font-semibold">{barbearia.nome}</h3>
          <p className="truncate text-sm text-gray-400">{barbearia.endereco}</p>
          <Button variant="secondary" className="mt-3 w-full" asChild>
            <Link href={`/barbearias/${barbearia.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbeariaItem;
