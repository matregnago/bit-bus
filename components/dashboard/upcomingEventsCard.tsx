import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Oficina, Visita } from "@/types";
import Link from "next/link";
import { dateFormatter } from "@/lib/dateformatter";

interface EventApiResponse {
  upcomingEvents: (Oficina | Visita)[];
  pastEvents: (Oficina | Visita)[];
}

export default async function UpcomingEventsCard() {
  const isVisita = (evento: Visita | Oficina): evento is Visita => {
    return "organizador" in evento;
  };

  let upcomingEvents: (Oficina | Visita)[] = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/events?limit=6`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const data: EventApiResponse = await response.json();
    upcomingEvents = data.upcomingEvents;
  } catch (error) {
    console.error("Error fetching events:", error);
  }

  const datasFormatadas = upcomingEvents.map((evento) => {
    const { dia, hora } = dateFormatter(evento.dataHora);
    return {
      id: evento.id,
      dia,
      hora,
    };
  });

  const horaEvento = (evento: Oficina | Visita) => {
    const itemEncontrado = datasFormatadas.find(
      (item) => item.id === evento.id
    );

    return itemEncontrado ? itemEncontrado.hora : "";
  };

  const dataEvento = (evento: Oficina | Visita) => {
    const itemEncontrado = datasFormatadas.find(
      (item) => item.id === evento.id
    );

    return itemEncontrado ? itemEncontrado.dia : "";
  };

  return (
    <Card className="col-span-3">
      <CardHeader className="">
        <CardTitle className="text-lg font-medium">Próximos Eventos</CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((evento) => (
            <div key={evento.id} className="flex items-center justify-between">
              <div className="my-1">
                <h3 className="font-medium">
                  {isVisita(evento) ? "Visitação" : evento.titulo}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {`${dataEvento(evento)} - ${horaEvento(evento)}`}
                </p>
              </div>
              <Link href={`/event/${evento.id}`}>
                <Button variant={"secondary"}>Detalhes</Button>
              </Link>
            </div>
          ))
        ) : (
          <h3 className="font-medium">Não há eventos agendados</h3>
        )}
      </CardContent>
    </Card>
  );
}
