import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import Image from "next/image";
import { db } from "./_lib/prisma";
import BarbeariaItem from "./_components/barbearia-item";
import { opcoesBuscaRapida } from "./_constants/busca";
import AgendamentoItem from "./_components/agendamento-item";
import Busca from "./_components/busca";
import CarrosselBarbearias from "./_components/carrossel-barbearias";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { opcoesAuth } from "./_lib/autenticacao";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { obterAgendamentosConfirmados } from "./_data/obter-agendamentos-confirmados";

const Home = async () => {
  const sessao = await getServerSession(opcoesAuth);
  const barbearias = await db.barbearia.findMany({ take: 3 });
  const barbeariasPopulares = await db.barbearia.findMany({
    orderBy: { nome: "desc" },
  });
  const barbeariaMaisVisitadas = await db.barbearia.findMany({
    orderBy: { nome: "asc" },
  });
  const confirmados = await obterAgendamentosConfirmados();

  const agendamentosSerializados = confirmados.map((a) => ({
    ...a,
    servico: { ...a.servico, preco: Number(a.servico.preco) },
  }));

  return (
    <div>
      {/* ── HEADER ── */}
      <Header />

      {/* ══════════════════════════════════════════
       *  SEÇÃO HERO — imagem de fundo apenas no desktop
       *  [WHITE-LABEL] Troque a URL da imagem abaixo pela do cliente
       * ══════════════════════════════════════════ */}
      <div className="relative overflow-hidden">
        {/* Imagem de fundo — visível apenas em md+ */}
        <div className="absolute inset-0 hidden md:block">
          <Image
            /*
             * [WHITE-LABEL] Imagem de fundo da seção hero no desktop
             * Substitua pela URL ou caminho da imagem do cliente
             */
            src="/hero-bg.jpg"
            fill
            className="object-cover object-center"
            alt=""
            priority
          />
          {/* Overlay escuro para garantir legibilidade do conteúdo */}
          <div className="bg-background/70 absolute inset-0" />
          {/* Gradiente na base para transição suave com a seção seguinte */}
          <div className="from-background absolute right-0 bottom-0 left-0 h-24 bg-linear-to-t to-transparent" />
        </div>

        {/* Conteúdo do hero */}
        <div className="relative z-10 p-5 md:px-16 md:py-14 lg:px-32">
          {/* ── GRID DESKTOP: SAUDAÇÃO + BUSCA (esq) | RECOMENDADOS (dir) ── */}
          <div className="md:grid md:grid-cols-[2fr_3fr] md:items-start md:gap-12">
            {/* ── COLUNA ESQUERDA ── */}
            <div>
              {/* [WHITE-LABEL] Texto de boas-vindas — exibido quando não logado */}
              <h2 className="text-xl font-bold">
                Olá,{" "}
                <span className="font-bold">
                  {sessao?.user ? sessao.user.name : "Faça seu login!"}
                </span>
              </h2>
              <p className="text-sm text-gray-400">
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

              {/* ── BUSCA RÁPIDA — apenas mobile ──
               * Ícones e categorias definidos em app/_constants/busca.ts
               * [WHITE-LABEL] Para adicionar/remover categorias, edite esse arquivo
               */}
              <div className="mt-6 flex gap-3 overflow-x-scroll md:hidden [&::-webkit-scrollbar]:hidden">
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

              {/* ── BANNER PRINCIPAL — apenas mobile ──
               * [WHITE-LABEL] Troque /banner-01.png em public/ pela imagem do cliente
               */}
              <div className="relative mt-6 h-37.5 w-full md:hidden">
                <Image
                  alt="Agende nos melhores com FSW Barber"
                  src="/banner-01.png"
                  fill
                  className="rounded-xl object-cover"
                />
              </div>

              {/* ── AGENDAMENTOS ── */}
              {agendamentosSerializados.length > 0 && (
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
            </div>

            {/* ── COLUNA DIREITA: RECOMENDADOS ──
             * [WHITE-LABEL] Título da seção — altere o texto abaixo
             */}
            <div className="mt-6 md:mt-0">
              <h2 className="mb-3 text-xs font-bold text-gray-400 uppercase">
                Recomendados
              </h2>
              <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {barbearias.map((barbearia) => (
                  <BarbeariaItem key={barbearia.id} barbearia={barbearia} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
       *  SEÇÃO PRINCIPAL — fundo padrão
       * ══════════════════════════════════════════ */}
      <div className="p-5 md:px-16 md:pb-10 lg:px-32">
        {/* ── BARBEARIAS POPULARES ──
         * [WHITE-LABEL] Título da seção — altere o texto abaixo
         */}
        <h2 className="md:text-foreground mt-6 mb-3 text-xs font-bold text-gray-400 uppercase md:mt-8 md:mb-4 md:text-xl md:normal-case">
          Populares
        </h2>
        <CarrosselBarbearias>
          {barbeariasPopulares.map((barbearia) => (
            <BarbeariaItem key={barbearia.id} barbearia={barbearia} />
          ))}
        </CarrosselBarbearias>

        {/* ── BARBEARIAS MAIS VISITADAS ──
         * [WHITE-LABEL] Título da seção — altere o texto abaixo
         */}
        <h2 className="md:text-foreground mt-6 mb-3 text-xs font-bold text-gray-400 uppercase md:mt-10 md:mb-4 md:text-xl md:normal-case">
          Mais Visitados
        </h2>
        <CarrosselBarbearias>
          {barbeariaMaisVisitadas.map((barbearia) => (
            <BarbeariaItem key={barbearia.id} barbearia={barbearia} />
          ))}
        </CarrosselBarbearias>
      </div>
    </div>
  );
};

export default Home;
