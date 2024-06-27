import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import next from "next";
import { format, subMonths } from "date-fns";

type ChartData = {
  name: string;
  total: number;
};

const prisma = new PrismaClient();

export async function GET() {
  const endDate = new Date();
  const startDate = subMonths(endDate, 11);

  const doacaoItensGrouped = await prisma.doacaoItem.groupBy({
    by: ["dataCriacao"],
    where: {
      dataCriacao: {
        gte: startDate,
        lte: endDate,
      },
    },
    _count: {
      id: true,
    },
  });

  const doacaoDinheiroGrouped = await prisma.doacaoDinheiro.groupBy({
    by: ["dataCriacao"],
    where: {
      dataCriacao: {
        gte: startDate,
        lte: endDate,
      },
    },
    _count: {
      id: true,
    },
  });

  const itensDataFormat: ChartData[] = doacaoItensGrouped.map((item) => {
    return {
      name: format(item.dataCriacao, "yyyy-MM"),
      total: item._count.id,
    };
  });

  const moneyDataFormat: ChartData[] = doacaoDinheiroGrouped.map((item) => {
    return {
      name: format(item.dataCriacao, "yyyy-MM"),
      total: item._count.id,
    };
  });

  const completeDataFormat = [...itensDataFormat, ...moneyDataFormat];

  const result = completeDataFormat.reduce(
    (acc: ChartData[], obj: ChartData) => {
      const existing = acc.find((item) => item.name === obj.name);
      if (existing) {
        existing.total += obj.total;
      } else {
        acc.push({ ...obj });
      }
      return acc;
    },
    []
  );

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const formatDateString = (dateString: string): string => {
    const [year, month] = dateString.split("-");
    const monthName = monthNames[parseInt(month) - 1];
    return `${monthName} ${year}`;
  };

  const newArray = result.map((item) => ({
    ...item,
    name: formatDateString(item.name),
  }));

  // Ordenar os itens pela data
  newArray.sort((a, b) => {
    const [aMonth, aYear] = a.name.split(" ");
    const [bMonth, bYear] = b.name.split(" ");
    const aDate = new Date(`${aYear}-${monthNames.indexOf(aMonth) + 1}-01`);
    const bDate = new Date(`${bYear}-${monthNames.indexOf(bMonth) + 1}-01`);
    return aDate - bDate;
  });

  return NextResponse.json(newArray);
}
