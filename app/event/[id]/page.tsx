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
  return (
    <div className="">
      <title>{`Detalhes - ${evento.titulo}`}</title>
      <h1 className="text-3xl font-bold tracking-tight text-center">
        {evento.titulo}
      </h1>
      <div className="grid grid-cols-2 gap-3 mt-10 text-center">
        <Card className="text-lg">
          <CardHeader>
            <CardTitle>Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{dia}</p>
          </CardContent>
        </Card>
        <Card className="text-lg">
          <CardHeader>
            <CardTitle>Horario</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{hora}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Local</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{`${evento.local.rua}, ${evento.local.bairro}`}</p>
            <p>{`CEP: ${evento.local.cep}, ${evento.local.cidade} - ${evento.local.estado}`}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Detalhes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{`Duração: ${evento.duracao}`}</p>
            <p>{`Resumo: ${evento.resumo}`}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const VisitaCard = ({ evento }: VisitaCardProps) => {
  const { dia, hora } = dateFormatter(evento.dataHora);
  return (
    <div className="">
      <title>Detalhes - Visitação</title>
      <h1 className="text-3xl font-bold tracking-tight text-center">
        Visitação
      </h1>
      <div className="mt-10 text-center">
        <Card className="grid grid-cols-3 p-8">
          <p className="col-span-1 font-bold text-lg mb-3">Data</p>
          <p className="col-span-1 font-bold text-lg mb-3">Horário</p>
          <p className="col-span-1 font-bold text-lg mb-3">Local</p>

          <p className="text-lg col-span-1">{dia}</p>
          <p className="text-lg col-span-1">{hora}</p>
          <div className="col-span-1">
            <p>{`${evento.local.rua}, ${evento.local.bairro}`}</p>
            <p>{`CEP: ${evento.local.cep}, ${evento.local.cidade} - ${evento.local.estado}`}</p>
          </div>
        </Card>
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
