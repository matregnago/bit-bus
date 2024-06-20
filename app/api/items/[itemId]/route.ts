import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, context: any) {
  const { params } = context;
  const id = params.itemId;
  const url = new URL(request.url);
  const donation = url.searchParams.get("donation");
  let returnItem;
  if (donation === "true") {
    returnItem = await prisma.itemAcervo.findUnique({
      where: {
        id,
      },
      include: {
        DoacaoItem: {
          include: {
            doador: true,
          },
        },
      },
    });
  } else {
    returnItem = await prisma.itemAcervo.findUnique({
      where: {
        id,
      },
    });
  }

  return NextResponse.json({ item: returnItem });
}
