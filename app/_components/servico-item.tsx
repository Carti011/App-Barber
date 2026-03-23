"use client";

import { Barbearia, Servico, Agendamento } from "@/app/generated/prisma/client";

// Versão serializável para passar de Server para Client Component
type ServicoPlano = Omit<Servico, "preco"> & { preco: number | string };
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Calendario } from "./ui/calendario";
import { ptBR } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import { isPast, isToday, set } from "date-fns";
import { criarAgendamento } from "../_actions/criar-agendamento";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { obterAgendamentos } from "../_actions/obter-agendamentos";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import DialogoLogin from "./dialogo-login";
import ResumoAgendamento from "./resumo-agendamento";
import { CheckIcon } from "lucide-react";

interface ServicoItemProps {
  servico: ServicoPlano;
  barbearia: Pick<Barbearia, "nome">;
}

const LISTA_HORARIOS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

interface ObterHorariosDisponiveisParams {
  agendamentos: Agendamento[];
  diaSelecionado: Date;
}

const obterHorariosDisponiveis = ({
  agendamentos,
  diaSelecionado,
}: ObterHorariosDisponiveisParams) => {
  return LISTA_HORARIOS.filter((horario) => {
    const hora = Number(horario.split(":")[0]);
    const minutos = Number(horario.split(":")[1]);

    const horarioNoPassado = isPast(
      set(new Date(), { hours: hora, minutes: minutos }),
    );
    if (horarioNoPassado && isToday(diaSelecionado)) {
      return false;
    }

    const jaAgendado = agendamentos.some(
      (agendamento) =>
        agendamento.data.getHours() === hora &&
        agendamento.data.getMinutes() === minutos,
    );

    return !jaAgendado;
  });
};

