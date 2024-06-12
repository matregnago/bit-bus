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
import { Separator } from "@/components/ui/separator";

import Link from "next/link";
import { dateFormatter } from "@/lib/dateformatter";

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

const VisitaItem = ({ visita }: VisitaCardProps) => {
  const { dia, hora } = dateFormatter(visita.dataHora);
  return (
    <Card className="min-w-80">
      <CardHeader>
        <CardTitle>Visita</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Badge variant="outline">Visita</Badge>
        <p>Data: {dia}</p>
        <p>Horario: {hora}</p>
        <Link href={`/event/${visita.id}`}>
          <Button variant="secondary">Ver detalhes</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

const OficinaItem = ({ oficina }: OficinaCardProps) => {
  const { dia, hora } = dateFormatter(oficina.dataHora);
  return (
    <Card className="min-w-80">
      <CardHeader>
        <CardTitle>{oficina.titulo}</CardTitle>
        <CardDescription>{oficina.resumo}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge variant="outline">Oficina</Badge>
        <p>Data: {dia}</p>
        <p>Horario: {hora}</p>
        <p>Duração: {oficina.duracao}</p>
        <Link href={`/event/${oficina.id}`}>
          <Button variant="secondary">Ver detalhes</Button>
        </Link>
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
  return (
    <div className="grid grid-cols-3 gap-6">
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
            <TabsContent value="agendados" className="mb-8">
              <EventList events={upcomingEvents} />
            </TabsContent>
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
