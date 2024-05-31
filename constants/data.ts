import { NavItem, optionsSelectTableFilter } from "@/types";
export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Acervo",
    href: "/collection",
    icon: "acervo",
    label: "acervo",
  },
  {
    title: "Doações",
    href: "/donation",
    icon: "doacoes",
    label: "doacoes",
  },
  {
    title: "Eventos",
    href: "/event",
    icon: "eventos",
    label: "eventos",
  },
  {
    title: "Feedbacks",
    href: "/feedback",
    icon: "feedbacks",
    label: "feedbacks",
  },
];

export const tiposItem: optionsSelectTableFilter[] = [
  {
    value: "processador",
    label: "Processador",
    icon: "processador",
  },
  {
    value: "memoria",
    label: "Memória",
    icon: "memoria",
  },
  {
    value: "placaDeVideo",
    label: "Placa de Vídeo",
    icon: "placaDeVideo",
  },
  {
    value: "servidor",
    label: "Servidor",
    icon: "servidor",
  },
  {
    value: "disco",
    label: "Disco",
    icon: "disco",
  },
];
