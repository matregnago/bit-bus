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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import CpfInput, { cpfMask } from "@/components/form/CpfInput";
import createWorkshop from "../actions/createWorkshop";
import redirectDonationPage from "../actions/redirectEventPage";
import createVisit from "../actions/createVisit";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

interface FieldProps {
  field: any
}



const mockSearch = async (value: string) => {
  try {
    const req = await fetch("http://localhost:3000/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchTerm: value,
      }),
    });
    const data = await req.json();
    const { opcoes } = data;
    console.log(opcoes);
    return opcoes;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const MultipleSelectorWithAsyncSearch = ({ field }: FieldProps) => {
  const [isTriggered, setIsTriggered] = React.useState(false);

  return (
    <div className="">
      <MultipleSelector
        {...field}
        hidePlaceholderWhenSelected
        onSearch={async (value) => {
          setIsTriggered(true);
          const res = await mockSearch(value);
          setIsTriggered(false);
          return res;
        }}
        placeholder="Digite o nome do item"
        loadingIndicator={
          <p className="py-2 text-center text-lg leading-10 text-muted-foreground">
            Carregando...
          </p>
        }
        emptyIndicator={
          <p className="w-full text-center text-lg leading-10 text-muted-foreground">
            Nenhum resultado encontrado.
          </p>
        }
      />
    </div>
  );
};

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const oficinaSchema = z.object({
  data: z.date(),
  rua: z.string().min(3),
  bairro: z.string().min(4),
  cidade: z.string().min(1),
  estado: z.string().min(3),
  cep: z.string().min(3),
  nomePalestrante: z.string().min(3),
  cpfPalestrante: z.string().min(3),
  emailPalestrante: z.string().min(3),
  titulo: z.string().min(3),
  resumo: z.string().min(3),
  duracao: z.string().min(3),
  itensacervo: z.array(optionSchema).min(1),
  visitantes: z.array(
    z.object({
      nome: z.string().min(3),
      email: z.string().min(3),
      cpf: z.string().min(3),
    })
  ),
});

const visitaSchema = z.object({
  data: z.date(),
  rua: z.string().min(3),
  bairro: z.string().min(4),
  cidade: z.string().min(1),
  estado: z.string().min(3),
  cep: z.string().min(3),
  nomeOrganizador: z.string().min(3),
  cpfOrganizador: z.string().min(3),
  emailOrganizador: z.string().min(3),
  itensacervo: z.array(optionSchema).min(1),
  visitantes: z.array(
    z.object({
      nome: z.string().min(3),
      email: z.string().min(3),
      cpf: z.string().min(3),
    })
  ),
});
const formSchema = z.union([visitaSchema, oficinaSchema]);

