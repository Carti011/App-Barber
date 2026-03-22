import BarbeariaItem from "../_components/barbearia-item";
import Header from "../_components/header";
import Busca from "../_components/busca";
import { db } from "../_lib/prisma";

interface Props {
  searchParams: Promise<{ titulo?: string; servico?: string }>;
}

const BarbeariasBuscaPage = async ({ searchParams }: Props) => {
  const { titulo, servico } = await searchParams;

  const barbearias = await db.barbearia.findMany({
    where: {
      OR: [
        titulo
          ? {
              nome: {
                contains: titulo,
                mode: "insensitive",
              },
            }
          : {},
        servico
          ? {
              servicos: {
                some: {
                  nome: {
                    contains: servico,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  });

  return (
    <div>
      <Header />
      <div className="my-6 px-5">
        <Busca />
      </div>
      <div className="px-5">
        {/* [WHITE-LABEL] Título da seção de resultados */}
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Resultados para &quot;{titulo || servico}&quot;
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {barbearias.map((barbearia) => (
            <BarbeariaItem key={barbearia.id} barbearia={barbearia} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarbeariasBuscaPage;
