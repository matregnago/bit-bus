import { Icons } from "@/components/icons";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon: keyof typeof Icons;
  label?: string;
  description?: string;
};

export type Item = {
  id: string;
  nome: string;
  ano: number;
  quantidade: number;
  tipo: string;
  dimensoes: string;
  informacoes: string;
  link: string | null;
  foto: string;
  prateleira: string;
  classificacao: string;
};

type Pessoa = {
  id: string;
  nome: string;
  cpf: string;
  email: string;
};

export type Doador = Pessoa;
export type Organizador = Pessoa;
export type Palestrante = Pessoa;
export type Visitante = Pessoa;

export type DoacaoDinheiro = {
  id: string;
  tipo: string;
  quantiaDinheiro: number;
  doador: Doador;
};

export type DoacaoItem = {
  id: string;
  tipo: string;
  item: Item;
  doador: Doador;
};

export type optionsSelectTableFilter = {
  label: string;
  value: string;
  icon: keyof typeof Icons;
};

export type Local = {
  id: string;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
};

export type Oficina = {
  id: string;
  titulo: string;
  dataHora: Date;
  local: Local;
  duracao: string;
  resumo: string;
  palestrante: Palestrante;
  visitantes: Visitante[];
  localId: string;
  palestranteId: string;
};

export type Visita = {
  id: string;
  dataHora: Date;
  local: Local;
  visitantes: Visitante[];
  organizador: Organizador;
  organizadorId: String;
  localId: String;
};

export type Event = Oficina | Visita;
