import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Oficina, Visita } from "@/types";
import { Icons } from "@/components/icons";

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
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/dashboard/cards`,
      {
        cache: "no-cache",
      }
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
  let data;
  const UserIcon = Icons["usuario"];
  const DiscoIcon = Icons["disco"];
  const EventIcon = Icons["eventos"];
  const DoacoesIcon = Icons["doacoes"];
  try {
    data = await getData();
  } catch (error) {
    data = {
      artefatos: 0,
      eventos: 0,
      visitantes: 0,
      doacoes: 0,
    };
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">
            Total Artefatos
          </CardTitle>
          <DiscoIcon className="h-4 w-4" />
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
          <EventIcon className="h-4 w-4" />
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
          <UserIcon className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.visitantes}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">
            Doações Recebidas
          </CardTitle>
          <DoacoesIcon className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.doacoes}</div>
        </CardContent>
      </Card>
    </div>
  );
}
