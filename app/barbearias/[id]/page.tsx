import TelefoneItem from "@/app/_components/telefone-item";
import ServicoItem from "@/app/_components/servico-item";
import SidebarSheet from "@/app/_components/sidebar-sheet";
import Header from "@/app/_components/header";
import { Card } from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

/*
 * [WHITE-LABEL] Horários de funcionamento padrão da barbearia
 * Substitua pelos horários reais do cliente. "Fechado" exibe em vermelho.
 * Futuramente: extrair do banco quando o campo `horarios` for adicionado ao schema.
 */
const HORARIOS_PADRAO = [
  { dia: "Segunda-feira", horario: "Fechado" },
  { dia: "Terça-feira", horario: "09:00 - 21:00" },
  { dia: "Quarta-feira", horario: "09:00 - 21:00" },
  { dia: "Quinta-feira", horario: "09:00 - 21:00" },
  { dia: "Sexta-feira", horario: "09:00 - 21:00" },
  { dia: "Sábado", horario: "08:00 - 17:00" },
  { dia: "Domingo", horario: "Fechado" },
];

interface Props {
  params: Promise<{ id: string }>;
}

const BarbeariaPage = async ({ params }: Props) => {
  const { id } = await params;

  const barbearia = await db.barbearia.findUnique({
    where: { id },
    include: { servicos: true },
  });

  if (!barbearia) {
    return notFound();
  }

  const servicosSerializados = barbearia.servicos.map((s) => ({
    ...s,
    preco: Number(s.preco),
  }));

  return (
    <div>
      {/* ── HEADER — apenas desktop ── */}
      <div className="hidden md:block">
        <Header exibirBusca />
      </div>

      {/* ── LAYOUT PRINCIPAL ── */}
      <div className="md:flex md:items-start md:gap-8 md:px-16 md:py-8 lg:px-32">
        {/* ══════════════════════════
         *  COLUNA ESQUERDA
         * ══════════════════════════ */}
        <div className="min-w-0 flex-1">
          {/* ── IMAGEM DE CAPA ──
           * [WHITE-LABEL] Altura da foto de capa
           * Mobile: h-[250px] | Desktop: md:h-[480px]
           */}
          <div className="relative h-[250px] w-full overflow-hidden md:h-[480px] md:rounded-2xl">
            <Image
              alt={barbearia.nome}
              src={barbearia.imageUrl}
              fill
              className="object-cover"
            />

            {/* Botões mobile — ocultos no desktop */}
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-4 left-4 md:hidden"
              asChild
            >
              <Link href="/">
                <ChevronLeftIcon />
              </Link>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute top-4 right-4 md:hidden"
                >
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SidebarSheet />
            </Sheet>
          </div>

          {/* ── NOME, ENDEREÇO E AVALIAÇÃO ── */}
          <div className="border-b border-solid p-5 md:border-b-0 md:px-0 md:py-5">
            {/* [WHITE-LABEL] Nome e endereço vêm do banco */}
            <h1 className="mb-3 text-xl font-bold">{barbearia.nome}</h1>
            <div className="mb-2 flex items-center gap-2">
              <MapPinIcon className="text-primary" size={18} />
              <p className="text-sm">{barbearia.endereco}</p>
            </div>

            {/* [WHITE-LABEL] Avaliação — substitua por dado real quando disponível */}
            <div className="flex items-center gap-2">
              <StarIcon className="fill-primary text-primary" size={18} />
              <p className="text-sm">5,0 (499 avaliações)</p>
            </div>
          </div>

          {/* ── SOBRE NÓS — apenas mobile ── */}
          <div className="space-y-2 border-b border-solid p-5 md:hidden">
            <h2 className="text-xs font-bold text-gray-400 uppercase">
              Sobre nós
            </h2>
            <p className="text-justify text-sm">{barbearia.descricao}</p>
          </div>

          {/* ── SERVIÇOS ──
           * [WHITE-LABEL] Título da seção de serviços
           * Desktop: grid de 2 colunas
           */}
          <div className="space-y-3 border-b border-solid p-5 md:border-b-0 md:px-0 md:pb-0">
            <h2 className="text-xs font-bold text-gray-400 uppercase">
              Serviços
            </h2>
            <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
              {servicosSerializados.map((servico) => (
                <ServicoItem
                  key={servico.id}
                  servico={servico}
                  barbearia={{ nome: barbearia.nome }}
                />
              ))}
            </div>
          </div>

          {/* ── CONTATO — apenas mobile ── */}
          <div className="space-y-3 p-5 md:hidden">
            {barbearia.telefones.map((telefone) => (
              <TelefoneItem key={telefone} telefone={telefone} />
            ))}
          </div>
        </div>

        {/* ══════════════════════════
         *  COLUNA DIREITA — apenas desktop
         * ══════════════════════════ */}
        <div className="hidden w-80 shrink-0 flex-col gap-6 md:flex lg:w-96">
          {/* ── MAPA / LOCALIZAÇÃO ──
           * [WHITE-LABEL] Substituir o placeholder pelo Google Maps Static API:
           * https://maps.googleapis.com/maps/api/staticmap?center=ENDERECO&zoom=15&size=600x200&key=API_KEY
           */}
          <Card className="overflow-hidden">
            <div className="bg-secondary relative h-40 w-full">
              {/* Placeholder do mapa — fundo escuro com opacidade */}
              <div className="absolute inset-0 opacity-60">
                <Image
                  src={barbearia.imageUrl}
                  fill
                  className="object-cover blur-sm brightness-50"
                  alt=""
                />
              </div>

              {/* Card de info da barbearia sobre o mapa */}
              <div className="bg-card/90 absolute right-0 bottom-0 left-0 flex items-center gap-3 p-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={barbearia.imageUrl}
                    fill
                    className="object-cover"
                    alt={barbearia.nome}
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {barbearia.nome}
                  </p>
                  <p className="truncate text-xs text-gray-400">
                    {barbearia.endereco}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* ── SOBRE NÓS ── */}
          <div>
            <h2 className="mb-3 text-xs font-bold text-gray-400 uppercase">
              Sobre nós
            </h2>
            <p className="text-sm leading-relaxed">{barbearia.descricao}</p>
          </div>

          {/* ── CONTATO ── */}
          <div className="space-y-3">
            {barbearia.telefones.map((telefone) => (
              <TelefoneItem key={telefone} telefone={telefone} />
            ))}
          </div>

          {/* ── HORÁRIOS ──
           * [WHITE-LABEL] Edite HORARIOS_PADRAO no topo deste arquivo
           * Dias com "Fechado" são exibidos em vermelho automaticamente
           */}
          <div className="space-y-3">
            {HORARIOS_PADRAO.map(({ dia, horario }) => (
              <div key={dia} className="flex justify-between text-sm">
                <p className="text-gray-400">{dia}</p>
                <p
                  className={
                    horario === "Fechado"
                      ? "text-destructive font-medium"
                      : "font-medium"
                  }
                >
                  {horario}
                </p>
              </div>
            ))}
          </div>

          {/* ── EM PARCERIA COM ──
           * [WHITE-LABEL] Troque /logo.png pela logo do cliente ou remova a seção
           */}
          <div className="flex items-center justify-between border-t border-solid pt-5">
            <p className="text-xs text-gray-400">Em parceria com</p>
            <Image
              src="/logo.png"
              alt="FSW Barber"
              width={100}
              height={16}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarbeariaPage;
