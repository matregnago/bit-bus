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

const VisitaItem = ({ visita }: VisitaCardProps) => (
  <Card className="min-w-80">
    <CardHeader>
      <CardTitle>Visita</CardTitle>
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent>
      <Badge variant="outline">Visita</Badge>
      <p>Data e Hora: {new Date(visita.dataHora).toLocaleString()}</p>
      <Link href={`/event/${visita.id}`}>
        <Button variant="secondary">Ver detalhes</Button>
      </Link>
    </CardContent>
  </Card>
);

const OficinaItem = ({ oficina }: OficinaCardProps) => (
  <Card className="min-w-80">
    <CardHeader>
      <CardTitle>{oficina.titulo}</CardTitle>
      <CardDescription>{oficina.resumo}</CardDescription>
    </CardHeader>
    <CardContent>
      <Badge variant="outline">Oficina</Badge>
      <p>Data e Hora: {new Date(oficina.dataHora).toLocaleString()}</p>
      <p>Duração: {oficina.duracao}</p>
      <Link href={`/event/${oficina.id}`}>
        <Button variant="secondary">Ver detalhes</Button>
      </Link>
    </CardContent>
  </Card>
);

const EventList = ({ events }: EventListProps) => {
  const isOficina = (event: Event): event is Oficina => {
    return "resumo" in event;
  };
  const isVisita = (event: Event): event is Visita => {
    return "organizador" in event;
  };
  return (
    <div>
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
      <div className="">
        <h1 className="text-3xl font-bold mb-5">Eventos</h1>
        <Tabs defaultValue="agendados" className="">
          <TabsList>
            <TabsTrigger value="agendados">Agendados</TabsTrigger>
            <TabsTrigger value="passados">Passados</TabsTrigger>
          </TabsList>
          <TabsContent value="agendados">
            <Link className="" href="/event/create">
              <Button>Criar Evento</Button>
            </Link>
            <EventList events={upcomingEvents} />
          </TabsContent>
          <TabsContent value="passados">
            <h1>Oficinas passadas</h1>
            <OficinasDataTable
              columns={columnsWorkshopTable}
              data={pastEvents.pastWorkshops}
            />
            <h1>Visitas passadas</h1>
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
