import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InfoCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">
            Total Artefatos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">124,567</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            +8.2% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">
            Eventos Realizados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">124,567</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            +8.2% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">
            Visitantes Mensais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">124,567</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            +8.2% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">
            Doações Recebidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">124,567</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            +8.2% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
