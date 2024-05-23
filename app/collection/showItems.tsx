"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilteredItems({ items }) {
  const [busca, setBusca] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("");
  const handleTipoChange = (value) => {
    setSelectedTipo(value);
  };
  const itensfiltrados = items.filter((item) => {
    const matchesBusca = item.nome.toLowerCase().includes(busca.toLowerCase());
    const matchesTipo = () => {
      if (selectedTipo === "" || selectedTipo === "todos") {
        return true;
      } else {
        return item.tipo === selectedTipo;
      }
    };
    return matchesBusca && matchesTipo();
  });
  console.log(selectedTipo);
  return (
    <div className=" mx-56 mt-10">
      <div className="flex gap-3 mb-4">
        <Input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Pesquise aqui"
        />
        <Select value={selectedTipo} onValueChange={handleTipoChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtro de itens" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipo de Artefato</SelectLabel>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="processador">Processador</SelectItem>
              <SelectItem value="memoria">Memória</SelectItem>
              <SelectItem value="Placa de video">Placa de video</SelectItem>
              <SelectItem value="servidor">Servidor</SelectItem>
              <SelectItem value="disco">Disco</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {itensfiltrados.map((item) => (
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
                <DialogTitle className="text-center">{item.nome}</DialogTitle>
                <DialogDescription>
                  <img src={item.foto} />
                  info: {item.informacoes} <br />
                  ano: {item.ano}
                  <br />
                  tipo: {item.tipo}
                  <br />
                  dim: {item.dimensoes}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
