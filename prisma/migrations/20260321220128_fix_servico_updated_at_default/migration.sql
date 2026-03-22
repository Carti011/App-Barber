-- Adiciona DEFAULT CURRENT_TIMESTAMP ao updatedAt de Servico.
-- O adapter Neon não injeta @updatedAt automaticamente nesta tabela,
-- então o banco assume o valor padrão na criação.
ALTER TABLE "Servico" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;