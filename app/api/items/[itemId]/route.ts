import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, context: any) {
  const { params } = context;
  const id = params.itemId;
  const returnItem = await prisma.itemAcervo.findUnique({
    where: {
      id,
    },
  });
  return NextResponse.json({ item: returnItem });
}
