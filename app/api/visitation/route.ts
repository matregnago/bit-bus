import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()


export async function GET(){
    const visitas = await prisma.visita.findMany();
    return NextResponse.json(visitas);
}

export async function POST(request: Request){
    const res = await request.json()
    const { local, visitantes, organizador } = res
    let dateConversor: Date = new Date(res.dataHora);
    res.dataHora = dateConversor
    const createQuery = await prisma.visita.create({
        data: {
            dataHora: res.dataHora,
            local: {
                connectOrCreate: {
                    where: {
                        cep: local.cep 
                    },
                    create: {
                        rua: local.rua,
                        bairro: local.bairro,
                        cidade: local.cidade,
                        estado: local.estado,
                        cep: local.cep
                    }
                }
            },
            visitantes: {
                connectOrCreate: visitantes.map((visitante: { cpf: string; nome: string; email: string; }) => ({
                                where: { 
                                    cpf: visitante.cpf 
                                }, 
                                create:  { 
                                    nome: visitante.nome ,
                                    cpf: visitante.cpf,
                                    email: visitante.email 
                                 } 
                              }))
            },
            organizador: {
                connectOrCreate: {
                    where: {
                        cpf: organizador.cpf 
                    },
                    create: {
                        nome: organizador.nome,
                        cpf: organizador.cpf,
                        email: organizador.email,
                    }
                }
            }
        }
    })
    return NextResponse.json({createQuery});
}