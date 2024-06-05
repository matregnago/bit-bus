import { NextResponse } from "next/server";
import { PrismaClient, Visitante } from "@prisma/client";
import { Feedback } from "@/types";
import { Feedback as PrismaFeedback } from "@prisma/client";
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
  const res: Feedback = await request.json();
  const { visitante } = res;
  const findVisitante: Visitante | null = await prisma.visitante.findUnique({
    where: {
      cpf: visitante.cpf,
    },
  });
  if (findVisitante === null) {
    return NextResponse.json(
      {
        message: "Visitante não encontrado",
      },
      {
        status: 401,
      }
    );
  }
  const novoFeedback: PrismaFeedback = await prisma.feedback.create({
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
export async function DELETE(request: Request) {
  const { id } = await request.json();
  console.log(id);
  const delFeedback = await prisma.feedback.delete({
    where: {
      id,
    },
  });
  console.log(delFeedback);
  return NextResponse.json({ delFeedback });
}