export default function EventForm() {
  const [formType, setFormType] = useState("Oficina");
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      formType === "Visita"
        ? {
            data: undefined,
            rua: "",
            bairro: "",
            cidade: "",
            estado: "",
            cep: "",
            cpfOrganizador: "",
            nomeOrganizador: "",
            emailOrganizador: "",
          }
        : {
            data: undefined,
            rua: "",
            bairro: "",
            cidade: "",
            estado: "",
            cep: "",
            nomePalestrante: "",
            cpfPalestrante: "",
            emailPalestrante: "",
            titulo: "",
            duracao: "",
            resumo: "",
          },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "visitantes",
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const isVisita = (
      values: z.infer<typeof visitaSchema> | z.infer<typeof oficinaSchema>
    ): values is z.infer<typeof visitaSchema> => {
      return "nomeOrganizador" in values;
    };
    const isOficina = (
      values: z.infer<typeof visitaSchema> | z.infer<typeof oficinaSchema>
    ): values is z.infer<typeof oficinaSchema> => {
      return "nomePalestrante" in values;
    };
    const visitantes = values.visitantes.map((visitante) => {
      return {
        ...visitante,
        cpf: cpfMask(visitante.cpf),
      };
    });
    const itensAcervo = values.itensacervo.map((item) => {
      return {
        id: item.value
      }
    })
    if (isOficina(values)) {
      const request = {
        dataHora: values.data,
        titulo: values.titulo,
        duracao: values.duracao,
        resumo: values.resumo,
        local: {
          rua: values.rua,
          bairro: values.bairro,
          cidade: values.cidade,
          estado: values.estado,
          cep: values.cep,
        },
        visitantes,
        itensAcervo,
        palestrante: {
          nome: values.nomePalestrante,
          cpf: cpfMask(values.cpfPalestrante),
          email: values.emailPalestrante,
        },
      };
      try {
        await createWorkshop(request);
        toast({
          title: "Sucesso!",
          description: "A oficina foi registrada com sucesso!",
        });
        redirectDonationPage();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro!",
          description: `A oficina não foi registrada Erro: ${error}`,
        });
      }
    } else if (isVisita(values)) {
      const request = {
        dataHora: values.data,
        local: {
          rua: values.rua,
          bairro: values.bairro,
          cidade: values.cidade,
          estado: values.estado,
          cep: values.cep,
        },
        visitantes,
        itensAcervo,
        organizador: {
          nome: values.nomeOrganizador,
          cpf: cpfMask(values.cpfOrganizador),
          email: values.emailOrganizador,
        },
      };
      try {
        await createVisit(request);
        toast({
          title: "Sucesso!",
          description: "A visitação foi registrada com sucesso!",
        });
        redirectDonationPage();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro!",
          description: `A oficina não foi registrada Erro: ${error}`,
        });
      }
    }
  };
  function addNovoVisitante() {
    append({
      nome: "",
      cpf: "",
      email: "",
    });
  }
  const handleTipoChange = (value: string) => {
    const [data, rua, bairro, cidade, estado, cep, visitantes, itensacervo] = form.getValues(
      ["data", "rua", "bairro", "cidade", "estado", "cep", "visitantes", "itensacervo"]
    );
    setFormType(value);
    form.reset(
      formType === "Oficina"
        ? {
            data,
            rua,
            bairro,
            cidade,
            estado,
            cep,
            itensacervo,
            nomeOrganizador: "",
            cpfOrganizador: "",
            emailOrganizador: "",
            visitantes,
          }
        : {
            data,
            rua,
            bairro,
            cidade,
            estado,
            cep,
            itensacervo,
            nomePalestrante: "",
            cpfPalestrante: "",
            emailPalestrante: "",
            titulo: "",
            resumo: "",
            duracao: "",
            visitantes,
          }
    );
  };
  return (
    <div>
      <main className="mx-96  ">
        <h1 className="text-3xl text-black">Cadastro de eventos</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-4"
          >
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="data"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Data</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="rua"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rua</FormLabel>
                    <FormControl>
                      <Input placeholder="Rua" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bairro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input placeholder="Bairro" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Cidade" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="estado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input placeholder="Estado" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cep</FormLabel>
                    <FormControl>
                      <Input placeholder="Cep" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Select
                value={formType}
                onValueChange={handleTipoChange}
                defaultValue="Oficina"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tipo do evento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tipo do evento</SelectLabel>
                    <SelectItem value="Oficina">Oficina</SelectItem>
                    <SelectItem value="Visita">Visita</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormField
                control={form.control}
                name="itensacervo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Itens do Acervo</FormLabel>
                    <FormControl>
                      <MultipleSelectorWithAsyncSearch field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formType === "Oficina" ? (
                <>
                  <FormField
                    control={form.control}
                    name="nomePalestrante"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Palestrante</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nome do Palestrante"
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
                    name="cpfPalestrante"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cpf Palestrante</FormLabel>
                        <FormControl>
                          <CpfInput
                            placeholder="Cpf do Palestrante"
                            field={field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emailPalestrante"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Palestrante</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Email do Palestrante"
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
                    name="titulo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titulo da oficina</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Titulo da oficina"
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
                    name="resumo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resumo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Resumo da oficina"
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
                    name="duracao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duracao</FormLabel>
                        <FormControl>
                          <Input placeholder="Duracao" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="nomeOrganizador"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Organizador</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nome do Organizador"
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
                    name="cpfOrganizador"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cpf Organizador</FormLabel>
                        <FormControl>
                          <CpfInput
                            placeholder="Cpf do Organizador"
                            field={field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emailOrganizador"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Organizador</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Email do Organizador"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>

            <div className="grid gap-4">
              <button
                type="button"
                onClick={addNovoVisitante}
                className="button"
              >
                Adicionar Visitante
              </button>
              <div className="flex flex-col gap-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex flex-col md:flex-row gap-4"
                  >
                    <FormField
                      control={form.control}
                      name={`visitantes.${index}.nome`}
                      render={({ field }) => (
                        <FormItem className="w-full">
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
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`visitantes.${index}.cpf`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Cpf</FormLabel>
                          <FormControl>
                            <CpfInput
                              placeholder="Cpf do visitante"
                              field={field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`visitantes.${index}.email`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email" type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="button"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
}
