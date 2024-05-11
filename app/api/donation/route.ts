import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()
export async function GET(req: Request, context: any){


const allDonations = await prisma.doacao.findMany();
return NextResponse.json({
    allDonations,
    })

}