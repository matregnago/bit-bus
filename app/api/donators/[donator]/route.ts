import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(req: Request, context: any) {
  const { params } = context;
  console.log(params);
  const data: string = params.donator;

  const donatorDetails = await prisma.doador.findUnique({
    where: { cpf: data },
  });
  return NextResponse.json({
    donatorDetails,
  });
}
