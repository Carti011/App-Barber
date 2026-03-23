import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { opcoesAuth } from "../_lib/autenticacao";
import { notFound } from "next/navigation";
import AgendamentoItem from "../_components/agendamento-item";
import AgendamentosDesktop from "../_components/agendamentos-desktop";
import { obterAgendamentosConfirmados } from "../_data/obter-agendamentos-confirmados";
import { obterAgendamentosFinalizados } from "../_data/obter-agendamentos-finalizados";

const AgendamentosPage = async () => {
  const sessao = await getServerSession(opcoesAuth);
  if (!sessao?.user) {
    return notFound();
  }

  const confirmados = await obterAgendamentosConfirmados();
  const finalizados = await obterAgendamentosFinalizados();

  const confirmadosSerializados = confirmados.map((a) => ({
    ...a,
    servico: { ...a.servico, preco: Number(a.servico.preco) },
  }));

  const finalizadosSerializados = finalizados.map((a) => ({
    ...a,
    servico: { ...a.servico, preco: Number(a.servico.preco) },
  }));

  return (
    <>
      {/* [WHITE-LABEL] Header com busca visível no desktop */}
      <Header exibirBusca />

      {/* ── DESKTOP: layout 2 colunas ── */}
      <AgendamentosDesktop
        confirmados={confirmadosSerializados}
        finalizados={finalizadosSerializados}
      />

      {/* ── MOBILE: lista com Sheet ── */}
      <div className="space-y-3 p-5 md:hidden">
        {/* [WHITE-LABEL] Título da página de agendamentos */}
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {confirmadosSerializados.length === 0 &&
          finalizadosSerializados.length === 0 && (
            <p className="text-gray-400">Você não tem agendamentos.</p>
          )}

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
