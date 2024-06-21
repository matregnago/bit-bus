import { DoacaoDinheiro, DoacaoItem } from "@/types";
import { notFound } from "next/navigation";

interface DoacaoDinheiroCardProps {
  doacao: DoacaoDinheiro;
}

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/donation/moneydonation`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch event list");
  }
  const data: DoacaoDinheiro[] = await res.json();
  const doacaoDinheiro = data;
  return doacaoDinheiro.map((doacao) => ({
    id: doacao.id,
  }));
}

const DoacaoDinheiroCard = ({ doacao }: DoacaoDinheiroCardProps) => {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-5">Doação em Dinheiro</h1>
      <div className="flex">
        <h1 className="font-bold">Dinheiro: </h1>
        <p className="mx-2">R$ {doacao.quantiaDinheiro}</p>
      </div>
      <div className="flex">
        <h1 className="font-bold">Doador: </h1>
        <p className="mx-2">{doacao.doador.nome}</p>
      </div>
    </div>
  );
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/donation/moneydonation?id=${id}`
  );
  const doacao: DoacaoDinheiro = await data.json();

  if (doacao === null) {
    notFound();
  }
  return (
    <>
      <DoacaoDinheiroCard doacao={doacao} />
    </>
  );
}
