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
  cpf: z.string().min(4),
  email: z.string().min(1),
  nota: z.string().min(3),
  descricao: z.string().min(3),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      cpf: "",
      email: "",
      nota: "",
      descricao: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
//     try {
//       fetch('/api/items', {method: 'POST', headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(values)})
//     } catch(error){
//       console.error(error)
//     }
  }
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
            name="cpf"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Cpf</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="CPF"
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
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
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
            name="nota"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Nota</FormLabel>
                  <FormControl>
                    <Input placeholder="Nota" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Descricao</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Dimensoes do item"
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
      <a href='https://www.ucs.br/site/midia/arquivos/politica-de-doacoes_bit-bus.pdf'>Política de doação</a>
    </main>
  );
}
