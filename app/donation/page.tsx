import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DoacaoDinheiro, DoacaoItem } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

type DoacaoApiResponse = {
  doacoes: (DoacaoDinheiro | DoacaoItem)[];
};

type DoacaoDinheiroCardProps = {
  doacao: DoacaoDinheiro;
};
type DoacaoItemCardProps = {
  doacao: DoacaoItem;
};

const DoacaoDinheiroCard = ({ doacao }: DoacaoDinheiroCardProps) => (
  <Card className="min-w-80">
    <CardHeader>
      <CardTitle>Doacao Dinheiro</CardTitle>
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent>
      <Badge variant="outline">Dinheiro</Badge>
      <p>Dinheiro: {doacao.quantiaDinheiro}</p>
    </CardContent>
  </Card>
);

const DoacaoItemCard = ({ doacao }: DoacaoItemCardProps) => (
  <Card className="min-w-80">
    <CardHeader>
      <CardTitle>Doacao Item</CardTitle>
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent>
      <Badge variant="outline">Item</Badge>
      <p>{doacao.item.nome}</p>
    </CardContent>
  </Card>
);

const DonationList = ({ doacoes }: DoacaoApiResponse) => {
  const isDoacaoDinheiro = (
    doacao: DoacaoDinheiro | DoacaoItem
  ): doacao is DoacaoDinheiro => {
    return doacao.tipo === "Dinheiro";
  };
  const isDoacaoItem = (
    doacao: DoacaoDinheiro | DoacaoItem
  ): doacao is DoacaoItem => {
    return doacao.tipo === "Item";
  };
  return (
    <div className="">
      {doacoes.map((doacao) => {
        if (isDoacaoDinheiro(doacao)) {
          return <DoacaoDinheiroCard key={doacao.id} doacao={doacao} />;
        } else if (isDoacaoItem(doacao)) {
          return <DoacaoItemCard key={doacao.id} doacao={doacao} />;
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default async function EventPage() {
  const data = await fetch("http://localhost:3000/api/donation", {
    cache: "no-cache",
  });
  const { doacoes }: DoacaoApiResponse = await data.json();
  console.log(doacoes);
  return (
    <ScrollArea className="h-full">
      <DonationList doacoes={doacoes} />
    </ScrollArea>
  );
}
