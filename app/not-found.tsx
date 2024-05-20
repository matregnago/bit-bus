import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl">Erro 404</h1>
      <h2 className="text-3xl my-4">Essa página não existe.</h2>
      <div className="flex flex-row">
        <Link href="/">
          <span className="text-blue-500">Clique aqui</span>
        </Link>
        <p className="ml-1">para voltar para a página principal.</p>
      </div>
    </div>
  );
}
