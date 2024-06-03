'use client'
import * as z from 'zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useState } from 'react'
import CpfInput, { cpfMask } from '@/components/form/CpfInput'

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
  visitantes: z.array(
    z.object({
      nome: z.string().min(3),
      email: z.string().min(3),
      cpf: z.string().min(3)
    })
  )
})

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
  visitantes: z.array(
    z.object({
      nome: z.string().min(3),
      email: z.string().min(3),
      cpf: z.string().min(3)
    })
  )
})
const formSchema = z.union([visitaSchema, oficinaSchema])

export default function Home() {
  const [formType, setFormType] = useState('Oficina')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      formType === 'Visita'
        ? {
            data: undefined,
            rua: '',
            bairro: '',
            cidade: '',
            estado: '',
            cep: '',
            cpfOrganizador: '',
            nomeOrganizador: '',
            emailOrganizador: ''
          }
        : {
            data: undefined,
            rua: '',
            bairro: '',
            cidade: '',
            estado: '',
            cep: '',
            nomePalestrante: '',
            cpfPalestrante: '',
            emailPalestrante: '',
            titulo: '',
            duracao: '',
            resumo: ''
          }
  })
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'visitantes'
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const visitantes = values.visitantes.map(visitante => {
      return {
        ...visitante,
        cpf: cpfMask(visitante.cpf)
      }
    })
    if (formType === 'Oficina') {
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
          cep: values.cep
        },
        visitantes,
        palestrante: {
          nome: values.nomePalestrante,
          cpf: cpfMask(values.cpfPalestrante),
          email: values.emailPalestrante
        }
      }
      try {
        fetch('/api/events/workshop', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(request)
        })
      } catch (error) {
        console.error(error)
      }
    } else if (formType === 'Visita') {
      const request = {
        dataHora: values.data,
        local: {
          rua: values.rua,
          bairro: values.bairro,
          cidade: values.cidade,
          estado: values.estado,
          cep: values.cep
        },
        visitantes,
        organizador: {
          nome: values.nomeOrganizador,
          cpf: cpfMask(values.cpfOrganizador),
          email: values.emailOrganizador
        }
      }
      try {
        fetch('/api/events/visitation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(request)
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
  function addNovoVisitante() {
    append({
      nome: '',
      cpf: '',
      email: ''
    })
  }
  const handleTipoChange = value => {
    const [data, rua, bairro, cidade, estado, cep, visitantes] = form.getValues(
      ['data', 'rua', 'bairro', 'cidade', 'estado', 'cep', 'visitantes']
    )
    setFormType(value)
    form.reset(
      formType === 'Oficina'
        ? {
            data,
            rua,
            bairro,
            cidade,
            estado,
            cep,
            nomeOrganizador: '',
            cpfOrganizador: '',
            emailOrganizador: '',
            visitantes
          }
        : {
            data,
            rua,
            bairro,
            cidade,
            estado,
            cep,
            nomePalestrante: '',
            cpfPalestrante: '',
            emailPalestrante: '',
            titulo: '',
            resumo: '',
            duracao: '',
            visitantes
          }
    )
  }
  return (
    <div>
      <div className="text-center mt-48 mb-10">
        <h1 className="text-3xl">Cadastro de um evento</h1>
        <p>Essa pagina serve para cadastrar eventos: oficinas ou visitas</p>
      </div>
      <main className="flex min-h-screen flex-col items-center justify-between ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="">
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
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
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
                        disabled={date =>
                          date > new Date() || date < new Date('1900-01-01')
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
                )
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
                )
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
                )
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
                )
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
                )
              }}
            />
            <Select
              value={formType}
              onValueChange={handleTipoChange}
              defaultValue="Dinheiro"
            >
              <SelectTrigger className="w-[180px]">
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

            {formType === 'Oficina' ? (
              <>
                <FormField
                  control={form.control}
                  name="nomePalestrante"
                  render={({ field }) => {
                    return (
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
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name="cpfPalestrante"
                  render={({ field }) => {
                    return (
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
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name="emailPalestrante"
                  render={({ field }) => {
                    return (
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
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name="titulo"
                  render={({ field }) => {
                    return (
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
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name="resumo"
                  render={({ field }) => {
                    return (
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
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name="duracao"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Duracao</FormLabel>
                        <FormControl>
                          <Input placeholder="Duracao" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </>
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="nomeOrganizador"
                  render={({ field }) => {
                    return (
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
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name="cpfOrganizador"
                  render={({ field }) => {
                    return (
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
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name="emailOrganizador"
                  render={({ field }) => {
                    return (
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
                    )
                  }}
                />
              </>
            )}
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
                        )
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
                              <CpfInput
                                placeholder="Cpf do visitante"
                                field={field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )
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
                              <Input
                                placeholder="Email"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )
                      }}
                    />
                    <button type="button" onClick={() => remove(index)}>
                      X
                    </button>
                  </div>
                )
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
    </div>
  )
}
