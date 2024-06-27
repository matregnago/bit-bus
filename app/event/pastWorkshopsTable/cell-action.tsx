"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { Oficina } from "@/types/index";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import deleteWorkshopAction from "../actions/deleteWorkshop";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
interface CellActionProps {
  data: Oficina;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const { toast } = useToast();
  const oficina = data;
  const IconEdit = Icons["edit"];
  const IconDelete = Icons["delete"];
  const IconDetails = Icons["details"];
  const onConfirm = async () => {
    if (oficina.id !== undefined) {
      try {
        await deleteWorkshopAction(oficina.id);
        router.refresh();
        toast({
          title: "Sucesso!",
          description: "A oficina foi removida sucesso!",
        });
      } catch (error) {
        toast({
          title: "Erro!",
          description: `Erro ao excluir oficina: ${error}!`,
        });
      }
    }
  };

  return (
    <>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/event/${oficina.id}`}>
              <DropdownMenuItem>
                <IconDetails className="mr-2 h-4 w-4" /> Detalhes
              </DropdownMenuItem>
            </Link>
            {/* <DropdownMenuItem>
              <IconEdit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem> */}
            <AlertDialogTrigger className="w-full">
              <DropdownMenuItem>
                <IconDelete className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você quer excluir essa oficina?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. A oficina será excluida do banco
              de dados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
