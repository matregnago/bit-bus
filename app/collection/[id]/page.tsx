import { dateFormatter } from "@/lib/dateformatter";
import { Item } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
  page: string;
}

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
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

const ItemCard = ({ item, page }: ItemInterface) => {
  let doacaoItem;
  if (item.DoacaoItem.length > 0) {
    doacaoItem = item.DoacaoItem[0];
    if (doacaoItem != undefined) {
      const dataHoraDoacao = dateFormatter(new Date(doacaoItem.dataCriacao));
      doacaoItem.dataCriacao = dataHoraDoacao.dia;
    }
  }
  return (
    <>
      <title>{`Detalhes - ${item.nome}`}</title>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        {page == "donation" ? (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/donation">Doações</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Detalhes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        ) : (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/collection">Acervo</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Detalhes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}
        <div className="pb-4">
          <h1 className="text-3xl font-bold">{item.nome}</h1>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
          <div className="overflow-hidden rounded-lg shadow-lg w-[300px] h-[300px] p-4">
            <img
              src={item.foto}
              alt="Item do museu"
              width={300}
              height={300}
              className="object-cover"
            />
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl items-center">
            <div className="grid gap-1">
              <p className="text-sm font-medium">Ano</p>
              <p>{item.ano}</p>
            </div>
            <div className="grid gap-1">
              <p className="text-sm font-medium">Quantidade</p>
              <p>{item.quantidade}</p>
            </div>
            <div className="grid gap-1">
              <p className="text-sm font-medium">Tipo</p>
              <p>{item.tipo}</p>
            </div>
            <div className="grid gap-1">
              <p className="text-sm font-medium">Classificação</p>
              <p>{item.classificacao}</p>
            </div>
            <div className="grid gap-1">
              <p className="text-sm font-medium">Número de Exibição</p>
              <p>{item.prateleira}</p>
            </div>
            <div className="grid gap-1">
              <p className="text-sm font-medium">Link</p>
              <Link href={""}>Clique aqui</Link>
            </div>
            {item.DoacaoItem.length > 0 &&
            doacaoItem &&
            item.DoacaoItem[0] !== undefined ? (
              <div className="grid gap-1">
                <p className="text-sm font-medium text-black">Doado por:</p>
                <p>
                  {`${item.DoacaoItem[0].doador.nome} (${item.DoacaoItem[0].doador.email}) em ${doacaoItem.dataCriacao}`}
                </p>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="col-span-2 grid gap-1">
          <p className="text-sm font-medium">Descrição</p>
          <p className="text-muted-foreground">{item.informacoes}</p>
        </div>
      </div>
    </>
  );
};

export default async function Page({ params, searchParams }: Props) {
  const { id } = params;
  const page = searchParams.page;
  let pageAdress: string;

  if (typeof page == "string" && page == "donation") {
    pageAdress = page;
  } else {
    pageAdress = "collection";
  }
  console.log(pageAdress);
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
        <ItemCard item={item} page={pageAdress} />
      </ScrollArea>
    </>
  );
}
