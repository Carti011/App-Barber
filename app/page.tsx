import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import Image from "next/image";
import { db } from "./_lib/prisma";
import BarbeariaItem from "./_components/barbearia-item";
import { opcoesBuscaRapida } from "./_constants/busca";
import AgendamentoItem from "./_components/agendamento-item";
import Busca from "./_components/busca";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { opcoesAuth } from "./_lib/autenticacao";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Home = async () => {
  const sessao = await getServerSession(opcoesAuth);
  const barbearias = await db.barbearia.findMany({});
  const barbeariasPopulares = await db.barbearia.findMany({
    orderBy: { nome: "desc" },
  });
  const agendamentosConfirmados = sessao?.user
    ? await db.agendamento.findMany({
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
      })
    : [];

  const agendamentosSerializados = agendamentosConfirmados.map((a) => ({
    ...a,
    servico: { ...a.servico, preco: Number(a.servico.preco) },
  }));

  return (
    <div>
      {/* ── HEADER ── */}
      <Header />

      {/*
       * [WHITE-LABEL] Padding geral do conteúdo da página
       * Ajuste p-5 para aumentar/diminuir o espaço nas bordas
       */}
      <div className="p-5">
        {/* ── SAUDAÇÃO ── */}
        {/* [WHITE-LABEL] Texto de boas-vindas — "bem vindo" quando não logado */}
        <h2 className="text-xl font-bold">
          Olá, {sessao?.user ? sessao.user.name : "bem vindo"}!
        </h2>
        <p>
          <span className="capitalize">
            {format(new Date(), "EEEE, dd", { locale: ptBR })}
          </span>
          <span>&nbsp;de&nbsp;</span>
          <span className="capitalize">
            {format(new Date(), "MMMM", { locale: ptBR })}
          </span>
        </p>

        {/* ── BUSCA ── */}
        <div className="mt-6">
          <Busca />
        </div>

        {/* ── BUSCA RÁPIDA ──
         * Ícones e categorias definidos em app/_constants/busca.ts
         * [WHITE-LABEL] Para adicionar/remover categorias, edite esse arquivo
         */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {opcoesBuscaRapida.map((opcao) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={opcao.titulo}
              asChild
            >
              <Link href={`/barbearias?servico=${opcao.titulo}`}>
                <Image
                  src={opcao.imageUrl}
                  width={16}
                  height={16}
                  alt={opcao.titulo}
                />
                {opcao.titulo}
              </Link>
            </Button>
          ))}
        </div>

        {/* ── BANNER PRINCIPAL ──
         * [WHITE-LABEL] Troque /banner-01.png em public/ pela imagem do cliente
         * Altura mobile: h-37.5 (150px) | Altura desktop: md:h-75 (300px)
         * Para ajustar a altura, altere os valores de h-* e md:h-*
         */}
        <div className="relative mt-6 h-37.5 w-full md:h-75">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* ── AGENDAMENTOS ──
         * [WHITE-LABEL] Título da seção de agendamentos
         */}
        {agendamentosConfirmados.length > 0 && (
          <>
            <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
              Agendamentos
            </h2>
            <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {agendamentosSerializados.map((agendamento) => (
                <AgendamentoItem
                  key={agendamento.id}
                  agendamento={agendamento}
                />
              ))}
            </div>
          </>
        )}

        {/* ── BARBEARIAS RECOMENDADAS ──
         * [WHITE-LABEL] Título da seção — altere o texto abaixo
         */}
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {barbearias.map((barbearia) => (
            <BarbeariaItem key={barbearia.id} barbearia={barbearia} />
          ))}
        </div>

        {/* ── BARBEARIAS POPULARES ──
         * [WHITE-LABEL] Título da seção — altere o texto abaixo
         */}
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Populares
        </h2>
        <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {barbeariasPopulares.map((barbearia) => (
            <BarbeariaItem key={barbearia.id} barbearia={barbearia} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
