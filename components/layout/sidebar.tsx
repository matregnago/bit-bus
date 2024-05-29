"use client";
import Link from "next/link";
import { navItems } from "@/constants/data";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const path = usePathname();
  const items = navItems;
  return (
    <nav className="relative hidden h-screen border-r pt-20 md:block w-72 px-3 py-2 mt-3 space-y-1">
      <TooltipProvider>
        {items.map((item, index) => {
          const Icon = Icons[item.icon || "dashboard"];
          return (
            item.href && (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.disabled ? "/" : item.href}
                    className={cn(
                      "flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      path === item.href ? "bg-accent" : "transparent",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    <Icon className={`ml-3 size-5`} />

                    <span className="mr-2 truncate">{item.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  sideOffset={8}
                  className="hidden"
                >
                  {item.title}
                </TooltipContent>
              </Tooltip>
            )
          );
        })}
      </TooltipProvider>
    </nav>
  );
}
