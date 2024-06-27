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
import { useToast } from "@/components/ui/use-toast";
import createItem from "../actions/createItem";
import redirectCollectionPage from "../actions/redirectCollectionPage";

const formSchema = z.object({
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

export default function ItemForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const request = {
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
    };
    try {
      await createItem(request);
      toast({
        title: "Sucesso!",
        description: "O item foi registrado com sucesso!",
      });
      redirectCollectionPage();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro!",
        description: `O item não foi registrado: ${error}`,
      });
    }
  };

  return (
    <div>
      <title>Cadastro de Artefatos</title>
      <div className="text-center mt-5 mb-5">
        <h1 className="text-3xl font-bold">Cadastro de Artefatos</h1>
      </div>
      <main className="flex flex-col items-center justify-between mb-40 px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="max-w-4xl w-full space-y-6"
          >
            <div className="w-full"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome do item"
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
                        placeholder="Ano do item"
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
                            Placa de Vídeo
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
                      <Input placeholder="Link do item" type="url" {...field} />
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
                      <Input placeholder="Foto do item" type="url" {...field} />
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

            {/* <pre className="col-span-full">
              {JSON.stringify(form.watch(), null, 2)}
            </pre> */}
            <Button type="submit" className="col-span-full w-full">
              Enviar
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
}
