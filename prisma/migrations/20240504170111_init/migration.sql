-- CreateTable
CREATE TABLE "ItemAcervo" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "dimensoes" TEXT NOT NULL,
    "informacoes" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "prateleira" TEXT NOT NULL,

    CONSTRAINT "ItemAcervo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doador" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Doador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doacao" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "quantiaDinheiro" DOUBLE PRECISION NOT NULL,
    "itemAcervoId" TEXT NOT NULL,
    "doadorId" TEXT NOT NULL,

    CONSTRAINT "Doacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doacao_itemAcervoId_key" ON "Doacao"("itemAcervoId");

-- AddForeignKey
ALTER TABLE "Doacao" ADD CONSTRAINT "Doacao_itemAcervoId_fkey" FOREIGN KEY ("itemAcervoId") REFERENCES "ItemAcervo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doacao" ADD CONSTRAINT "Doacao_doadorId_fkey" FOREIGN KEY ("doadorId") REFERENCES "Doador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
