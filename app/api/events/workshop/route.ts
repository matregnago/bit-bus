import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(request: Request) {
  const res = await request.json();
  const { local, visitantes, palestrante, itensAcervo } = res;
  const createQuery = await prisma.oficina.create({
    data: {
      titulo: res.titulo,
      dataHora: res.dataHora,
      duracao: res.duracao,
      resumo: res.resumo,
      local: {
        connectOrCreate: {
          where: {
            cep: local.cep,
          },
          create: {
            rua: local.rua,
            bairro: local.bairro,
            cidade: local.cidade,
            estado: local.estado,
            cep: local.cep,
          },
        },
      },
      itensAcervo: {
        connect: itensAcervo,
      },
      visitantes: {
        connectOrCreate: visitantes.map(
          (visitante: { cpf: string; nome: string; email: string }) => ({
            where: {
              cpf: visitante.cpf,
            },
            create: {
              nome: visitante.nome,
              cpf: visitante.cpf,
              email: visitante.email,
            },
          })
        ),
      },
      palestrante: {
        connectOrCreate: {
          where: {
            cpf: palestrante.cpf,
          },
          create: {
            nome: palestrante.nome,
            cpf: palestrante.cpf,
            email: palestrante.email,
          },
        },
      },
    },
  });
  return NextResponse.json({ createQuery });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  console.log(id);
  const delWorkshop = await prisma.oficina.delete({
    where: {
      id,
    },
  });
  console.log(delWorkshop);
  return NextResponse.json({ delWorkshop });
}
