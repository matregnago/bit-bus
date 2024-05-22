import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const feedbacks = await prisma.feedback.findMany({
    include: {
      visitante: {
        include: {
          visitas: {
            orderBy: {
              dataHora: "desc",
            },
          },
        },
      },
    },
  });

  return NextResponse.json(feedbacks);
}

export async function POST(request: Request) {
  const res = await request.json();
  const { visitante } = res;
  res.nota = Number(res.nota);
  const novoFeedback = await prisma.feedback.create({
    data: {
      conteudo: res.conteudo,
      nota: res.nota,
      visitante: {
        connect: {
          cpf: visitante.cpf,
        },
      },
    },
  });
  return NextResponse.json({
    novoFeedback,
  });
}
