"use client";
import * as z from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const formSchema = z.object({
  data: z.date(),
  rua: z.string().min(3),
  bairro: z.string().min(4),
  cidade: z.string().min(1),
  estado: z.string().min(3),
  cep: z.string().min(3),
  visitantes: z.array(
    z.object({
      nome: z.string().min(3),
      email: z.string().min(3),
      cpf: z.string().min(3),
    })
  ),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      data: undefined,
      rua: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "visitantes",
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    // const request = {
    //   conteudo: values.descricao,
    //   nota: values.nota,
    //   visitante: {
    //     nome: values.nome,
    //     cpf: values.cpf,
    //     email: values.email,
    //   },
    // };
    // try {
    //   fetch("/api/feedback", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(request),
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };
  function addNovoVisitante() {
    append({
      nome: "",
      cpf: "",
      email: "",
    });
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <title>Crie um Evento</title>      
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="data"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Escolha uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rua"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="bairro"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="Bairro" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="cidade"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Cidade" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="estado"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input placeholder="Estado" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="cep"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Cep</FormLabel>
                  <FormControl>
                    <Input placeholder="Cep" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <button type="button" onClick={addNovoVisitante}>
            Adicionar Visitante
          </button>
          <div className="flex flex-col">
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="flex flex-row">
                  <FormField
                    control={form.control}
                    name={`visitantes.${index}.nome`}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nome do visitante"
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
                    name={`visitantes.${index}.cpf`}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Cpf</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Cpf do visitante"
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
                    name={`visitantes.${index}.email`}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email" type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <button type="button" onClick={() => remove(index)}>
                    X
                  </button>
                </div>
              );
            })}
          </div>
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
  );
}
