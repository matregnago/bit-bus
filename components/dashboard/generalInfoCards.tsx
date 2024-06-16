import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Oficina, Visita } from "@/types";

type DashboardData = {
  artefatos: number;
  eventos: number;
  visitantes: number;
  doacoes: number;
};

interface DashboardProps {
  data: DashboardData;
}

const getData = async (): Promise<DashboardData> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/dashboard/cards`
    );
    const { data }: DashboardProps = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    const defaultResponse = {
      artefatos: 0,
      eventos: 0,
      visitantes: 0,
      doacoes: 0,
    };
    return defaultResponse;
  }
};

export default async function InfoCards() {
  const data = await getData();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">
            Total Artefatos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.artefatos}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">
            Eventos Realizados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.eventos}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">
            Visitantes Totais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.visitantes}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">
            Doações Recebidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.doacoes}</div>
        </CardContent>
      </Card>
    </div>
  );
}
