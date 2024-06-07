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
interface OficinaCardProps {
  evento: Oficina;
}
interface VisitaCardProps {
  evento: Visita;
}

export async function generateStaticParams() {
  const eventos: (Visita | Oficina)[] = await fetch(
    "http://localhost:3000/api/events/eventlist"
  ).then((res) => res.json());
  return eventos.map((evento) => ({
    id: evento.id,
  }));
}

const OficinaCard = ({ evento }: OficinaCardProps) => {
  return (
    <div className="">
      <h1 className="text-3xl font-bold tracking-tight text-center">
        {evento.titulo}
      </h1>
      <div className="grid grid-cols-3 gap-3">
        <Card className="">
          <CardHeader>
            <CardTitle>Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{evento.dataHora.toString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Horario</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{evento.dataHora.toString()}</p>
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
  return (
    <div className="">
      <h1 className="text-3xl font-bold tracking-tight text-center">
        Visitação
      </h1>
      <div className="grid grid-cols-3 gap-3">
        <Card className="">
          <CardHeader>
            <CardTitle>Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{evento.dataHora.toString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Horario</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{evento.dataHora.toString()}</p>
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
      </div>
    </div>
  );
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await fetch(`http://localhost:3000/api/events/${id}`);
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
        {isVisita(evento) ? (
          <VisitaCard evento={evento} />
        ) : (
          <OficinaCard evento={evento} />
        )}
        <h2 className="text-xl font-bold tracking-tight">Visitantes</h2>
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
        <h2 className="text-xl font-bold tracking-tight">Itens do acervo</h2>
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
