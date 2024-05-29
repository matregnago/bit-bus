import InfoCards from "@/components/dashboard/generalInfoCards";
import UpcomingEventsCard from "@/components/dashboard/upcomingEventsCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function Home() {
  return (
    <ScrollArea className="h-full">
      <div className="mx-8">
        <h1 className="text-black text-3xl font-bold mt-10 mb-6">Dashboard</h1>
        <InfoCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
          <Card className="col-span-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-lg">
                Gráfico futuramente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Conteudo do gráfico</p>
            </CardContent>
          </Card>
          <UpcomingEventsCard />
        </div>
      </div>
    </ScrollArea>
  );
}
