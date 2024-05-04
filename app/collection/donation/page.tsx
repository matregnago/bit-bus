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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  nome: z.string().min(3),
  ano: z.string().min(4),
  quantidade: z.string().min(1),
  tipo: z.string().min(3),
  dimensoes: z.string().min(3),
  informacoes: z.string().min(3),
  links: z.string().min(3),
  foto: z.string().min(3),
  prateleira: z.string().min(3),
  classificacao: z.string().min(3),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      ano: "",
      quantidade: "",
      tipo: "",
      dimensoes: "",
      informacoes: "",
      links: "",
      foto: "",
      prateleira: "",
      classificacao: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
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
                    <Input placeholder="Tipo do item" type="text" {...field} />
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
                  <FormLabel>Dimensoes</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Dimensoes do item"
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
            name="links"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Link do item" type="url" {...field} />
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
                    <Input placeholder="Foto do item" type="url" {...field} />
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
                  <FormLabel>Classificacao</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Classificacao do item"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
