"use server";

import { getServerSession } from "next-auth";
import { opcoesAuth } from "../_lib/autenticacao";
import { db } from "../_lib/prisma";

export const obterAgendamentosFinalizados = async () => {
  const sessao = await getServerSession(opcoesAuth);
  if (!sessao?.user) return [];
  return db.agendamento.findMany({
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
};
