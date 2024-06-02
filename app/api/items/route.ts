import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { Item } from "@/types";

const prisma = new PrismaClient();

export async function GET() {
  const items: Item[] = await prisma.itemAcervo.findMany({
    orderBy: {
      dataCriacao: "desc",
    },
  });
  return NextResponse.json(items);
}