const ServicoItem = ({ servico, barbearia }: ServicoItemProps) => {
  const [dialogoLoginAberto, setDialogoLoginAberto] = useState(false);
  const [reservaEfetuada, setReservaEfetuada] = useState(false);
  const { data } = useSession();
  const [diaSelecionado, setDiaSelecionado] = useState<Date | undefined>(
    undefined,
  );
  const [horarioSelecionado, setHorarioSelecionado] = useState<
    string | undefined
  >(undefined);
  const [agendamentosDoDia, setAgendamentosDoDia] = useState<Agendamento[]>([]);
  const [sheetAgendamentoAberto, setSheetAgendamentoAberto] = useState(false);

  useEffect(() => {
    const buscar = async () => {
      if (!diaSelecionado) return;
      const agendamentos = await obterAgendamentos({
        data: diaSelecionado,
        servicoId: servico.id,
      });
      setAgendamentosDoDia(agendamentos);
    };
    buscar();
  }, [diaSelecionado, servico.id]);

  const handleReservarClick = () => {
    if (data?.user) {
      return setSheetAgendamentoAberto(true);
    }
    return setDialogoLoginAberto(true);
  };

  const handleSheetAgendamentoChange = () => {
    setDiaSelecionado(undefined);
    setHorarioSelecionado(undefined);
    setAgendamentosDoDia([]);
    setSheetAgendamentoAberto(false);
  };

  const handleSelecionarDia = (data: Date | undefined) => {
    setDiaSelecionado(data);
  };

  const handleSelecionarHorario = (horario: string) => {
    setHorarioSelecionado(horario);
  };

  const listaHorarios = useMemo(() => {
    if (!diaSelecionado) return [];
    return obterHorariosDisponiveis({
      agendamentos: agendamentosDoDia,
      diaSelecionado,
    });
  }, [agendamentosDoDia, diaSelecionado]);

  const dataSelecionada = useMemo(() => {
    if (!diaSelecionado || !horarioSelecionado) return;
    return set(diaSelecionado, {
      hours: Number(horarioSelecionado.split(":")[0]),
      minutes: Number(horarioSelecionado.split(":")[1]),
    });
  }, [diaSelecionado, horarioSelecionado]);

  const handleConfirmarAgendamento = async () => {
    try {
      if (!dataSelecionada) return;
      await criarAgendamento({ servicoId: servico.id, data: dataSelecionada });
      handleSheetAgendamentoChange();
      setReservaEfetuada(true);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar reserva!");
    }
  };

  return (
    <>
      <Card>
        <CardContent className="flex items-center gap-3 p-3">
          {/* ── IMAGEM DO SERVIÇO ──
           * [WHITE-LABEL] Dimensões da foto do serviço no card
           * Ajuste min-h-[] e min-w-[] conforme as proporções das fotos do cliente
           */}
          <div className="relative max-h-27.5 min-h-27.5 max-w-27.5 min-w-27.5">
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

              <Sheet
                open={sheetAgendamentoAberto}
                onOpenChange={handleSheetAgendamentoChange}
              >
                {/* [WHITE-LABEL] Texto do botão de reserva do serviço */}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleReservarClick}
                >
                  Reservar
                </Button>

                <SheetContent className="overflow-y-auto md:max-w-md">
                  <SheetHeader>
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  {/* ── CALENDÁRIO ── */}
                  <div className="border-b border-solid px-5 pb-5">
                    <Calendario
                      mode="single"
                      locale={ptBR}
                      selected={diaSelecionado}
                      onSelect={handleSelecionarDia}
                      fromDate={new Date()}
                      className="w-full"
                    />
                  </div>

                  {/* ── HORÁRIOS ── */}
                  {diaSelecionado && (
                    <div className="flex gap-3 overflow-x-auto border-b border-solid px-5 pb-5 [&::-webkit-scrollbar]:hidden">
                      {listaHorarios.length > 0 ? (
                        listaHorarios.map((horario) => (
                          <Button
                            key={horario}
                            variant={
                              horarioSelecionado === horario
                                ? "default"
                                : "outline"
                            }
                            className="rounded-full"
                            onClick={() => handleSelecionarHorario(horario)}
                          >
                            {horario}
                          </Button>
                        ))
                      ) : (
                        <p className="px-5 text-xs">
                          Não há horários disponíveis para este dia.
                        </p>
                      )}
                    </div>
                  )}

                  {/* ── RESUMO DO AGENDAMENTO ── */}
                  {dataSelecionada && (
                    <div className="px-5">
                      <ResumoAgendamento
                        servico={servico}
                        barbearia={barbearia}
                        dataSelecionada={dataSelecionada}
                      />
                    </div>
                  )}

                  <SheetFooter className="px-5">
                    <Button
                      className="w-full"
                      onClick={handleConfirmarAgendamento}
                      disabled={!dataSelecionada}
                    >
                      Confirmar
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── DIÁLOGO DE LOGIN ── */}
      <Dialog
        open={dialogoLoginAberto}
        onOpenChange={(aberto) => setDialogoLoginAberto(aberto)}
      >
        <DialogContent className="w-[90%]">
          <DialogoLogin />
        </DialogContent>
      </Dialog>

      {/* ── DIÁLOGO DE SUCESSO ── */}
      {/* [WHITE-LABEL] Popup de confirmação após reserva criada */}
      <Dialog open={reservaEfetuada} onOpenChange={setReservaEfetuada}>
        <DialogContent className="w-[90%] max-w-sm overflow-hidden p-0">
          <div className="flex flex-col items-center gap-4 px-8 pt-10 pb-6 text-center">
            {/* Ícone de sucesso */}
            <div className="bg-primary flex h-20 w-20 items-center justify-center rounded-full">
              <CheckIcon className="h-10 w-10 text-black" strokeWidth={3} />
            </div>

            <DialogHeader className="space-y-2">
              {/* [WHITE-LABEL] Título do popup de sucesso */}
              <DialogTitle className="text-xl font-bold">
                Reserva Efetuada!
              </DialogTitle>
              {/* [WHITE-LABEL] Descrição do popup de sucesso */}
              <DialogDescription className="text-sm text-gray-400">
                Sua reserva foi agendada com sucesso.
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Botão em seção separada com fundo diferente */}
          <div className="bg-secondary px-8 py-5">
            <Button
              className="w-full rounded-full text-base font-bold"
              onClick={() => setReservaEfetuada(false)}
            >
              Confirmar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServicoItem;
