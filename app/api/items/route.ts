import { NextResponse } from 'next/server'
import { PrismaClient, Prisma } from '@prisma/client'
import { Item } from '@/types'

interface APIRequestProps {
  searchTerm: string
}

const prisma = new PrismaClient()

export async function POST(request: Request) {
  console.log(request)
  const { searchTerm }: APIRequestProps = await request.json()
  const users = await prisma.itemAcervo.findMany({
    where: {
      nome: {
        contains: searchTerm,
        mode: 'insensitive'
      }
    }
  })
  const retorno = users.map(user => {
    return { label: user.nome, value: user.nome }
  })
  return NextResponse.json({ opcoes: retorno })
}
