import { dateFormatter } from "@/lib/dateformatter";
import { Item } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { notFound } from "next/navigation";

export type ExtendedItem = Item & {
  DoacaoItem:
    | []
    | [
        {
          id: string;
          dataCriacao: string;
          tipo: string;
          itemAcervoId: string;
          doadorId: string;
          doador: {
            id: string;
            nome: string;
            cpf: string;
            email: string;
          };
        }
      ];
};

interface ItemInterface {
  item: ExtendedItem;
}

export async function generateStaticParams() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/items`);
  if (!data.ok) {
    throw new Error("Failed to fetch event list");
  }
  const items: Item[] = await data.json();
  return items.map((item) => ({
    id: item.id,
  }));
}

const ItemCard = ({ item }: ItemInterface) => {
  let doacaoItem;
  if (item.DoacaoItem.length > 0) {
    doacaoItem = item.DoacaoItem[0];
    if (doacaoItem != undefined) {
      const dataHoraDoacao = dateFormatter(new Date(doacaoItem.dataCriacao));
      doacaoItem.dataCriacao = dataHoraDoacao.dia;
    }
  }
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 md:p-8">
      <div className="">
        <div className="space-y-6">
          <div className="flex justify-center">
            <img
              src={item.foto}
              alt="Artifact"
              width={800}
              height={600}
              className="w-auto h-auto rounded-lg object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{item.nome}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {item.informacoes}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium">Ano</h3>
              <p className="text-gray-500 dark:text-gray-400">{item.ano}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Quantidade</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {item.quantidade}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Tipo</h3>
              <p className="text-gray-500 dark:text-gray-400">{item.tipo}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Dimensões</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {item.dimensoes}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Prateleira</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {item.prateleira}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Classificação</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {item.classificacao}
              </p>
            </div>
          </div>
          {item.DoacaoItem.length > 0 &&
          doacaoItem &&
          item.DoacaoItem[0] !== undefined ? (
            <div>
              <h3 className="text-lg font-medium">Doado por:</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {`${item.DoacaoItem[0].doador.nome} (${item.DoacaoItem[0].doador.email}) em ${doacaoItem.dataCriacao}`}
              </p>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/items/${id}?donation=true`
  );
  const { item }: ItemInterface = await data.json();
  if (item === null) {
    notFound();
  }
  return (
    <>
    <ScrollArea className="h-full">
      <ItemCard item={item} />
    </ScrollArea>
    </>
  );
}
