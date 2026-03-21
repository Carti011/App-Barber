import "dotenv/config";
import { db } from "../app/_lib/prisma";

const prisma = db;

async function popular() {
  // Limpa na ordem correta para respeitar as foreign keys
  await prisma.agendamento.deleteMany();
  await prisma.servico.deleteMany();
  await prisma.barbeiro.deleteMany();
  await prisma.barbearia.deleteMany();

  const barbearia = await prisma.barbearia.create({
    data: {
      nome: "Barbearia Exemplo",
      endereco: "Rua das Flores, 123 - Centro",
      telefones: ["(11) 99999-9999", "(11) 3333-4444"],
      descricao:
        "A melhor barbearia da cidade. Especialistas em cortes modernos e clássicos, barba e muito mais.",
      imageUrl:
        "https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png",
    },
  });

  await prisma.barbeiro.createMany({
    data: [
      {
        nome: "Carlos Silva",
        barbeariaId: barbearia.id,
        imageUrl:
          "https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png",
      },
      {
        nome: "João Oliveira",
        barbeariaId: barbearia.id,
        imageUrl:
          "https://utfs.io/f/5832df58-cfd7-4b3f-b102-42b7e150ced2-16r.png",
      },
      {
        nome: "Rafael Santos",
        barbeariaId: barbearia.id,
        imageUrl:
          "https://utfs.io/f/7e309eaa-d722-465b-b8b6-76217404a3d3-16s.png",
      },
    ],
  });

  await prisma.servico.createMany({
    data: [
      {
        nome: "Corte de Cabelo",
        descricao: "Corte personalizado com as últimas tendências.",
        preco: 60.0,
        duracaoMinutos: 45,
        barbeariaId: barbearia.id,
      },
      {
        nome: "Barba",
        descricao: "Modelagem completa para destacar sua masculinidade.",
        preco: 40.0,
        duracaoMinutos: 30,
        barbeariaId: barbearia.id,
      },
      {
        nome: "Corte + Barba",
        descricao: "Combo completo de corte e barba.",
        preco: 90.0,
        duracaoMinutos: 70,
        barbeariaId: barbearia.id,
      },
      {
        nome: "Pézinho",
        descricao: "Acabamento perfeito para um visual renovado.",
        preco: 35.0,
        duracaoMinutos: 20,
        barbeariaId: barbearia.id,
      },
      {
        nome: "Sobrancelha",
        descricao: "Modelagem precisa para uma expressão acentuada.",
        preco: 20.0,
        duracaoMinutos: 15,
        barbeariaId: barbearia.id,
      },
      {
        nome: "Hidratação",
        descricao: "Hidratação profunda para cabelo e barba.",
        preco: 25.0,
        duracaoMinutos: 30,
        barbeariaId: barbearia.id,
      },
    ],
  });

  console.log("Banco populado com sucesso.");
}

popular()
  .catch((erro) => {
    console.error("Erro ao popular o banco:", erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
