import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { db } from "./_lib/prisma";
import BarbeariaItem from "./_components/barbearia-item";
import { opcoesBuscaRapida } from "./_constants/busca";
import AgendamentoItem from "./_components/agendamento-item";

const Home = async () => {
  const barbearias = await db.barbearia.findMany({});
  const barbeariasPopulares = await db.barbearia.findMany({
    orderBy: {
      nome: "desc",
    },
  });

  return (
    <div>
      {/* Header */}
      <Header />

      <div className="p-5">
        {/* TEXTO */}
        <h2 className="text-xl font-bold">Olá, Felipe!</h2>
        <p>Segunda-feira, 05 de agosto.</p>

        {/* BUSCA */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* BUSCA RÁPIDA */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {opcoesBuscaRapida.map((opcao) => (
            <Button className="gap-2" variant="secondary" key={opcao.titulo}>
              <Image
                src={opcao.imageUrl}
                width={16}
                height={16}
                alt={opcao.titulo}
              />
              {opcao.titulo}
            </Button>
          ))}
        </div>

        {/* IMAGEM */}
        <div className="relative mt-6 h-[150px] w-full md:h-75">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* AGENDAMENTO */}
        <AgendamentoItem />

        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbearias.map((barbearia) => (
            <BarbeariaItem key={barbearia.id} barbearia={barbearia} />
          ))}
        </div>

        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbeariasPopulares.map((barbearia) => (
            <BarbeariaItem key={barbearia.id} barbearia={barbearia} />
          ))}
        </div>
      </div>

      <footer>
        <Card>
          <CardContent className="px-5 py-6">
            <p className="text-sm text-gray-400">
              © 2024 Copyright <span className="font-bold">FSW Barber</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  );
};

export default Home;
