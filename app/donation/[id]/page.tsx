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
    <div>
      <h1>Dinheiro: {doacao.quantiaDinheiro}</h1>
      <h1>Doador: {doacao.doador.nome}</h1>
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
