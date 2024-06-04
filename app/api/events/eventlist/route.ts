import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const returnVisita = await prisma.visita.findMany({
    include: {
      local: true,
      organizador: true,
      visitantes: true
    }
  })
  const returnOficina = await prisma.oficina.findMany({
    include: {
      local: true,
      palestrante: true,
      visitantes: true
    }
  })

  const returnObject = [...returnVisita, ...returnOficina]
  return NextResponse.json(returnObject)
}
