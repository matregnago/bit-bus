import { Oficina, Visita } from '@/types'
import { notFound } from 'next/navigation'

interface OficinaCardProps {
  evento: Oficina
}
interface VisitaCardProps {
  evento: Visita
}

export async function generateStaticParams() {
  const eventos: (Visita | Oficina)[] = await fetch(
    'http://localhost:3000/api/events/eventlist'
  ).then(res => res.json())
  return eventos.map(evento => ({
    id: evento.id
  }))
}

const OficinaCard = ({ evento }: OficinaCardProps) => {
  return (
    <div>
      <h1>Titulo Oficina:{evento.titulo}</h1>
    </div>
  )
}

const VisitaCard = ({ evento }: VisitaCardProps) => {
  return (
    <div>
      <h1>Organizador Visita: {evento.organizadorId}</h1>
    </div>
  )
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const data = await fetch(`http://localhost:3000/api/events/${id}`)
  const evento: Visita | Oficina = await data.json()
  const isVisita = (evento: Visita | Oficina): evento is Visita => {
    return 'organizador' in evento
  }

  if (evento === null) {
    notFound()
  }
  return (
    <>
      {isVisita(evento) ? (
        <VisitaCard evento={evento} />
      ) : (
        <OficinaCard evento={evento} />
      )}
    </>
  )
}
