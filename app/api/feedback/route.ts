import { NextResponse } from "next/server";
import { Feedback, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const feedbacks: Feedback[] = await prisma.feedback.findMany({
    include: {
      visitante: {
        include: {
          visitas: {
            orderBy: {
              dataHora: "desc",
            },
          },
          Oficina: {
            orderBy: {
              dataHora: "desc",
            },
          },
        },
      },
    },
    orderBy: {
      dataCriacao: "desc",
    },
  });

  return NextResponse.json(feedbacks);
}

export async function POST(request: Request) {
  const res = await request.json();
  const { visitante } = res;
  res.nota = Number(res.nota);
  const novoFeedback: Feedback = await prisma.feedback.create({
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
