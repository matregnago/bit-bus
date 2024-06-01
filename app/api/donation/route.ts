import { NextResponse } from "next/server";
import {
  DoacaoDinheiro as PrismaDoacaoDinheiro,
  DoacaoItem as PrismaDoacaoItem,
  PrismaClient,
} from "@prisma/client";
import { DoacaoDinheiro, DoacaoItem } from "@/types";

const prisma = new PrismaClient();
export async function GET(request: Request) {
  const doacaoDinheiro: PrismaDoacaoDinheiro[] =
    await prisma.doacaoDinheiro.findMany({
      include: {
        doador: true,
      },
    });
  const doacaoItem: PrismaDoacaoItem[] = await prisma.doacaoItem.findMany({
    include: {
      doador: true,
      item: true,
    },
  });
  // const doacoes: (PrismaDoacaoDinheiro | PrismaDoacaoItem)[] = [
  //   ...doacaoDinheiro,
  //   ...doacaoItem,
  // ];
  return NextResponse.json({
    doacaoDinheiro,
    doacaoItem,
  });
}

export async function POST(request: Request) {
  const isDoacaoDinheiro = (
    doacao: DoacaoDinheiro | DoacaoItem
  ): doacao is DoacaoDinheiro => {
    return doacao.tipo === "Dinheiro";
  };

  const isDoacaoItem = (
    doacao: DoacaoDinheiro | DoacaoItem
  ): doacao is DoacaoItem => {
    return doacao.tipo === "Item";
  };
  const res: DoacaoDinheiro | DoacaoItem = await request.json();
  const { doador } = res;
  if (isDoacaoDinheiro(res)) {
    res.quantiaDinheiro = Number(res.quantiaDinheiro);
    const novaDoacaoDinheiro: PrismaDoacaoDinheiro =
      await prisma.doacaoDinheiro.create({
        data: {
          tipo: res.tipo,
          quantiaDinheiro: res.quantiaDinheiro,
          doador: {
            connectOrCreate: {
              where: {
                cpf: doador.cpf, // CPF para tentar conectar a um doador existente
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
      novaDoacaoDinheiro,
    });
  } else if (isDoacaoItem(res)) {
    const { item } = res;
    item.ano = Number(item.ano);
    item.quantidade = Number(item.quantidade);
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
}
