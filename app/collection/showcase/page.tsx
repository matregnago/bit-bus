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
  const items = [
    {
      id: "3efef3d7-9b87-486c-8f92-166b8ef85503",
      nome: "Memoria A",
      ano: 2003,
      quantidade: 1,
      tipo: "Memoria",
      dimensoes: "10x12",
      informacoes: "memoria bem maneira",
      links:
        "https://www.megabytezone.com.br/memoria-ram-kingston-fury-beast-rgb-16gb-ddr4-kf432c16bb1a",
      foto: "https://images.tcdn.com.br/img/img_prod/1228199/memoria_ram_kingston_fury_beast_rgb_16gb_ddr4_kf432c16bb1a_91_1_73e1fe3c219366ac6115e6ee0c979c6b.png",
      prateleira: "asdasd",
      classificacao: "123123131",
    },
    {
      id: "15b77d59-32ae-41d9-aa17-e0dd6ac57cb3",
      nome: "Processador A",
      ano: 2010,
      quantidade: 1,
      tipo: "Processador",
      dimensoes: "3x3",
      informacoes: "manerio demais esse",
      links:
        "https://www.kabum.com.br/produto/497578/processador-intel-core-i5-14600k-14-geracao-5-3-ghz-max-turbo-cache-24mb-14-nucleos-20-threads-lga1700-bx8071514600k",
      foto: "https://images.kabum.com.br/produtos/fotos/497578/processador-intel-core-i5-14600k-bx8071514600k_1697723450_original.jpg",
      prateleira: "qeqweqw",
      classificacao: "1312312312",
    },
    {
      id: "b249d076-cd00-4362-b915-a525e541aebc",
      nome: "Placa Mae X",
      ano: 2021,
      quantidade: 2,
      tipo: "Placa Mae",
      dimensoes: "varios",
      informacoes: "m-ATX maneira dmsss",
      links:
        "https://www.kabum.com.br/produto/280890/placa-mae-msi-a520m-a-pro-amd-am4-matx-ddr4",
      foto: "https://images.kabum.com.br/produtos/fotos/280890/placa-mae-msi-a520m-a-pro-amd-am4-matx-ddr4_1646852577_gg.jpg",
      prateleira: "asdasdadsa",
      classificacao: "1231313123",
    },
  ];
  return items;
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
