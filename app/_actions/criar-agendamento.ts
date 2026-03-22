"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { opcoesAuth } from "../_lib/autenticacao";
import { db } from "../_lib/prisma";

interface CriarAgendamentoParams {
  servicoId: string;
  data: Date;
}

export const criarAgendamento = async (params: CriarAgendamentoParams) => {
  const sessao = await getServerSession(opcoesAuth);
  if (!sessao) {
    throw new Error("Usuário não autenticado");
  }
  await db.agendamento.create({
    data: {
      servicoId: params.servicoId,
      data: params.data,
      usuarioId: (sessao.user as { id: string }).id,
    },
  });
  revalidatePath("/barbearias/[id]");
  revalidatePath("/agendamentos");
};
