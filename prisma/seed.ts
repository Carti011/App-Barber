import "dotenv/config";
import { db } from "../app/_lib/prisma";

const prisma = db;

const imagensBarbearias = [
  "https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png",
  "https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png",
  "https://utfs.io/f/5832df58-cfd7-4b3f-b102-42b7e150ced2-16r.png",
  "https://utfs.io/f/7e309eaa-d722-465b-b8b6-76217404a3d3-16s.png",
  "https://utfs.io/f/178da6b6-6f9a-424a-be9d-a2feb476eb36-16t.png",
  "https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16u.png",
  "https://utfs.io/f/988646ea-dcb6-4f47-8a03-8d4586b7bc21-16v.png",
  "https://utfs.io/f/60f24f5c-9ed3-40ba-8c92-0cd1dcd043f9-16w.png",
  "https://utfs.io/f/f64f1bd4-59ce-4ee3-972d-2399937eeafc-16x.png",
  "https://utfs.io/f/e995db6d-df96-4658-99f5-11132fd931e1-17j.png",
];

const nomesCreativos = [
  "Barbearia Vintage",
  "Corte & Estilo",
  "Barba & Navalha",
  "The Dapper Den",
  "Cabelo & Cia.",
  "Machado & Tesoura",
  "Barbearia Elegance",
  "Aparência Impecável",
  "Estilo Urbano",
  "Estilo Clássico",
];

const enderecos = [
  "Rua das Flores, 123 - Centro",
  "Av. dos Cortes, 456 - Jardins",
  "Praça da Barba, 789 - Vila Madalena",
  "Trav. da Navalha, 101 - Pinheiros",
  "Al. dos Estilos, 202 - Moema",
  "Estrada do Machado, 303 - Lapa",
  "Av. Elegante, 404 - Itaim Bibi",
  "Praça da Aparência, 505 - Perdizes",
  "Rua Urbana, 606 - Consolação",
  "Av. Clássica, 707 - Higienópolis",
];

const servicos = [
  {
    nome: "Corte de Cabelo",
    descricao: "Corte personalizado com as últimas tendências.",
    preco: 60.0,
    duracaoMinutos: 45,
    imageUrl:
      "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
  },
  {
    nome: "Barba",
    descricao: "Modelagem completa para destacar sua masculinidade.",
    preco: 40.0,
    duracaoMinutos: 30,
    imageUrl:
      "https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png",
  },
  {
    nome: "Pézinho",
    descricao: "Acabamento perfeito para um visual renovado.",
    preco: 35.0,
    duracaoMinutos: 20,
    imageUrl:
      "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
  },
  {
    nome: "Sobrancelha",
    descricao: "Modelagem precisa para uma expressão acentuada.",
    preco: 20.0,
    duracaoMinutos: 15,
    imageUrl:
      "https://utfs.io/f/2118f76e-89e4-43e6-87c9-8f157500c333-b0ps0b.png",
  },
  {
    nome: "Massagem",
    descricao: "Relaxe com uma massagem revigorante.",
    preco: 50.0,
    duracaoMinutos: 30,
    imageUrl:
      "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png",
  },
  {
    nome: "Hidratação",
    descricao: "Hidratação profunda para cabelo e barba.",
    preco: 25.0,
    duracaoMinutos: 30,
    imageUrl:
      "https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png",
  },
];

async function popular() {
  // Limpa na ordem correta para respeitar as foreign keys
  await prisma.agendamento.deleteMany();
  await prisma.servico.deleteMany();
  await prisma.barbeiro.deleteMany();
  await prisma.barbearia.deleteMany();

  for (let i = 0; i < 10; i++) {
    const barbearia = await prisma.barbearia.create({
      data: {
        nome: nomesCreativos[i],
        endereco: enderecos[i],
        telefones: ["(11) 99999-9999", "(11) 3333-4444"],
        descricao:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac augue ullamcorper, pharetra orci mollis, auctor tellus. Phasellus pharetra erat ac libero efficitur tempus. Donec pretium convallis iaculis. Etiam eu felis sollicitudin, cursus mi vitae, iaculis magna.",
        imageUrl: imagensBarbearias[i],
      },
    });

    for (const servico of servicos) {
      await prisma.servico.create({
        data: { ...servico, barbeariaId: barbearia.id },
      });
    }
  }

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
