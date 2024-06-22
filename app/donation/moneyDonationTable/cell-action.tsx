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
import { DoacaoDinheiro } from "@/types/index";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import deleteMoneyDonation from "../actions/deleteMoneyDonation";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface CellActionProps {
  data: DoacaoDinheiro;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const { toast } = useToast();
  const doacaoDinheiro = data;
  const IconEdit = Icons["edit"];
  const IconDelete = Icons["delete"];
  const IconDetails = Icons["details"];
  const onConfirm = async () => {
    if (doacaoDinheiro.id !== undefined) {
      try {
        await deleteMoneyDonation(doacaoDinheiro.id);
        router.refresh();
        toast({
          title: "Sucesso!",
          description: "A doação foi removida sucesso!",
        });
      } catch (error) {
        toast({
          title: "Erro!",
          description: `Erro ao excluir doação: ${error}!`,
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
            {/* <DropdownMenuItem>
              <IconEdit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem> */}
            <AlertDialogTrigger>
              <DropdownMenuItem>
                <IconDelete className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você quer excluir essa doação?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. A doação será excluida do banco
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
