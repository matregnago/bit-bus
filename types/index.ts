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
