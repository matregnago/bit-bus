import { DoacaoItem } from "@/types";
import { PrismaClient, DoacaoItem as PrismaDoacaoItem } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
  const doacoesItem: PrismaDoacaoItem[] = await prisma.doacaoItem.findMany({
    include: {
      item: true,
    },
  });
  return NextResponse.json({
    doacoesItem,
  });
}

export async function POST(request: Request) {
  const res: DoacaoItem = await request.json();
  const { item, doador } = res;
  const novaDoacaoItem: PrismaDoacaoItem = await prisma.doacaoItem.create({
    data: {
      tipo: res.tipo,
      item: {
        create: {
          nome: item.nome,
          ano: item.ano,
          quantidade: item.quantidade,
          tipo: item.tipo,
          dimensoes: item.dimensoes,
          informacoes: item.informacoes,
          link: item.link,
          foto: item.foto,
          prateleira: item.prateleira,
          classificacao: item.classificacao,
        },
      },
      doador: {
        connectOrCreate: {
          where: {
            cpf: res.doador.cpf, // CPF para tentar conectar a um doador existente
          },
          create: {
            nome: doador.nome,
            cpf: doador.cpf,
            email: doador.email,
          },
        },
      },
    },
  });
  return NextResponse.json({
    novaDoacaoItem,
  });
}
export async function DELETE(request: Request) {
  const { id } = await request.json();
  console.log(id);
  const itemDonation = await prisma.doacaoItem.findUnique({
    where: {
      id,
    },
    include: {
      item: true,
    },
  });
  const itemId = itemDonation?.itemAcervoId;
  const itemDelete = await prisma.itemAcervo.delete({
    where: {
      id: itemId,
    },
  });
  console.log(itemDelete);

  return NextResponse.json({ itemDelete });
}
