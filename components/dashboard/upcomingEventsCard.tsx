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
  const requestEvents = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/events?limit=6`
  );
  let { upcomingEvents }: EventApiResponse = await requestEvents.json();
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

    if (itemEncontrado) {
      return itemEncontrado.hora;
    } else {
      return "";
    }
  };

  const dataEvento = (evento: Oficina | Visita) => {
    const itemEncontrado = datasFormatadas.find(
      (item) => item.id === evento.id
    );

    if (itemEncontrado) {
      return itemEncontrado.dia;
    } else {
      return "";
    }
  };
  return (
    <Card className="col-span-3">
      <CardHeader className="">
        <CardTitle className="text-lg font-medium">Proximos Eventos</CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingEvents && upcomingEvents.length > 0 ? (
          upcomingEvents.map((evento) => (
            <div key={evento.id} className="flex items-center justify-between">
              <div>
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
