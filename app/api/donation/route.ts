import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(request: Request) {
  const doacaoDinheiro = await prisma.doacaoDinheiro.findMany();
  const doacaoItem = await prisma.doacaoItem.findMany({
    include: {
      item: true,
    },
  });
  const doacoes = doacaoDinheiro.concat(doacaoItem);
  return NextResponse.json({
    doacoes,
  });
}

export async function POST(request: Request) {
  const res = await request.json();
  const { item, doador } = res;
  if (res.tipo === "Dinheiro") {
    res.quantiaDinheiro = Number(res.quantiaDinheiro);
    const novaDoacaoDinheiro = await prisma.doacaoDinheiro.create({
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
  } else {
    item.ano = Number(item.ano);
    item.quantidade = Number(item.quantidade);
    const novaDoacaoItem = await prisma.doacaoItem.create({
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
