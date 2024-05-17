import { NavBar } from "@/components/global/navbar";
import * as React from "react";
import Footer from "@/components/global/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const getItems = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/items");
    const items = await res.json();
    return items;
  } catch (error) {
    console.error(error);
  }
};

export default async function ShowcaseItems() {
  const items = await getItems();
  return (
    <div>
      <NavBar />
      <section className="bg-gray-50 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#333333]">
            Our Museum Collection
          </h1>
          <p className="text-[#666666] mt-4">
            Discover our curated collection of rare and unique artifacts from
            around the world..
          </p>
        </div>
        <div className=" mx-56 mt-10">
          <div className="flex gap-3 mb-4">
            <Input className=" w-80" placeholder="Pesquise aqui" />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtro de itens" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipo de Artefato</SelectLabel>
                  <SelectItem value="processador">Processador</SelectItem>
                  <SelectItem value="memoria">Memória</SelectItem>
                  <SelectItem value="placa-de-vide">Placa de video</SelectItem>
                  <SelectItem value="servidor">Servidor</SelectItem>
                  <SelectItem value="disco">Disco</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild className=" cursor-pointer">
                  <Card
                    className="rounded-lg bg-white shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg font-helvetica gap-6"
                    key={item.id}
                  >
                    <CardHeader>
                      <img
                        className="mb-4 h-48 w-full rounded-lg object-cover"
                        height={300}
                        src={item.foto}
                        style={{
                          aspectRatio: "400/300",
                          objectFit: "cover",
                        }}
                        width={400}
                      />
                      <CardTitle className="mb-2 text-lg font-semibold text-[#333333]">
                        {item.nome}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{item.informacoes}</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      {item.nome}
                    </DialogTitle>
                    <DialogDescription>
                      <img src={item.foto} />
                      <ul>
                        <li className="text-center">{item.informacoes}</li>
                        <li>
                          <span className="font-bold">ano</span>: {item.ano}
                        </li>
                        <li>tipo: {item.tipo}</li>
                        <li>dim: {item.dimensoes}</li>
                      </ul>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
