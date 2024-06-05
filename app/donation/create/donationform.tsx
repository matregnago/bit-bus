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
    <div>
      <div className="text-center mt-5 mb-5">
        <h1 className="text-3xl">Formulário de Doações</h1>
      </div>
      <main className="flex flex-col items-center justify-between">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="max-w-4xl w-full space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <SelectItem value="Item">Item</SelectItem>
                    <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
                            <SelectItem value="processador">
                              Processador
                            </SelectItem>
                            <SelectItem value="memoria">Memória</SelectItem>
                            <SelectItem value="placaDeVideo">
                              Placa de video
                            </SelectItem>
                            <SelectItem value="servidor">Servidor</SelectItem>
                            <SelectItem value="disco">Disco</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <pre className="col-span-full">
              {JSON.stringify(form.watch(), null, 2)}
            </pre>
            <Button type="submit" className="col-span-full w-full">
              Submit
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
}
