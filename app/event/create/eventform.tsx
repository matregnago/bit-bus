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
import { Calendar as CalendarIcon, PlusIcon, TrashIcon } from "lucide-react";
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
import searchItems from "../actions/searchItensAcervo";
import CepInput from "@/components/form/CepInput";
import { Textarea } from "@/components/ui/textarea";

interface FieldProps {
  field: any;
}

const mockSearch = async (value: string) => {
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/items?search=${value}`
    );
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
  hora: z.string(),
  rua: z.string().min(3, { message: "Rua inválida." }),
  bairro: z.string().min(3, { message: "Bairro inválido" }),
  cidade: z.string().min(3, { message: "Cidade inválido" }),
  estado: z.string().min(2, { message: "Estado inválido" }),
  cep: z.string().min(9, { message: "Formato de CEP inválido." }),
  nomePalestrante: z
    .string()
    .min(3, { message: "O nome deve conter pelo menos 3 letras." }),
  cpfPalestrante: z.string().min(14, { message: "Formato de CPF inválido." }),
  emailPalestrante: z.string().min(3, { message: "Email inválido." }),
  titulo: z
    .string()
    .min(3, { message: "O titulo deve conter pelo menos 3 letras." }),
  resumo: z
    .string()
    .min(3, { message: "O resumo deve conter pelo menos 3 letras." }),
  duracao: z.string().min(3, { message: "Duração inválida" }),
  itensacervo: z
    .array(optionSchema)
    .min(1, { message: "Selecione pelo menos um item." }),
  visitantes: z.array(
    z.object({
      nome: z
        .string()
        .min(3, { message: "O nome deve conter pelo menos 3 letras." }),
      email: z.string().min(3, { message: "Email inválido." }),
      cpf: z.string().min(14, { message: "Formato de CPF inválido." }),
    })
  ),
});

const visitaSchema = z.object({
  data: z.date(),
  hora: z.string(),
  rua: z.string().min(3, { message: "Rua inválida." }),
  bairro: z.string().min(3, { message: "Bairro inválido" }),
  cidade: z.string().min(3, { message: "Cidade inválido" }),
  estado: z.string().min(2, { message: "Estado inválido" }),
  cep: z.string().min(9, { message: "Formato de CEP inválido." }),
  nomeOrganizador: z
    .string()
    .min(3, { message: "O nome deve conter pelo menos 3 letras." }),
  cpfOrganizador: z.string().min(14, { message: "Formato de CPF inválido." }),
  emailOrganizador: z.string().min(3, { message: "Email inválido." }),
  itensacervo: z
    .array(optionSchema)
    .min(1, { message: "Selecione pelo menos um item." }),
  visitantes: z.array(
    z.object({
      nome: z
        .string()
        .min(3, { message: "O nome deve conter pelo menos 3 letras." }),
      email: z.string().min(3, { message: "Email inválido." }),
      cpf: z.string().min(14, { message: "Formato de CPF inválido." }),
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
            hora: "",
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
            hora: "",
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
    // Data original no formato ISO 8601
    let originalDate = values.data;

    // Horário a ser adicionado no formato "HH:mm"
    let timeToAdd = values.hora;

    // Separar horas e minutos do horário fornecido
    let [hours, minutes] = timeToAdd.split(":").map(Number);

    // Ajustar a data original com o novo horário
    originalDate.setUTCHours(hours);
    originalDate.setUTCMinutes(minutes);

    values.data = originalDate;
    const items = await searchItems(values.itensacervo);
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
        itensAcervo: items,
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
          description: "A oficina foi registra da com sucesso!",
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
        itensAcervo: items,
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
    const [
      data,
      hora,
      rua,
      bairro,
      cidade,
      estado,
      cep,
      visitantes,
      itensacervo,
    ] = form.getValues([
      "data",
      "hora",
      "rua",
      "bairro",
      "cidade",
      "estado",
      "cep",
      "visitantes",
      "itensacervo",
    ]);
    setFormType(value);
    form.reset(
      formType === "Oficina"
        ? {
            data,
            hora,
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
            hora,
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
      <main className="mx-96 mb-40">
        <h1 className="text-3xl font-bold text-center mt-10">
          Formulário de Eventos
        </h1>
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
                  <FormItem className="mt-4">
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
                name="hora"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horario</FormLabel>
                    <FormControl>
                      <Input placeholder="Horario" type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      <CepInput placeholder="CEP do local" field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
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
              <FormItem className="mt-6">
                <FormLabel>Tipo do evento</FormLabel>
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
              </FormItem>
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
                        <FormLabel>CPF Palestrante</FormLabel>
                        <FormControl>
                          <CpfInput
                            placeholder="CPF do Palestrante"
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
                          <Textarea
                            placeholder="Resumo da oficina"
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
                        <FormLabel>CPF Organizador</FormLabel>
                        <FormControl>
                          <CpfInput
                            placeholder="CPF do Organizador"
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
                            type="email"
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

            <div className="grid gap-4 mt-6">
              <div>
                <button
                  type="button"
                  onClick={addNovoVisitante}
                  className="button flex border-2 py-2 px-4 rounded-xl items-center dark:hover:bg-gray-950 hover:bg-gray-100"
                >
                  <PlusIcon className="h-6 w-6 mr-2" />
                  Adicionar Visitante
                </button>
              </div>
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
                          <FormLabel>CPF</FormLabel>
                          <FormControl>
                            <CpfInput
                              placeholder="CPF do visitante"
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
                            <Input
                              placeholder="Email"
                              type="email"
                              {...field}
                            />
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
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* <pre>{JSON.stringify(form.watch(), null, 2)}</pre> */}
            <div className="flex justify-end">
              <Button type="submit" className="w-52 mt-4">
                Enviar
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
}
