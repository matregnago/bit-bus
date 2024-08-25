import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Item } from "@/types";
import { Badge } from "../ui/badge";
import { ExternalLink } from "lucide-react";

interface ItemDetailsDialogProps {
  closeItemDetailsDialog: () => void;
  isItemDetailsDialogOpen: boolean;
  item: Item;
}

export default function EventDetailsDialog({
  closeItemDetailsDialog,
  item,
  isItemDetailsDialogOpen,
}: ItemDetailsDialogProps) {
  return (
    <Dialog
      open={isItemDetailsDialogOpen}
      onOpenChange={closeItemDetailsDialog}
    >
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{item.nome}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <p>
                <strong>Ano:</strong> {item.ano}
              </p>
              <p>
                <strong>Quantidade:</strong> {item.quantidade}
              </p>
              <p>
                <strong>Tipo:</strong> {item.tipo}
              </p>
              <p>
                <strong>Dimensões:</strong> {item.dimensoes}
              </p>
              <Badge className="w-fit">{item.classificacao}</Badge>
            </div>
            <div className="flex justify-center items-start">
              <img
                src={item.foto}
                alt={item.nome}
                width={200}
                height={300}
                className="rounded-md object-cover  "
              />
            </div>
          </div>
          <div>
            <strong>Descrição:</strong>
            <p className="mt-1 text-sm">{item.informacoes}</p>
          </div>
          <div>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:underline"
            >
              Saiba mais <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
