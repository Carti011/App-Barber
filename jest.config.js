const nextJest = require("next/jest");

const criarConfiguracaoJest = nextJest({
  dir: ".",
});

const configuracaoJest = criarConfiguracaoJest({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

module.exports = configuracaoJest;
