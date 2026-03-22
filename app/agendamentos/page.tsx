import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import { opcoesAuth } from "../_lib/autenticacao";
import { notFound } from "next/navigation";
import AgendamentoItem from "../_components/agendamento-item";

const AgendamentosPage = async () => {
  const sessao = await getServerSession(opcoesAuth);
  if (!sessao?.user) {
    return notFound();
  }

  const agendamentosConfirmados = await db.agendamento.findMany({
    where: {
      usuarioId: (sessao.user as { id: string }).id,
      data: { gte: new Date() },
    },
    include: {
      servico: {
        include: { barbearia: true },
      },
    },
    orderBy: { data: "asc" },
  });

  const agendamentosFinalizados = await db.agendamento.findMany({
    where: {
      usuarioId: (sessao.user as { id: string }).id,
      data: { lt: new Date() },
    },
    include: {
      servico: {
        include: { barbearia: true },
      },
    },
    orderBy: { data: "asc" },
  });

  const confirmadosSerializados = agendamentosConfirmados.map((a) => ({
    ...a,
    servico: { ...a.servico, preco: Number(a.servico.preco) },
  }));

  const finalizadosSerializados = agendamentosFinalizados.map((a) => ({
    ...a,
    servico: { ...a.servico, preco: Number(a.servico.preco) },
  }));

  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        {/* [WHITE-LABEL] Título da página de agendamentos */}
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {confirmadosSerializados.length > 0 && (
          <>
            <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
              Confirmados
            </h2>
            {confirmadosSerializados.map((agendamento) => (
              <AgendamentoItem key={agendamento.id} agendamento={agendamento} />
            ))}
          </>
        )}

        {finalizadosSerializados.length > 0 && (
          <>
            <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
              Finalizados
            </h2>
            {finalizadosSerializados.map((agendamento) => (
              <AgendamentoItem key={agendamento.id} agendamento={agendamento} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default AgendamentosPage;
