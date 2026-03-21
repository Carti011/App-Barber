import ServicoItem from "@/app/_components/servico-item";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  return (
    <div>
      {/* ── IMAGEM DE CAPA ──
       * [WHITE-LABEL] Altura da foto de capa da barbearia
       * Ajuste h-[250px] conforme a proporção desejada
       */}
      <div className="relative h-[250px] w-full">
        <Image
          alt={barbearia.nome}
          src={barbearia.imageUrl}
          fill
          className="object-cover"
        />

        {/* Botão voltar */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 left-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        {/* Botão menu — será conectado ao SidebarSheet futuramente */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4"
        >
          <MenuIcon />
        </Button>
      </div>

      {/* ── NOME E LOCALIZAÇÃO ── */}
      <div className="border-b border-solid p-5">
        {/* [WHITE-LABEL] Nome e endereço vêm do banco — edite via seed ou painel admin */}
        <h1 className="mb-3 text-xl font-bold">{barbearia.nome}</h1>
        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbearia.endereco}</p>
        </div>

        {/* [WHITE-LABEL] Avaliação — substitua "5,0 (499 avaliações)" por dado real */}
        <div className="flex items-center gap-2">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5,0 (499 avaliações)</p>
        </div>
      </div>

      {/* ── DESCRIÇÃO ── */}
      <div className="space-y-2 border-b border-solid p-5">
        {/* [WHITE-LABEL] Título da seção de descrição */}
        <h2 className="text-xs font-bold text-gray-400 uppercase">Sobre nós</h2>
        <p className="text-justify text-sm">{barbearia.descricao}</p>
      </div>

      {/* ── SERVIÇOS ──
       * [WHITE-LABEL] Título da seção de serviços
       */}
      <div className="space-y-3 p-5">
        <h2 className="text-xs font-bold text-gray-400 uppercase">Serviços</h2>
        <div className="space-y-3">
          {barbearia.servicos.map((servico) => (
            <ServicoItem key={servico.id} servico={servico} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarbeariaPage;
