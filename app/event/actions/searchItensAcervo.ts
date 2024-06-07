"use server";

import { Item } from "@/types";

interface ItemAPIResponse {
  item: Item;
}

export default async function searchItems(
  itens: { label: string; value: string; disable?: boolean | undefined }[]
): Promise<Item[]> {
  let itensArray: Item[] = [];
  for (let i = 0; i < itens.length; i++) {
    const retorno = await fetch(
      `http://localhost:3000/api/items/${itens[i].value}`
    );
    let apiret: ItemAPIResponse | null = await retorno.json();
    if (apiret !== null) {
      const { item } = apiret;
      if (item != undefined) {
        itensArray.push(item);
      }
    }
  }
  return itensArray;
}
