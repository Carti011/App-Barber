import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Barbearia, Servico } from "@/app/generated/prisma/client";
import { Card, CardContent } from "./ui/card";

interface ResumoAgendamentoProps {
  servico: Pick<Servico, "nome"> & { preco: number | string };
  barbearia: Pick<Barbearia, "nome">;
  dataSelecionada: Date;
}

const ResumoAgendamento = ({
  servico,
  barbearia,
  dataSelecionada,
}: ResumoAgendamentoProps) => {
  return (
    <Card>
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">{servico.nome}</h2>
          <p className="text-sm font-bold">
            {/* [WHITE-LABEL] Formato de moeda — altere "BRL" para a moeda do cliente */}
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(servico.preco))}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Data</h2>
          <p className="text-sm">
            {format(dataSelecionada, "d 'de' MMMM", { locale: ptBR })}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Horário</h2>
          <p className="text-sm">{format(dataSelecionada, "HH:mm")}</p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Barbearia</h2>
          <p className="text-sm">{barbearia.nome}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumoAgendamento;
