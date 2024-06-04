import { NextResponse } from "next/server";
import {
  DoacaoDinheiro as PrismaDoacaoDinheiro,
  DoacaoItem as PrismaDoacaoItem,
  PrismaClient,
} from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(request: Request) {
  const doacaoDinheiro: PrismaDoacaoDinheiro[] =
    await prisma.doacaoDinheiro.findMany({
      include: {
        doador: true,
      },
      orderBy: {
        dataCriacao: "desc",
      },
    });
  const doacaoItem: PrismaDoacaoItem[] = await prisma.doacaoItem.findMany({
    include: {
      doador: true,
      item: true,
    },
    orderBy: {
      dataCriacao: "desc",
    },
  });
  return NextResponse.json({
    doacaoDinheiro,
    doacaoItem,
  });
}
