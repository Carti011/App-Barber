"use client";

import { Agendamento, Barbearia, Servico } from "@/app/generated/prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
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
import TelefoneItem from "./telefone-item";
import ResumoAgendamento from "./resumo-agendamento";
import { cancelarAgendamento } from "../_actions/cancelar-agendamento";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

type AgendamentoPlano = Omit<Agendamento, never> & {
  servico: Omit<Servico, "preco"> & {
    preco: number | string;
    barbearia: Barbearia;
  };
};

interface AgendamentosDesktopProps {
  confirmados: AgendamentoPlano[];
  finalizados: AgendamentoPlano[];
}

const AgendamentosDesktop = ({
  confirmados,
  finalizados,
}: AgendamentosDesktopProps) => {
  const todos = [...confirmados, ...finalizados];
  const [selecionado, setSelecionado] = useState<AgendamentoPlano | null>(
    todos[0] ?? null,
  );

  const confirmado = selecionado ? isFuture(selecionado.data) : false;

  const handleCancelar = async () => {
    if (!selecionado) return;
    try {
      await cancelarAgendamento(selecionado.id);
      toast.success("Reserva cancelada com sucesso!");
    } catch {
      toast.error("Erro ao cancelar reserva. Tente novamente.");
    }
  };

  return (
    <div className="hidden gap-8 px-16 py-8 md:flex lg:px-32">
      {/* ── COLUNA ESQUERDA: lista de agendamentos ── */}
      <div className="flex-1 space-y-6">
        {/* [WHITE-LABEL] Título da página */}
        <h1 className="text-2xl font-bold">Agendamentos</h1>

        {confirmados.length === 0 && finalizados.length === 0 && (
          <p className="text-gray-400">Você não tem agendamentos.</p>
        )}

        {confirmados.length > 0 && (
          <div className="space-y-3">
            {/* [WHITE-LABEL] Label da seção de confirmados */}
            <h2 className="text-xs font-bold text-gray-400 uppercase">
              Confirmados
            </h2>
            {confirmados.map((a) => (
              <CartaoAgendamento
                key={a.id}
                agendamento={a}
                selecionado={selecionado?.id === a.id}
                onSelect={() => setSelecionado(a)}
              />
            ))}
          </div>
        )}

        {finalizados.length > 0 && (
          <div className="space-y-3">
            {/* [WHITE-LABEL] Label da seção de finalizados */}
            <h2 className="text-xs font-bold text-gray-400 uppercase">
              Finalizados
            </h2>
            {finalizados.map((a) => (
              <CartaoAgendamento
                key={a.id}
                agendamento={a}
                selecionado={selecionado?.id === a.id}
                onSelect={() => setSelecionado(a)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── COLUNA DIREITA: detalhe do agendamento selecionado ── */}
      {selecionado && (
        <div className="w-96 shrink-0 space-y-6">
          {/* ── MAPA ──
           * [WHITE-LABEL] Substituir /map.png pelo Google Maps Static API quando disponível
           */}
          <Card className="overflow-hidden">
            <div className="relative h-44 w-full">
              <Image
                src="/map.png"
                fill
                className="rounded-t-xl object-cover"
                alt="Mapa"
              />
              <div className="bg-card/90 absolute right-0 bottom-0 left-0 flex items-center gap-3 rounded-b-xl p-3">
                <Avatar>
                  <AvatarImage src={selecionado.servico.barbearia.imageUrl} />
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">
                    {selecionado.servico.barbearia.nome}
                  </p>
                  <p className="truncate text-xs text-gray-400">
                    {selecionado.servico.barbearia.endereco}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* ── SOBRE NÓS ── */}
          {selecionado.servico.barbearia.descricao && (
            <div>
              {/* [WHITE-LABEL] Título da seção sobre a barbearia */}
              <h2 className="mb-3 text-xs font-bold text-gray-400 uppercase">
                Sobre nós
              </h2>
              <p className="text-sm leading-relaxed">
                {selecionado.servico.barbearia.descricao}
              </p>
            </div>
          )}

          {/* ── TELEFONES ── */}
          <div className="space-y-3">
            {selecionado.servico.barbearia.telefones.map((t, i) => (
              <TelefoneItem key={i} telefone={t} />
            ))}
          </div>

          {/* ── RESUMO DO AGENDAMENTO ── */}
          <div className="space-y-3">
            <Badge variant={confirmado ? "default" : "secondary"}>
              {confirmado ? "Confirmado" : "Finalizado"}
            </Badge>
            <ResumoAgendamento
              servico={selecionado.servico}
              barbearia={selecionado.servico.barbearia}
              dataSelecionada={selecionado.data}
            />
          </div>

          {/* ── CANCELAR — apenas se confirmado ── */}
          {confirmado && (
            <Dialog>
              <DialogTrigger asChild>
                {/* [WHITE-LABEL] Texto e cor do botão de cancelamento */}
                <Button variant="destructive" className="w-full">
                  Cancelar Reserva
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%] max-w-sm overflow-hidden p-0">
                <div className="px-8 pt-8 pb-6 text-center">
                  <DialogHeader className="space-y-3">
                    {/* [WHITE-LABEL] Título do dialog de cancelamento */}
                    <DialogTitle className="text-xl font-bold">
                      Cancelar Reserva
                    </DialogTitle>
                    {/* [WHITE-LABEL] Descrição do dialog de cancelamento */}
                    <DialogDescription className="text-sm text-gray-400">
                      Tem certeza que deseja cancelar esse agendamento?
                    </DialogDescription>
                  </DialogHeader>
                </div>
                <DialogFooter className="bg-secondary flex flex-row gap-3 px-8 py-5">
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="w-full rounded-full text-base font-bold"
                    >
                      Voltar
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      className="w-full rounded-full text-base font-bold"
                      onClick={handleCancelar}
                    >
                      Confirmar
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}
    </div>
  );
};

// ── Card clicável da lista (coluna esquerda) ──
const CartaoAgendamento = ({
  agendamento,
  selecionado,
  onSelect,
}: {
  agendamento: AgendamentoPlano;
  selecionado: boolean;
  onSelect: () => void;
}) => {
  const confirmado = isFuture(agendamento.data);

  return (
    <Card
      className={`cursor-pointer transition-all ${selecionado ? "ring-primary ring-1" : ""}`}
      onClick={onSelect}
    >
      <CardContent className="flex justify-between p-0">
        {/* Esquerda */}
        <div className="flex flex-col gap-2 py-5 pl-5">
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

        {/* Direita: data */}
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
  );
};

export default AgendamentosDesktop;
