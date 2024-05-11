import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(req: Request, context: any) {
  const allDonators = await prisma.doador.findMany();
  return NextResponse.json({
    allDonators,
  });
}
