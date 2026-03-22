"use server";

import { endOfDay, startOfDay } from "date-fns";
import { db } from "../_lib/prisma";

interface ObterAgendamentosParams {
  servicoId: string;
  data: Date;
}

export const obterAgendamentos = async ({ data }: ObterAgendamentosParams) => {
  return db.agendamento.findMany({
    where: {
      data: {
        lte: endOfDay(data),
        gte: startOfDay(data),
      },
    },
  });
};
