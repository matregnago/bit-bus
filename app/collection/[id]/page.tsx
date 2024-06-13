import { Item } from "@/types";
import { notFound } from "next/navigation";

interface ItemInterface {
  item: Item;
}

export async function generateStaticParams() {
  const data: Item[] = await fetch("http://localhost:3000/api/items").then(
    (res) => res.json()
  );
  const items = data;
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
  const data = await fetch(`http://localhost:3000/api/items/${id}`);
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
