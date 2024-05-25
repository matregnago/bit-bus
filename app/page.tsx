import { NavBar } from "@/components/global/navbar";
import Footer from "@/components/global/footer";
import Link from "next/link";


export default function Home() {
  return (
    <div>
      <NavBar />
      <title>Home</title>
    <div>
      <section className="w-full">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
            <img
              alt="Museum Exhibits"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              height="310"
              src=""
              width="310"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Explore as maravilhas da tecnologia
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Bem-vindo ao nosso museu de tecnologia de última geração, onde você pode mergulhar no passado,
                  presente e futuro da inovação.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-green-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-green-50 dark:text-green-900 dark:hover:bg-green-50/90 dark:focus-visible:ring-green-300"
                  href="collection"
                >
                  Explore o Acervo
                </Link>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border border-green-200 border-green-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-green-100 hover:text-green-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:border-green-800 dark:border-green-800 dark:bg-green-950 dark:hover:bg-green-800 dark:hover:text-green-50 dark:focus-visible:ring-green-300"
                  href="about-us"
                >
                  Leia Mais
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-100 dark:bg-green-900">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Entre de cara na tecnologia</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                De exibições interativas a programas educacionais, nosso museu oferece uma exploração abrangente de
                  avanços tecnológicos ao longo da história.
                </p>
              </div>
              <ul className="grid gap-2 py-4">
                <li>
                  <a className="mr-2 inline-block h-4 w-4 text-green-600 dark:text-green-400">•</a>
                  Exposições Interativas Práticas
                </li>
                <li>
                  <a className="mr-2 inline-block h-4 w-4 text-green-600 dark:text-green-400">•</a>
                  Cronograma histórico de itens tecnológicos
                </li>
                <li>
                  <a className="mr-2 inline-block h-4 w-4 text-green-600 dark:text-green-400">•</a>
                  Oficinas Educacionais para todas as idades
                </li>
              </ul>
            </div>
            <img
              alt="BitBus Photo"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              height="310"
              src="bitbusimg.jpeg"
              width="550"
            />
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </div>
  );
}
