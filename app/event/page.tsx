import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Oficina, Visita, Event } from "@/types";
import { Button } from "@/components/ui/button";
import { OficinasDataTable } from "./pastWorkshopsTable/data-table";
import { columnsWorkshopTable } from "./pastWorkshopsTable/columns";
import { VisitasDataTable } from "./pastVisitsTable/data-table";
import { columnsVisitTable } from "./pastVisitsTable/columns";

import Link from "next/link";
import { dateFormatter } from "@/lib/dateformatter";
import { Ellipsis, EyeIcon } from "lucide-react";

interface EventListProps {
  events: Event[];
}
interface OficinaCardProps {
  oficina: Oficina;
}

interface VisitaCardProps {
  visita: Visita;
}

interface EventAPIResponse {
  upcomingEvents: Event[];
  pastEvents: {
    pastWorkshops: Oficina[];
    pastVisits: Visita[];
  };
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

const VisitaItem = ({ visita }: VisitaCardProps) => {
  const { dia, hora } = dateFormatter(visita.dataHora);
  return (
    <Card className="shadow-md">
      <CardHeader className="flex justify-between">
        <div className="flex justify-between">
          <CardTitle>Visita</CardTitle>
          <Link href={`/event/${visita.id}`}>
            <Button variant="outline" className="border-none justify-end">
              <Ellipsis className="w-5 h-5" />
            </Button>
          </Link>
        </div>
        <CardDescription className="">
          Evento de visitação destinado ao público.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2 text-gray-500">
          <CalendarIcon className="w-5 h-5" />
          <p>Data: {dia}</p>
          <ClockIcon className="w-5 h-5" />
          <p>Horario: {hora}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const OficinaItem = ({ oficina }: OficinaCardProps) => {
  const { dia, hora } = dateFormatter(oficina.dataHora);
  return (
    <Card className="shadow-md">
      <CardHeader className="flex justify-between">
        <div className="flex justify-between">
          <CardTitle>{oficina.titulo}</CardTitle>
          <Link href={`/event/${oficina.id}`}>
            <Button variant="outline" className="border-none justify-end">
              <Ellipsis className="w-5 h-5" />
            </Button>
          </Link>
        </div>
        <CardDescription className="">{oficina.resumo}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-gray-500">
          <CalendarIcon className="w-5 h-5" />
          <p>Data: {dia}</p>
          <ClockIcon className="w-5 h-5" />
          <p>Horario: {hora}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const EventList = ({ events }: EventListProps) => {
  const isOficina = (event: Event): event is Oficina => {
    return "resumo" in event;
  };
  const isVisita = (event: Event): event is Visita => {
    return "organizador" in event;
  };
  return events.length === 0 ? (
    <p>Não há eventos agendados</p>
  ) : (
    <div className="grid grid-cols-4 gap-10">
      {events.map((event) => {
        if (isVisita(event)) {
          return <VisitaItem key={event.id} visita={event} />;
        } else if (isOficina(event)) {
          return <OficinaItem key={event.id} oficina={event} />;
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default async function EventPage() {
  const data = await fetch("http://localhost:3000/api/events", {
    cache: "no-cache",
  });
  const events: EventAPIResponse = await data.json();
  const { pastEvents, upcomingEvents } = events;
  return (
    <ScrollArea className="h-full">
      <title key="title">Eventos</title>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-start justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Eventos</h1>
          <Link href="/event/create">
            <Button className="text-xs md:text-sm">Adicionar Evento</Button>
          </Link>
        </div>
        <Tabs defaultValue="agendados" className="">
          <div className="">
            <div className="flex items-start justify-between">
              <TabsList>
                <TabsTrigger value="agendados">Agendados</TabsTrigger>
                <TabsTrigger value="passados">Passados</TabsTrigger>
              </TabsList>
            </div>
            <div className="">
              <TabsContent value="agendados" className="mb-8">
                <EventList events={upcomingEvents} />
              </TabsContent>
            </div>
          </div>

          <TabsContent value="passados" className="text-xl my-3">
            <h1 className="font-bold text-xl my-3">Oficinas passadas</h1>
            <OficinasDataTable
              columns={columnsWorkshopTable}
              data={pastEvents.pastWorkshops}
            />
            <h1 className="font-bold text-xl my-5">Visitas passadas</h1>
            <VisitasDataTable
              data={pastEvents.pastVisits}
              columns={columnsVisitTable}
            />
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
