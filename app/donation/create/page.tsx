"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const moneyDonationSchema = z.object({
  nomeDoador: z.string().min(3),
  cpf: z.string().min(3),
  email: z.string().min(3),
  quantiaDinheiro: z.string().min(3),
});

const itemDonationSchema = z.object({
  nomeDoador: z.string().min(3),
  cpf: z.string().min(3),
  email: z.string().min(3),
  nome: z.string().min(3),
  ano: z.string().min(4),
  quantidade: z.string().min(1),
  tipo: z.string().min(3),
  dimensoes: z.string().min(3),
  informacoes: z.string().min(3),
  link: z.string().min(3),
  foto: z.string().min(3),
  prateleira: z.string().min(3),
  classificacao: z.string().min(3),
});

const formSchema = z.union([itemDonationSchema, moneyDonationSchema]);

export default function Home() {
  const [formType, setFormType] = useState("Dinheiro");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      formType === "Item"
        ? {
            nomeDoador: "",
            email: "",
            cpf: "",
            nome: "",
            ano: "",
            quantidade: "",
            tipo: "",
            dimensoes: "",
            informacoes: "",
            link: "",
            foto: "",
            prateleira: "",
            classificacao: "",
          }
        : {
            nomeDoador: "",
            email: "",
            cpf: "",
            quantiaDinheiro: "",
          },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (formType === "Item") {
      const request = {
        tipo: "Item",
        item: {
          nome: values.nome,
          ano: values.ano,
          quantidade: values.quantidade,
          tipo: values.tipo,
          dimensoes: values.dimensoes,
          informacoes: values.informacoes,
          link: values.link,
          foto: values.foto,
          prateleira: values.prateleira,
          classificacao: values.classificacao,
        },
        doador: {
          nome: values.nomeDoador,
          email: values.email,
          cpf: values.cpf,
        },
      };
      try {
        fetch("/api/donation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      const request = {
        tipo: "Dinheiro",
        quantiaDinheiro: values.quantiaDinheiro,
        doador: {
          nome: values.nomeDoador,
          email: values.email,
          cpf: values.cpf,
        },
      };
      try {
        fetch("/api/donation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleTipoChange = (value) => {
    const [nomeDoador, email, cpf] = form.getValues([
      "nomeDoador",
      "email",
      "cpf",
    ]);
    setFormType(value);
    form.reset(
      formType === "Dinheiro"
        ? {
            nomeDoador,
            email,
            cpf,
            nome: "",
            ano: "",
            quantidade: "",
            tipo: "",
            dimensoes: "",
            informacoes: "",
            link: "",
            foto: "",
            prateleira: "",
            classificacao: "",
          }
        : {
            nomeDoador,
            email,
            cpf,
            quantiaDinheiro: "",
          }
    );
  };
  return (
    <div>
      <div className=" text-center mt-36 mb-5">
        <h1 className=" text-3xl">Formulário de Doações</h1>
        <p>Utilize esse formulário para cadastrar uma doação no bit-bus.</p>
      </div>
      <main className="flex min-h-screen flex-col items-center justify-between ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="max-w-md w-full flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="nomeDoador"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome do doador"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email do doador"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="CPF do doador"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Select
              value={formType}
              onValueChange={handleTipoChange}
              defaultValue="Dinheiro"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtro de itens" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipo de Doação</SelectLabel>
                  <SelectItem value="Item">Item</SelectItem>
                  <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {formType === "Item" ? (
              <>
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Nome do Produto</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nome do produto"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="ano"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Ano</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ano do produto"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="quantidade"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Quantidade</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Quantidade de itens"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="tipo"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Tipo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Tipo do item"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="dimensoes"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Dimensões</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Dimensões do item"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="informacoes"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Informações</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Informações do item"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Link</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Link do item"
                            type="url"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="foto"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Foto</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Foto do item"
                            type="url"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="prateleira"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Prateleira</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Prateleira do item"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="classificacao"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Classificação</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Classificação do item"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </>
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="quantiaDinheiro"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Quantia</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Quantia de dinheiro"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </>
            )}
            <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>

        <a href="https://www.ucs.br/site/midia/arquivos/politica-de-doacoes_bit-bus.pdf">
          Política de doação
        </a>
      </main>
    </div>
  );
}
