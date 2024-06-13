import { DoacaoDinheiro } from "@/types";
import {
  PrismaClient,
  DoacaoDinheiro as PrismaDoacaoDinheiro,
} from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const searchTerm = searchParams.get("id");
  if (searchTerm && searchTerm !== "") {
    const doacoesDinheiro = await prisma.doacaoDinheiro.findUnique({
      where: {
        id: searchTerm,
      },
      include: {
        doador: true,
      },
    });
    return NextResponse.json(doacoesDinheiro);
  } else {
    const doacoesDinheiro = await prisma.doacaoDinheiro.findMany({
      include: {
        doador: true,
      },
      orderBy: {
        dataCriacao: "desc",
      },
    });
    return NextResponse.json(doacoesDinheiro);
  }
}

export async function POST(request: Request) {
  const res: DoacaoDinheiro = await request.json();
  const { doador } = res;
  res.quantiaDinheiro = Number(res.quantiaDinheiro);
  const novaDoacaoDinheiro: PrismaDoacaoDinheiro =
    await prisma.doacaoDinheiro.create({
      data: {
        tipo: res.tipo,
        quantiaDinheiro: res.quantiaDinheiro,
        doador: {
          connectOrCreate: {
            where: {
              cpf: doador.cpf,
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
}
export async function DELETE(request: Request) {
  const { id } = await request.json();
  console.log(id);
  const delMoneyDonation = await prisma.doacaoDinheiro.delete({
    where: {
      id,
    },
  });
  console.log(delMoneyDonation);
  return NextResponse.json({ delMoneyDonation });
}
