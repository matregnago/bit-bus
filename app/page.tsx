import InfoCards from "@/components/dashboard/generalInfoCards";
import UpcomingEventsCard from "@/components/dashboard/upcomingEventsCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/dashboard/overviewChart";

type ChartData = {
  name: string;
  total: number;
};

const getChartData = async (): Promise<ChartData[]> => {
  const requestChartData = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/dashboard/chart`,
    {
      cache: "no-store",
    }
  );
  return requestChartData.json();
};

export default async function Home() {
  const chartData = await getChartData();
  return (
    <ScrollArea className="h-full">
      <title key="title">Dashboard</title>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <h1 className="text-3xl font-bold tracking-tight mb-5">Dashboard</h1>
        <InfoCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
          <Card className="col-span-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                Doações recebidas por mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Overview data={chartData} />
            </CardContent>
          </Card>
          <UpcomingEventsCard />
        </div>
      </div>
    </ScrollArea>
  );
}
