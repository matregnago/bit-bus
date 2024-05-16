import Link from "next/link"

export default function FooterPrincipal() {
  return(
    <footer className="bg-green-900/80 text-white p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">BitBus</h3>
            <Link className="hover:text-green-300" href="#">
              Sobre nós
            </Link>
            <Link className="hover:text-green-300" href="#">
              Visitações
            </Link>
            <Link className="hover:text-green-300" href="#">
              Eventos
            </Link>
            <Link className="hover:text-green-300" href="#">
              Oficinas
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Acervo</h3>
            <Link className="hover:text-green-300" href="#">
              Visualizar
            </Link>
            <Link className="hover:text-green-300" href="#">
              Doação de Itens
            </Link>
            <Link className="hover:text-green-300" href="#">
              Política de Doações
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Visita</h3>
            <Link className="hover:text-green-300" href="#">
              Marque uma visita
            </Link>
            <Link className="hover:text-green-300" href="#">
              Cronograma de eventos
            </Link>
            <Link className="hover:text-green-300" href="#">
              Organize uma oficina
            </Link>
            <Link className="hover:text-green-300" href="#">
              Deixe um feedback
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Suporte</h3>
            <Link className="hover:text-green-300" href="#">
              Contato
            </Link>
            <Link className="hover:text-green-300" href="#">
              Doações
            </Link>
            <Link className="hover:text-green-300" href="#">
              Patrocínios
            </Link>
          </div>
        </div>
      </footer>
  );
}