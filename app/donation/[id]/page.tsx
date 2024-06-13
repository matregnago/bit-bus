import { DoacaoDinheiro, DoacaoItem } from "@/types";
import { notFound } from "next/navigation";

interface DoacaoDinheiroCardProps {
  doacao: DoacaoDinheiro;
}

export async function generateStaticParams() {
  const data: DoacaoDinheiro[] = await fetch(
    "http://localhost:3000/api/donation/moneydonation"
  ).then((res) => res.json());
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
    `http://localhost:3000/api/donation/moneydonation?id=${id}`
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
