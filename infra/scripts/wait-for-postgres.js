const { Client } = require("pg");
require("dotenv").config({ path: ".env.test" });

const MAX_TENTATIVAS = 30;
const INTERVALO_MS = 1000;

async function verificarPostgres() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  try {
    await client.connect();
    await client.end();
    return true;
  } catch {
    return false;
  }
}

async function aguardarPostgres() {
  console.log("Aguardando o PostgreSQL estar pronto...");

  for (let tentativa = 1; tentativa <= MAX_TENTATIVAS; tentativa++) {
    const pronto = await verificarPostgres();
    if (pronto) {
      console.log("PostgreSQL pronto!");
      return;
    }
    process.stdout.write(`\rTentativa ${tentativa}/${MAX_TENTATIVAS}...`);
    await new Promise((r) => setTimeout(r, INTERVALO_MS));
  }

  console.error("\nPostgreSQL não respondeu a tempo. Abortando.");
  process.exit(1);
}

aguardarPostgres();
