"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const acervoLinks: { title: string; href: string; description: string }[] = [
  {
    title: "Visualize nosso acervo",
    href: "/collection",
    description: "Dê uma olhada nos itens presentes em nosso acervo.",
  },
  {
    title: "Doe Itens para o acervo",
    href: "/donation",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Política de doação",
    href: "https://www.ucs.br/site/midia/arquivos/politica-de-doacoes_bit-bus.pdf",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
];

export function NavBar() {
  return (
    <header className="p-4 border-b bg-white w-full fixed top-0 z-20">
      <link rel="shortcut icon" href="logo-bitbus.png" />
      <NavigationMenu>
        <Link className="flex items-center" href="/">
          <Image
            src="/logo-bitbus.png"
            width={32}
            height={32}
            alt="Picture of the author"
            className="mr-3 ml-3"
          />
          <span className="font-bold text-lg">BitBus</span>
        </Link>
        <NavigationMenuList className="ml-5">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-base">
              Sobre
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Bit Bus
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components that you can copy and
                        paste into your apps. Accessible. Customizable. Open
                        Source.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/about-us" title="Sobre Nós">
                  Descubra mais sobre o que se trata o projeto BitBus.
                </ListItem>
                <ListItem href="/docs/installation" title="Contato">
                  Entre em contato para maiores informações.
                </ListItem>
                <ListItem href="/donation" title="Contribua com o projeto">
                  Faça uma doação de hardware ou financeira para o Bitbus :D
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-base">
              Acervo
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {acervoLinks.map((link) => (
                  <ListItem
                    key={link.title}
                    title={link.title}
                    href={link.href}
                  >
                    {link.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/event" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <p className="text-base">Eventos</p>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/feedback" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <p className="text-base">Feedbacks</p>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
