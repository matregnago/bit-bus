import { DoacaoDinheiro, DoacaoItem } from "@/types";
import { notFound } from "next/navigation";

interface DoacaoItemCardProps {
  doacao: DoacaoItem;
}
interface DoacaoDinheiroCardProps {
  doacao: DoacaoDinheiro;
}

export async function generateStaticParams() {
  const data: { doacaoDinheiro: DoacaoDinheiro[]; doacaoItem: DoacaoItem[] } =
    await fetch("http://localhost:3000/api/donation").then((res) => res.json());
  const { doacaoDinheiro, doacaoItem } = data;
  const doacoes = [...doacaoDinheiro, ...doacaoItem];
  return doacoes.map((doacao) => ({
    id: doacao.id,
  }));
}

const DoacaoItemCard = ({ doacao }: DoacaoItemCardProps) => {
  return (
    <div>
      <h1>Item: {doacao.item.nome}</h1>
      <h1>Doador:{doacao.doador.nome}</h1>
    </div>
  );
};

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
  const data = await fetch(`http://localhost:3000/api/donation/${id}`);
  const doacao: DoacaoDinheiro | DoacaoItem = await data.json();
  const isDoacaoItem = (
    doacao: DoacaoDinheiro | DoacaoItem
  ): doacao is DoacaoItem => {
    return "item" in doacao;
  };

  if (doacao === null) {
    notFound();
  }
  return (
    <>
      {isDoacaoItem(doacao) ? (
        <DoacaoItemCard doacao={doacao} />
      ) : (
        <DoacaoDinheiroCard doacao={doacao} />
      )}
    </>
  );
}
