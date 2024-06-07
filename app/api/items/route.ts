import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

interface APIRequestProps {
  searchTerm: string;
}

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { searchTerm }: APIRequestProps = await request.json();
  const items = await prisma.itemAcervo.findMany({
    where: {
      nome: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
  });
  const retorno = items.map((item) => {
    return { label: item.nome, value: item.id };
  });
  return NextResponse.json({ opcoes: retorno });
}
