import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const getItems = async () => {
try {
  const res = await fetch('http://localhost:3000/api/items')
  const items = await res.json();
  return items
} catch (error) {
  console.error(error)
}
};

export default async function ShowcaseItems() {
  const items = await getItems();
  return (
      <div>
        {items.map((item) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild className=" cursor-pointer">
              <Card className="w-60 text-center" key={item.id}>
                <CardHeader>
                  <CardTitle>{item.nome}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src={item.foto} />
                  <p>Ano: {item.ano}</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{item.nome}</DialogTitle>
                <DialogDescription>
                  <img src={item.foto} />
                  <ul>
                    <li>ano: {item.ano}</li>
                    <li>tipo: {item.tipo}</li>
                    <li>dim: {item.dimensoes}</li>
                    <li>info: {item.informacoes}</li>
                  </ul>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </div>
  );
}
