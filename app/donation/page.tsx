import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const DoacaoDinheiro = ({ doacao }) => (
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

const DoacaoItem = ({ doacao }) => (
  <Card className="">
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

const DonationList = ({ donations }) => {
  return (
    <div className="">
      {donations.map((donation) => {
        if (donation.tipo === "Dinheiro") {
          return <DoacaoDinheiro key={donation.id} doacao={donation} />;
        } else if (donation.tipo === "Item") {
          return <DoacaoItem key={donation.id} doacao={donation} />;
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
  const { doacoes } = await data.json();
  console.log(doacoes);
  return (
    <ScrollArea className="h-full">
      <DonationList donations={doacoes} />
    </ScrollArea>
  );
}
