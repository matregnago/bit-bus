import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import next from "next";

const prisma = new PrismaClient();

export async function GET() {
  const itemCount = await prisma.itemAcervo.count();

  const workshopCount = await prisma.oficina.count();
  const visitationCount = await prisma.visita.count();
  const eventCount = visitationCount + workshopCount;

  const visitorsCount = await prisma.visitante.count();

  const itemDonationCount = await prisma.doacaoItem.count();
  const moneyDonationCount = await prisma.doacaoDinheiro.count();
  const donationCount = itemDonationCount + moneyDonationCount;

  const data = {
    artefatos: itemCount,
    eventos: eventCount,
    visitantes: visitorsCount,
    doacoes: donationCount,
  };

  return NextResponse.json({ data });
}
