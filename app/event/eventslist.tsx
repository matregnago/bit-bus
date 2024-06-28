"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Oficina, Visita, Event } from "@/types";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { dateFormatter } from "@/lib/dateformatter";
import { Ellipsis, EyeIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { MoreHorizontal } from "lucide-react";
import deleteWorkshopAction from "./actions/deleteWorkshop";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import deleteVisitAction from "./actions/deleteVisit";

interface EventListProps {
  events: Event[];
}
interface OficinaCardProps {
  oficina: Oficina;
}

interface VisitaCardProps {
  visita: Visita;
}

const VisitaItem = ({ visita }: VisitaCardProps) => {
  const IconEdit = Icons["edit"];
  const IconDelete = Icons["delete"];
  const IconDetails = Icons["details"];
  const IconCalendario = Icons["calendario"];
  const IconRelogio = Icons["relogio"];
  const router = useRouter();
  const { toast } = useToast();
  const { dia, hora } = dateFormatter(visita.dataHora);
  const onConfirm = async () => {
    if (visita.id !== undefined) {
      try {
        await deleteVisitAction(visita.id);
        router.refresh();
        toast({
          title: "Sucesso!",
          description: "A visitação foi removida sucesso!",
        });
      } catch (error) {
        toast({
          title: "Erro!",
          description: `Erro ao excluir visita: ${error}!`,
        });
      }
    }
  };
  return (
    <Card className="shadow-md">
      <CardHeader className="flex justify-between">
        <div className="flex justify-between">
          <CardTitle>Visita</CardTitle>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-10 h-10 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/event/${visita.id}`}>
                  <DropdownMenuItem>
                    <IconDetails className="mr-2 h-4 w-4" /> Detalhes
                  </DropdownMenuItem>
                </Link>
                {/* <DropdownMenuItem>
              <IconEdit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem> */}
                <AlertDialogTrigger className="w-full">
                  <DropdownMenuItem>
                    <IconDelete className="mr-2 h-4 w-4" />
                    Excluir
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Você quer excluir essa visita?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser desfeita. A visita será excluida do
                  banco de dados.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={onConfirm}>
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <CardDescription className="">
          Evento de visitação destinado ao público.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2">
          <IconCalendario className="w-4 h-4" />
          <p>Data: {dia}</p>
          <IconRelogio className="w-4 h-4" />
          <p>Horario: {hora}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const OficinaItem = ({ oficina }: OficinaCardProps) => {
  const IconEdit = Icons["edit"];
  const IconDelete = Icons["delete"];
  const IconDetails = Icons["details"];
  const IconCalendario = Icons["calendario"];
  const IconRelogio = Icons["relogio"];
  const router = useRouter();
  const { toast } = useToast();
  const { dia, hora } = dateFormatter(oficina.dataHora);
  const onConfirm = async () => {
    if (oficina.id !== undefined) {
      try {
        await deleteWorkshopAction(oficina.id);
        router.refresh();
        toast({
          title: "Sucesso!",
          description: "A oficina foi removida sucesso!",
        });
      } catch (error) {
        toast({
          title: "Erro!",
          description: `Erro ao excluir oficina: ${error}!`,
        });
      }
    }
  };
  return (
    <Card className="shadow-md">
      <CardHeader className="flex justify-between">
        <div className="flex justify-between">
          <CardTitle>{oficina.titulo}</CardTitle>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-10 h-10 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/event/${oficina.id}`}>
                  <DropdownMenuItem>
                    <IconDetails className="mr-2 h-4 w-4" /> Detalhes
                  </DropdownMenuItem>
                </Link>
                {/* <DropdownMenuItem>
              <IconEdit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem> */}
                <AlertDialogTrigger className="w-full">
                  <DropdownMenuItem>
                    <IconDelete className="mr-2 h-4 w-4" />
                    Excluir
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Você quer excluir essa oficina?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser desfeita. A oficina será excluida do
                  banco de dados.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={onConfirm}>
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <CardDescription className="line-clamp-3">
          {oficina.resumo}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <IconCalendario className="w-4 h-4" />
          <p>Data: {dia}</p>
          <IconRelogio className="w-4 h-4" />
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
    <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
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
export default EventList;
