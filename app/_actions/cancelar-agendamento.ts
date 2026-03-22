"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export const cancelarAgendamento = async (agendamentoId: string) => {
  await db.agendamento.delete({
    where: { id: agendamentoId },
  });
  revalidatePath("/agendamentos");
};
