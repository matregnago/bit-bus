import InfoCards from "@/components/dashboard/generalInfoCards";
import UpcomingEventsCard from "@/components/dashboard/upcomingEventsCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/dashboard/overviewChart";
import { Oficina, Visita } from "@/types";

type ChartData = {
  name: string;
  total: number;
};

interface EventApiResponse {
  upcomingEvents: (Oficina | Visita)[];
  pastEvents: (Oficina | Visita)[];
}

const getChartData = async (): Promise<ChartData[]> => {
  const requestChartData = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/dashboard/chart`,
    {
      cache: "no-store",
    }
  );
  return requestChartData.json();
};

const getUpcomingCardsData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/events?limit=6`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const data: EventApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

export default async function Home() {
  let chartData: ChartData[];
  try {
    chartData = await getChartData();
  } catch (error) {
    chartData = [];
  }

  let upcomingEvents: (Oficina | Visita)[] = [];
  try {
    const events = await getUpcomingCardsData();
    if (events != undefined) {
      upcomingEvents = events.upcomingEvents;
    }
  } catch (error) {
    upcomingEvents = [];
  }

  return (
    <ScrollArea className="h-full">
      <title key="title">Dashboard</title>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <h1 className="text-3xl font-bold tracking-tight mb-5">Dashboard</h1>
        <InfoCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
          <Card className="col-span-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium mb-1">
                Doações recebidas por mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Overview data={chartData} />
            </CardContent>
          </Card>
          <UpcomingEventsCard upcomingEvents={upcomingEvents} />
        </div>
      </div>
    </ScrollArea>
  );
}
