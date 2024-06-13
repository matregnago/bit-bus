import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Event, Oficina, Visita } from "@/types";

const prisma = new PrismaClient();

const pastEventsSort = (eventA: Event, eventB: Event) => {
  if (eventA.dataHora > eventB.dataHora) {
    return -1;
  } else if (eventA.dataHora < eventB.dataHora) {
    return 1;
  } else {
    return 0;
  }
};

const upcomingEventsSort = (eventA: Event, eventB: Event) => {
  if (eventA.dataHora > eventB.dataHora) {
    return 1;
  } else if (eventA.dataHora < eventB.dataHora) {
    return -1;
  } else {
    return 0;
  }
};
const dateNow = new Date();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = Number(searchParams.get("limit"));

  const visitas: Visita[] = await prisma.visita.findMany({
    include: {
      local: true,
      visitantes: true,
      organizador: true,
      itensAcervo: true,
    },
  });
  const oficinas: Oficina[] = await prisma.oficina.findMany({
    include: {
      local: true,
      visitantes: true,
      palestrante: true,
      itensAcervo: true,
    },
  });

  const events: Event[] = [...visitas, ...oficinas];
  const upcomingEvents = events.filter((event) => {
    return event.dataHora >= dateNow;
  });

  const pastWorkshops = oficinas.filter((oficina) => {
    return oficina.dataHora < dateNow;
  });
  const pastVisits = visitas.filter((visita) => {
    return visita.dataHora < dateNow;
  });

  let returnObject = {
    upcomingEvents: upcomingEvents.sort(upcomingEventsSort),
    pastEvents: {
      pastWorkshops: pastWorkshops.sort(pastEventsSort),
      pastVisits: pastVisits.sort(pastEventsSort),
    },
  };
  if (limit) {
    returnObject.upcomingEvents = returnObject.upcomingEvents.slice(0, limit);
  }
  return NextResponse.json(returnObject);
}
