import { Servico } from "@/app/generated/prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ServicoItemProps {
  servico: Servico;
}

const ServicoItem = ({ servico }: ServicoItemProps) => {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        {/* ── IMAGEM DO SERVIÇO ──
         * [WHITE-LABEL] Dimensões da foto do serviço no card
         * Ajuste min-h-[] e min-w-[] conforme as proporções das fotos do cliente
         */}
        <div className="relative max-h-[110px] min-h-[110px] max-w-[110px] min-w-[110px]">
          <Image
            alt={servico.nome}
            src={servico.imageUrl ?? "/placeholder-service.png"}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        {/* ── INFORMAÇÕES ── */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">{servico.nome}</h3>
          <p className="text-sm text-gray-400">{servico.descricao}</p>

          {/* ── PREÇO E BOTÃO ── */}
          <div className="flex items-center justify-between">
            {/* [WHITE-LABEL] Formato de moeda — altere "BRL" para a moeda do cliente */}
            <p className="text-primary text-sm font-bold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(servico.preco))}
            </p>

            {/* [WHITE-LABEL] Texto do botão de reserva do serviço */}
            <Button variant="secondary" size="sm">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServicoItem;
