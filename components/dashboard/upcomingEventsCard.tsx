"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Oficina, Visita } from "@/types";
import Link from "next/link";
import { dateFormatter } from "@/lib/dateformatter";
import { useState } from "react";
import EventDetailsDialog from "../details/EventDetailsDialog";
import EventDetailsCard from "./EventDetailsCard";

export default function UpcomingEventsCard({
  upcomingEvents,
}: {
  upcomingEvents: (Oficina | Visita)[];
}) {
  const datasFormatadas = upcomingEvents.map((evento) => {
    const { dia, hora } = dateFormatter(evento.dataHora);
    return {
      id: evento.id,
      dia,
      hora,
    };
  });

  return (
    <Card className="col-span-3">
      <CardHeader className="">
        <CardTitle className="text-lg font-medium">Próximos Eventos</CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((evento) => (
            <div key={evento.id} className="">
              <EventDetailsCard
                datasFormatadas={datasFormatadas}
                evento={evento}
              />
            </div>
          ))
        ) : (
          <h3 className="font-medium">Não há eventos agendados</h3>
        )}
      </CardContent>
    </Card>
  );
}
