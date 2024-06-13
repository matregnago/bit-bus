import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, context: any) {
  // const eventId = req
  const { params } = context;
  const id = params.donationId;
  const returnMoneyDonation = await prisma.doacaoDinheiro.findUnique({
    where: {
      id,
    },
    include: {
      doador: true,
    },
  });
  if (returnMoneyDonation != null) {
    return NextResponse.json(returnMoneyDonation);
  }
  return NextResponse.json({});
}
