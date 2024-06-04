import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request, context: any) {
  // const eventId = req
  const { params } = context
  const id = params.eventId
  const returnVisita = await prisma.visita.findUnique({
    where: {
      id
    },
    include: {
      local: true,
      organizador: true,
      visitantes: true
    }
  })
  if (returnVisita != null) {
    return NextResponse.json(returnVisita)
  } else {
    const returnOficina = await prisma.oficina.findUnique({
      where: {
        id
      },
      include: {
        local: true,
        palestrante: true,
        visitantes: true
      }
    })
    return NextResponse.json(returnOficina)
  }
}
