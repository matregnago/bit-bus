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
import CpfInput, { cpfMask } from "@/components/form/CpfInput";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import createFeedback from "../actions/createFeedback";
import redirectFeedbackPage from "../actions/redirectFeedbackPage";
import { Feedback } from "@/types";
import StarRating from "@/components/form/StarRating";

const formSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "O nome deve conter pelo menos 3 letras." }),
  cpf: z.string().min(14, { message: "Formato de CPF inválido." }),
  email: z.string().min(3, { message: "Email inválido." }),
  nota: z.number().min(1, { message: "Nota precisa ser de 1 a 5." }),
  descricao: z.string().min(3, { message: "Descrição inválido." }),
});

export default function FeedackForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      cpf: "",
      email: "",
      nota: 1,
      descricao: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const request: Feedback = {
      conteudo: values.descricao,
      nota: Number(values.nota),
      visitante: {
        nome: values.nome,
        cpf: cpfMask(values.cpf),
        email: values.email,
      },
    };
    try {
      const req = await createFeedback(request);
      if (req == 401) {
        toast({
          variant: "destructive",
          title: "Erro!",
          description: `Visitante não encontrado`,
        });
      } else {
        toast({
          title: "Sucesso!",
          description: "O feedback foi registrada com sucesso!",
        });
        redirectFeedbackPage();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro!",
        description: `O feedback não foi registrado: ${error}`,
      });
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl font-bold">Formulário de Feedback</h1>
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
                    <Input placeholder="Seu nome" type="text" {...field} />
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
                    <CpfInput placeholder="Cpf" field={field} />
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
                    <Input placeholder="Email" type="email" {...field} />
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
                    <StarRating
                      value={Number(field.value)} // Convert the value to a number
                      onChange={field.onChange as (value: number) => void}
                    />
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
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descreva a sua opinião" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
          {/* <pre className="col-span-full">
            {JSON.stringify(form.watch(), null, 2)}
          </pre> */}
        </form>
      </Form>
    </main>
  );
}
