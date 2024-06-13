import { NextRequest, NextResponse } from "next/server";
import { ItemAcervo, PrismaClient } from "@prisma/client";
import { Item } from "@/types";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const res: Item = await request.json();

  const novoItem: ItemAcervo = await prisma.itemAcervo.create({
    data: {
      nome: res.nome,
      ano: res.ano,
      quantidade: res.quantidade,
      tipo: res.tipo,
      dimensoes: res.dimensoes,
      informacoes: res.informacoes,
      link: res.link,
      foto: res.foto,
      prateleira: res.prateleira,
      classificacao: res.classificacao,
    },
  });
  return NextResponse.json(novoItem);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const searchTerm = searchParams.get("search");
  if (searchTerm) {
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
  } else {
    return NextResponse.json({});
  }
}
