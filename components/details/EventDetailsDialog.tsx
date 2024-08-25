import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarDays, Clock, MapPin, User } from "lucide-react";

import { Oficina, Visita } from "@/types";
import { dateFormatter } from "@/lib/dateformatter";

interface EventDetailsDialogProps {
  closeEventDetailsDialog: () => void;
  isEventDetailsDialogOpen: boolean;
  event: Oficina | Visita;
}

export default function EventDetailsDialog({
  closeEventDetailsDialog,
  event,
  isEventDetailsDialogOpen,
}: EventDetailsDialogProps) {
  const isVisita = (evento: Visita | Oficina): evento is Visita => {
    return "organizador" in evento;
  };
  const { dia, hora } = dateFormatter(event.dataHora);
  const endereco = `${event.local.rua}, ${event.local.bairro}, ${event.local.cidade} - ${event.local.estado}.`;
  return (
    <Dialog
      open={isEventDetailsDialogOpen}
      onOpenChange={closeEventDetailsDialog}
    >
      {!isVisita(event) ? (
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{event.titulo}</DialogTitle>
            <DialogDescription>Detalhes da oficina</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span>{dia}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>
                  {hora} (Duração: {event.duracao})
                </span>
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className=" max-w-72">{endereco}</span>
                  <span>{`CEP: ${event.local.cep}`}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Descrição</h4>
              <p>{event.resumo}</p>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <p>
                Palestrante:{" "}
                <span>
                  {event.palestrante.nome} ({event.palestrante.email})
                </span>
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Itens do acervo</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Ano</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {event.itensAcervo.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.nome}</TableCell>
                      <TableCell>{item.ano}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Visitantes presentes</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {event.visitantes.map((visitor, index) => (
                    <TableRow key={index}>
                      <TableCell>{visitor.nome}</TableCell>
                      <TableCell>{visitor.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      ) : (
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Visitação</DialogTitle>
            <DialogDescription>Detalhes da visitação</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span>{dia}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{hora}</span>
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className=" max-w-72">{endereco}</span>
                  <span>{`CEP: ${event.local.cep}`}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>Responsável: {event.organizador.nome}</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Itens do acervo</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Ano</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {event.itensAcervo.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.nome}</TableCell>
                      <TableCell>{item.ano}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Visitantes presentes</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {event.visitantes.map((visitor, index) => (
                    <TableRow key={index}>
                      <TableCell>{visitor.nome}</TableCell>
                      <TableCell>{visitor.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
