import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const pastEventsSort = (eventA, eventB) => {
  if (eventA.dataHora > eventB.dataHora) {
    return -1;
  } else if (eventA.dataHora < eventB.dataHora) {
    return 1;
  } else {
    return 0;
  }
};
const upcomingEventsSort = (eventA, eventB) => {
  if (eventA.dataHora > eventB.dataHora) {
    return 1;
  } else if (eventA.dataHora < eventB.dataHora) {
    return -1;
  } else {
    return 0;
  }
};
const dateNow = new Date();

export async function GET() {
  const visitas = await prisma.visita.findMany();
  const oficinas = await prisma.oficina.findMany();
  const visitasAddType = visitas.map((visita) => {
    return { ...visita, tipo: "visita" };
  });
  const oficinasAddType = oficinas.map((oficina) => {
    return { ...oficina, tipo: "oficina" };
  });

  const events = visitasAddType.concat(oficinasAddType);

  const pastEvents = events.filter((event) => {
    return event.dataHora < dateNow;
  });
  const upcomingEvents = events.filter((event) => {
    return event.dataHora >= dateNow;
  });

  const returnArray = [
    pastEvents.sort(pastEventsSort),
    upcomingEvents.sort(upcomingEventsSort),
  ];
  return NextResponse.json(returnArray);
}
