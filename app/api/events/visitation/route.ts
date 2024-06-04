import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(request: Request) {
  const res = await request.json();
  const { local, visitantes, organizador } = res;
  const createQuery = await prisma.visita.create({
    data: {
      dataHora: res.dataHora,
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
      organizador: {
        connectOrCreate: {
          where: {
            cpf: organizador.cpf,
          },
          create: {
            nome: organizador.nome,
            cpf: organizador.cpf,
            email: organizador.email,
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
  const delVisitation = await prisma.visita.delete({
    where: {
      id,
    },
  });
  console.log(delVisitation);
  return NextResponse.json({ delVisitation });
}
