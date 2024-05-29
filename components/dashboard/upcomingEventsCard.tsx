import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";

export default function UpcomingEventsCard() {
  return (
    <Card className="col-span-3">
      <CardHeader className="">
        <CardTitle className="text-lg font-medium">Proximos Eventos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Introducao a computacao</h3>
            <p className="text-gray-500 dark:text-gray-400">June 1, 2023</p>
          </div>
          <Button variant="secondary">Detalhes</Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Fundamentos de IA</h3>
            <p className="text-gray-500 dark:text-gray-400">June 1, 2023</p>
          </div>
          <Button variant="secondary">Detalhes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
