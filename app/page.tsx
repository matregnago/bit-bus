import InfoCards from "@/components/dashboard/generalInfoCards";
import UpcomingEventsCard from "@/components/dashboard/upcomingEventsCard";
import { NavBar } from "@/components/global/navbar";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="mx-40">
        <h1 className="text-black text-3xl font-bold mt-32 mb-6">Dashboard</h1>
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
    </div>
  );
}
