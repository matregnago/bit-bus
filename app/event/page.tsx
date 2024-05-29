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

const VisitaItem = ({ visita }) => (
  <Card className="min-w-80">
    <CardHeader>
      <CardTitle>Visita</CardTitle>
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent>
      <Badge variant="outline">Visita</Badge>
      <p>ID: {visita.id}</p>
      <p>Data e Hora: {new Date(visita.dataHora).toLocaleString()}</p>
      <p>Organizador ID: {visita.organizadorId}</p>
      <p>Local: {visita.locald}</p>
    </CardContent>
  </Card>
);

const OficinaItem = ({ oficina }) => (
  <Card className="min-w-80">
    <CardHeader>
      <CardTitle>{oficina.titulo}</CardTitle>
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent>
      <Badge variant="outline">Oficina</Badge>
      <p>ID: {oficina.id}</p>
      <p>Título: {oficina.titulo}</p>
      <p>Data e Hora: {new Date(oficina.dataHora).toLocaleString()}</p>
      <p>Duração: {oficina.duracao}</p>
      <p>Resumo: {oficina.resumo}</p>
      <p>Local ID: {oficina.localId}</p>
      <p>Palestrante ID: {oficina.palestranteId}</p>
    </CardContent>
  </Card>
);

const EventList = ({ events }) => {
  return (
    <div className="flex flex-col gap-6">
      {events.map((event) => {
        if (event.tipo === "visita") {
          return <VisitaItem key={event.id} visita={event} />;
        } else if (event.tipo === "oficina") {
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
  const events = await data.json();
  const [pastEvents, upcomingEvents] = events;
  return (
    <ScrollArea className="h-full">
      <div>
        <Tabs defaultValue="agendados" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="agendados">Agendados</TabsTrigger>
            <TabsTrigger value="passados">Passados</TabsTrigger>
          </TabsList>
          <TabsContent value="agendados">
            <EventList events={upcomingEvents} />
          </TabsContent>
          <TabsContent value="passados">
            <EventList events={pastEvents} />
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
