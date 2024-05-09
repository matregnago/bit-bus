import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()


export async function GET(){
    const items = await prisma.itemAcervo.findMany();
    return NextResponse.json(items);
}

export async function POST(request: Request){
    const res = await request.json()
    res.ano = Number(res.ano)
    res.quantidade = Number(res.quantidade)

    const createItem = await prisma.itemAcervo.create({ data: res })
    return NextResponse.json({data: res});
}