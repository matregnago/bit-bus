import { Item, Oficina, Visita } from "@/types";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { dateFormatter } from "@/lib/dateformatter";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
interface OficinaCardProps {
  evento: Oficina;
}
interface VisitaCardProps {
  evento: Visita;
}

export async function generateStaticParams() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/events/eventlist`
  );
  const eventos: (Visita | Oficina)[] = await data.json();
  return eventos.map((evento) => ({
    id: evento.id,
  }));
}

const OficinaCard = ({ evento }: OficinaCardProps) => {
  const { dia, hora } = dateFormatter(evento.dataHora);
  const LocalIcon = Icons["local"];
  const CalendarioIcon = Icons["calendario"];
  const RelogioIcon = Icons["relogio"];
  const TimerIcon = Icons["timer"];
  const UserIcon = Icons["usuario"];
  return (
    <div className="">
      <title>{`Detalhes - ${evento.titulo}`}</title>
      <h1 className="text-3xl font-bold tracking-tight">{evento.titulo}</h1>
      <div className="flex items-center gap-4 text-muted-foreground">
        <div className="flex items-center gap-2">
          <CalendarioIcon className="w-4 h-4" />
          <span>{dia}</span>
        </div>
        <div className="flex items-center gap-2">
          <RelogioIcon className="w-4 h-4" />
          <span>{hora}</span>
        </div>
        <div className="flex items-center gap-2">
          <TimerIcon className="w-4 h-4" />
          <span>{evento.duracao}</span>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <LocalIcon className="w-4 h-4" />
          <span>
            {evento.local.rua}, {evento.local.bairro}
          </span>
        </div>
        <p className="ml-6">{`CEP: ${evento.local.cep} - ${evento.local.cidade}/${evento.local.estado}`}</p>
      </div>
      <div className="prose max-w-none">
        <p>{evento.resumo}</p>
      </div>
      <div>
        <h2 className="text-xl font-bold tracking-tight mt-10">Palestrante</h2>
        <div className="flex gap-2 items-center">
          <UserIcon className="w-4 h-4" />
          <p>
            {evento.palestrante.nome} ({evento.palestrante.email})
          </p>
        </div>
      </div>
    </div>
  );
};

const VisitaCard = ({ evento }: VisitaCardProps) => {
  const { dia, hora } = dateFormatter(evento.dataHora);
  const LocalIcon = Icons["local"];
  const CalendarioIcon = Icons["calendario"];
  const RelogioIcon = Icons["relogio"];
  const TimerIcon = Icons["timer"];
  const UserIcon = Icons["usuario"];
  return (
    <div className="">
      <title>{`Detalhes - Visita`}</title>
      <h1 className="text-3xl font-bold tracking-tight">Visita</h1>
      <div className="flex items-center gap-4 text-muted-foreground">
        <div className="flex items-center gap-2">
          <CalendarioIcon className="w-4 h-4" />
          <span>{dia}</span>
        </div>
        <div className="flex items-center gap-2">
          <RelogioIcon className="w-4 h-4" />
          <span>{hora}</span>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <LocalIcon className="w-4 h-4" />
          <span>
            {evento.local.rua}, {evento.local.bairro}
          </span>
        </div>
        <p className="ml-6">{`CEP: ${evento.local.cep} - ${evento.local.cidade}/${evento.local.estado}`}</p>
      </div>
      <div>
        <h2 className="text-xl font-bold tracking-tight mt-10">Organizador</h2>
        <div className="flex gap-2 items-center">
          <UserIcon className="w-4 h-4" />
          <p>
            {evento.organizador.nome} ({evento.organizador.email})
          </p>
        </div>
      </div>
    </div>
  );
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/events/${id}`
  );
  const evento: Visita | Oficina = await data.json();
  const isVisita = (evento: Visita | Oficina): evento is Visita => {
    return "organizador" in evento;
  };
  if (evento === null) {
    notFound();
  }
  return (
    <ScrollArea className="h-full">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Link href={`/event`}>
          <Button>Voltar</Button>
        </Link>
        {isVisita(evento) ? (
          <VisitaCard evento={evento} />
        ) : (
          <OficinaCard evento={evento} />
        )}
        <h2 className="text-xl font-bold tracking-tight mt-10">Visitantes</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {evento.visitantes.map((visitante) => {
              return (
                <TableRow key={visitante.id}>
                  <TableCell>{visitante.nome}</TableCell>
                  <TableCell>{visitante.email}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <h2 className="text-xl font-bold tracking-tight mt-10">
          Itens do acervo
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Ano</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {evento.itensAcervo.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.tipo}</TableCell>
                  <TableCell>{item.ano}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </ScrollArea>
  );
}
