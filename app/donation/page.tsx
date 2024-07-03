import { DoacaoDinheiro, DoacaoItem } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DoacaoDinheiroDataTable } from "./moneyDonationTable/data-table";
import { columnsMoneyDonationTable } from "./moneyDonationTable/columns";
import { columnsItemDonationTable } from "./itemDonationTable/columns";

import { DoacaoItemDataTable } from "./itemDonationTable/data-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

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
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/donation`, {
      cache: "no-store",
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
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <title key="title">Doações</title>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Doações</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie as doações recebidas.
            </p>
          </div>
          <Link href="/donation/create">
            <Button className="text-xs md:text-sm">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Doação
            </Button>
          </Link>
        </div>
        <Separator />
        <div>
          <h1 className="font-bold text-xl mt-6 mb-3">Doações de Itens</h1>
          <DoacaoItemDataTable
            columns={columnsItemDonationTable}
            data={doacaoItem}
          />
          <h1 className="font-bold text-xl my-3">Doações Monetárias</h1>
          <DoacaoDinheiroDataTable
            columns={columnsMoneyDonationTable}
            data={doacaoDinheiro}
          />
        </div>
      </div>
    </ScrollArea>
  );
}
