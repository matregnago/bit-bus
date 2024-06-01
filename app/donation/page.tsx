import { DoacaoDinheiro, DoacaoItem } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DoacaoDinheiroDataTable } from "./moneyDonationTable/data-table";
import { columnsMoneyDonationTable } from "./moneyDonationTable/columns";
import { columnsItemDonationTable } from "./itemDonationTable/columns";

import { DoacaoItemDataTable } from "./itemDonationTable/data-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface DoacaoApiResponse {
  doacaoDinheiro: DoacaoDinheiro[];
  doacaoItem: DoacaoItem[];
}

const getDonations = async (): Promise<DoacaoApiResponse> => {
  const defaultResponse: DoacaoApiResponse = {
    doacaoDinheiro: [],
    doacaoItem: [],
  };
  try {
    const res = await fetch("http://localhost:3000/api/donation", {
      cache: "no-cache",
    });
    const doacoes: DoacaoApiResponse = await res.json();
    return doacoes;
  } catch (error) {
    console.error(error);
    return defaultResponse;
  }
};

export default async function EventPage() {
  const { doacaoDinheiro, doacaoItem } = await getDonations();
  return (
    <ScrollArea className="h-full">
      <div className="mx-7 flex items-start justify-between">
        <h1 className="font-bold text-xl">Doacoes de dinheiro</h1>
        <Link className="" href="/donation/create">
          <Button>Criar doação</Button>
        </Link>
      </div>
      <DoacaoDinheiroDataTable
        columns={columnsMoneyDonationTable}
        data={doacaoDinheiro}
      />
      <h1 className="font-bold text-xl">Doacoes de Itens</h1>
      <DoacaoItemDataTable
        columns={columnsItemDonationTable}
        data={doacaoItem}
      />
    </ScrollArea>
  );
}
