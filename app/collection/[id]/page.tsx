import { Item } from "@/types";
import { notFound } from "next/navigation";

interface ItemInterface {
  item: Item;
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
  return (
    <div>
      <h1>Nome: {item.nome}</h1>
      <h1>Ano: {item.ano}</h1>
    </div>
  );
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/items/${id}`);
  const { item }: ItemInterface = await data.json();
  if (item === null) {
    notFound();
  }
  return (
    <>
      <ItemCard item={item} />
    </>
  );
}
