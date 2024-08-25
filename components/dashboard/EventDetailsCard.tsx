import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Oficina, Visita } from "@/types";
import Link from "next/link";
import { dateFormatter } from "@/lib/dateformatter";
import { useState } from "react";
import EventDetailsDialog from "../details/EventDetailsDialog";

export default function EventDetailsCard({
  evento,
  datasFormatadas,
}: {
  evento: Oficina | Visita;
  datasFormatadas: { id: string | undefined; dia: string; hora: string }[];
}) {
  const [isEventDetailsDialogOpen, setIsEventDetailsDialogOpen] =
    useState(false);
  const closeEventDetailsDialog = () => {
    setIsEventDetailsDialogOpen(false);
  };

  const isVisita = (evento: Visita | Oficina): evento is Visita => {
    return "organizador" in evento;
  };

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
    <div className="flex items-center justify-between">
      <div className="my-1">
        <h3 className="font-medium">
          {isVisita(evento) ? "Visitação" : evento.titulo}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {`${dataEvento(evento)} - ${horaEvento(evento)}`}
        </p>
      </div>
      <Button
        onClick={() => {
          setIsEventDetailsDialogOpen(true);
        }}
        variant={"secondary"}
      >
        Detalhes
      </Button>
      <EventDetailsDialog
        closeEventDetailsDialog={closeEventDetailsDialog}
        event={evento}
        isEventDetailsDialogOpen={isEventDetailsDialogOpen}
      />
    </div>
  );
}
