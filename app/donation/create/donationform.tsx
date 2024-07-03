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
import CpfInput from "@/components/form/CpfInput";
import { cpfMask } from "@/components/form/CpfInput";
import { useToast } from "@/components/ui/use-toast";
import createItemDonation from "../actions/createItemDonation";
import createMoneyDonation from "../actions/createMoneyDonation";
import redirectDonationPage from "../actions/redirectDonationPage";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const moneyDonationSchema = z.object({
  nomeDoador: z
    .string()
    .min(3, { message: "O nome deve conter pelo menos 3 letras." }),
  cpf: z.string().min(14, { message: "Formato de CPF inválido." }),
  email: z.string().min(3, { message: "Email inválido." }),
  quantiaDinheiro: z
    .string()
    .min(1, { message: "Quantia de dinheiro inválida." }),
});

const itemDonationSchema = z.object({
  nomeDoador: z
    .string()
    .min(3, { message: "O nome deve conter pelo menos 3 letras." }),
  cpf: z.string().min(14, { message: "Formato de CPF inválido." }),
  email: z.string().min(3, { message: "Email inválido." }),
  nome: z
    .string()
    .min(3, { message: "O nome deve conter pelo menos 3 letras." }),
  ano: z.string().min(4, { message: "O ano deve possuir 4 números." }),
  quantidade: z.string().min(1, { message: "Quantidade inválida." }),
  tipo: z.string().min(1, { message: "Selecione ao menos um tipo" }),
  dimensoes: z.string().min(3, { message: "Dimensões inválidas." }),
  informacoes: z
    .string()
    .min(3, { message: "As informações devem ser maiores que 3 caracteres." }),
  link: z.string().min(3, { message: "Link inválido." }),
  foto: z.string().min(3, { message: "Foto inválida." }),
  prateleira: z.string().min(1, { message: "Prateleira inválida." }),
  classificacao: z.string().min(1, { message: "Classificação inválida." }),
});

const formSchema = z.union([itemDonationSchema, moneyDonationSchema]);

export default function DonationForm() {
  const [formType, setFormType] = useState("Dinheiro");
  const { toast } = useToast();
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
    const isDoacaoDinheiro = (
      values:
        | z.infer<typeof moneyDonationSchema>
        | z.infer<typeof itemDonationSchema>
    ): values is z.infer<typeof moneyDonationSchema> => {
      return "quantiaDinheiro" in values;
    };
    const isDoacaoItem = (
      values:
        | z.infer<typeof moneyDonationSchema>
        | z.infer<typeof itemDonationSchema>
    ): values is z.infer<typeof itemDonationSchema> => {
      return "nome" in values;
    };
    console.log(isDoacaoItem(values));
    if (isDoacaoItem(values)) {
      const request = {
        tipo: "Item",
        item: {
          nome: values.nome,
          ano: Number(values.ano),
          quantidade: Number(values.quantidade),
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
          cpf: cpfMask(values.cpf),
        },
      };
      try {
        await createItemDonation(request);
        toast({
          title: "Sucesso!",
          description: "A doação foi registrada com sucesso!",
        });
        redirectDonationPage();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro!",
          description: `A doação não foi registrada Erro: ${error}`,
        });
      }
    } else if (isDoacaoDinheiro(values)) {
      const request = {
        tipo: "Dinheiro",
        quantiaDinheiro: Number(values.quantiaDinheiro),
        doador: {
          nome: values.nomeDoador,
          email: values.email,
          cpf: cpfMask(values.cpf),
        },
      };
      try {
        await createMoneyDonation(request);
        toast({
          title: "Sucesso!",
          description: "A doação foi registrada com sucesso!",
        });
        redirectDonationPage();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro na criação da doação!",
          description: `${error}`,
        });
      }
    }
  };
  const handleTipoChange = (value: string) => {
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
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <title>Formulário de Doações</title>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/donation">Doações</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cadastro de doações</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Cadastro de doações
        </h1>
        <p className="text-sm text-muted-foreground">Cadastre novas doações.</p>
      </div>
      <Separator />
      <main className="flex flex-col justify-between">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="nomeDoador"
                render={({ field }) => (
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
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email do doador"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <CpfInput placeholder="CPF do doador" field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormItem>
                <FormLabel>Tipo de Doação</FormLabel>
                <FormControl>
                  <Select
                    value={formType}
                    onValueChange={handleTipoChange}
                    defaultValue="Dinheiro"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tipo de Doação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Tipo de Doação</SelectLabel>
                        <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                        <SelectItem value="Item">Item</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
            {formType === "Item" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
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
                  )}
                />
                <FormField
                  control={form.control}
                  name="ano"
                  render={({ field }) => (
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
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantidade"
                  render={({ field }) => (
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
                  )}
                />
                <FormField
                  control={form.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo do item" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Tipo de Artefato</SelectLabel>
                            <SelectItem value="Processador">
                              Processador
                            </SelectItem>
                            <SelectItem value="Memoria">Memória</SelectItem>
                            <SelectItem value="Placa de Video">
                              Placa de video
                            </SelectItem>
                            <SelectItem value="Servidor">Servidor</SelectItem>
                            <SelectItem value="Disco">Disco</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dimensoes"
                  render={({ field }) => (
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
                  )}
                />
                <FormField
                  control={form.control}
                  name="informacoes"
                  render={({ field }) => (
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
                  )}
                />
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
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
                  )}
                />
                <FormField
                  control={form.control}
                  name="foto"
                  render={({ field }) => (
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
                  )}
                />
                <FormField
                  control={form.control}
                  name="prateleira"
                  render={({ field }) => (
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
                  )}
                />
                <FormField
                  control={form.control}
                  name="classificacao"
                  render={({ field }) => (
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
                  )}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="quantiaDinheiro"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantia</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Quantia de dinheiro"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {/* <pre className="col-span-full">
              {JSON.stringify(form.watch(), null, 2)}
            </pre> */}
            <Button type="submit" className="col-span-full ml-auto">
              Enviar
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
}
