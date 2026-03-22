"use client";

import { Agendamento, Barbearia, Servico } from "@/app/generated/prisma/client";

// Versão serializável para passar de Server para Client Component
type AgendamentoPlano = Omit<Agendamento, never> & {
  servico: Omit<Servico, "preco"> & {
    preco: number | string;
    barbearia: Barbearia;
  };
};
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import TelefoneItem from "./telefone-item";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DialogClose } from "@/app/_components/ui/dialog";
import { cancelarAgendamento } from "../_actions/cancelar-agendamento";
import { toast } from "sonner";
import { useState } from "react";

interface AgendamentoItemProps {
  agendamento: AgendamentoPlano;
}

const AgendamentoItem = ({ agendamento }: AgendamentoItemProps) => {
  const [sheetAberto, setSheetAberto] = useState(false);
  const {
    servico: { barbearia },
  } = agendamento;
  const confirmado = isFuture(agendamento.data);

  const handleCancelarAgendamento = async () => {
    try {
      await cancelarAgendamento(agendamento.id);
      setSheetAberto(false);
      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cancelar reserva. Tente novamente.");
    }
  };

  const handleSheetOpenChange = (aberto: boolean) => {
    setSheetAberto(aberto);
  };

  return (
    <Sheet open={sheetAberto} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full min-w-[90%]">
        <Card>
          <CardContent className="flex justify-between p-0">
            {/* ── ESQUERDA: status, serviço e barbearia ── */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              {/* [WHITE-LABEL] Cor do badge — vem de --primary em globals.css */}
              <Badge
                className="w-fit"
                variant={confirmado ? "default" : "secondary"}
              >
                {confirmado ? "Confirmado" : "Finalizado"}
              </Badge>
              <h3 className="font-semibold">{agendamento.servico.nome}</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={agendamento.servico.barbearia.imageUrl} />
                </Avatar>
                <p className="text-sm">{agendamento.servico.barbearia.nome}</p>
              </div>
            </div>

            {/* ── DIREITA: data e horário ──
             * [WHITE-LABEL] A borda esquerda divide as duas colunas
             * Ajuste border-l-2 para border-l ou border-l-4
             */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {format(agendamento.data, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(agendamento.data, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(agendamento.data, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="w-[85%]">
        <SheetHeader>
          <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
        </SheetHeader>

        {/* ── MAPA ── */}
        <div className="relative mt-6 flex h-45 w-full items-end">
          <Image
            alt={`Mapa da barbearia ${barbearia.nome}`}
            src="/map.png"
            fill
            className="rounded-xl object-cover"
          />
          <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={barbearia.imageUrl} />
              </Avatar>
              <div>
                <h3 className="font-bold">{barbearia.nome}</h3>
                <p className="text-xs">{barbearia.endereco}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── RESUMO ── */}
        <div className="mt-6">
          <Badge
            className="w-fit"
            variant={confirmado ? "default" : "secondary"}
          >
            {confirmado ? "Confirmado" : "Finalizado"}
          </Badge>

          <Card className="mt-3 mb-6">
            <CardContent className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{agendamento.servico.nome}</h2>
                <p className="text-sm font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(agendamento.servico.preco))}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Data</h2>
                <p className="text-sm">
                  {format(agendamento.data, "d 'de' MMMM", { locale: ptBR })}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Horário</h2>
                <p className="text-sm">
                  {format(agendamento.data, "HH:mm", { locale: ptBR })}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Barbearia</h2>
                <p className="text-sm">{barbearia.nome}</p>
              </div>
            </CardContent>
          </Card>

          {/* ── TELEFONES ── */}
          <div className="space-y-3">
            {barbearia.telefones.map((telefone: string, index: number) => (
              <TelefoneItem key={index} telefone={telefone} />
            ))}
          </div>
        </div>

        <SheetFooter className="mt-6">
          <div className="flex items-center gap-3">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Voltar
              </Button>
            </SheetClose>
            {confirmado && (
              <Dialog>
                <DialogTrigger className="w-full">
                  <Button variant="destructive" className="w-full">
                    Cancelar Reserva
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90%]">
                  <DialogHeader>
                    <DialogTitle>Você deseja cancelar sua reserva?</DialogTitle>
                    <DialogDescription>
                      Ao cancelar, você perderá sua reserva e não poderá
                      recuperá-la. Essa ação é irreversível.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flex-row gap-3">
                    <DialogClose asChild>
                      <Button variant="secondary" className="w-full">
                        Voltar
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant="destructive"
                        onClick={handleCancelarAgendamento}
                        className="w-full"
                      >
                        Confirmar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AgendamentoItem;
