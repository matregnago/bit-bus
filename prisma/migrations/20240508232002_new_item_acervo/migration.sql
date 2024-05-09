/*
  Warnings:

  - Added the required column `classificacao` to the `ItemAcervo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foto` to the `ItemAcervo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ItemAcervo" ADD COLUMN     "classificacao" TEXT NOT NULL,
ADD COLUMN     "foto" TEXT NOT NULL,
ALTER COLUMN "link" DROP NOT NULL;
