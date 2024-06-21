"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Feedback } from "@/types";
import { StarIcon, TrashIcon } from "lucide-react";

interface FeedbackCardProps {
  feedback: Feedback;
  onDelete: () => void;
}

export default function FeedbackCard({
  feedback,
  onDelete,
}: FeedbackCardProps) {
  return (
    <AlertDialog>
      <Card className="p-6 rounded-lg shadow-md ">
        <div className="mb-4">
          <div>
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">{feedback.visitante.nome}</h3>
              <AlertDialogTrigger>
                <TrashIcon className="w-4 h-4 text-red" />
              </AlertDialogTrigger>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <StarIcon className="w-4 h-4 fill-black mr-1" />
              <span>{feedback.nota}</span>
            </div>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{feedback.conteudo}</p>

        <AlertDialogContent>
         <AlertDialogHeader>
           <AlertDialogTitle>Você realmente tem certeza?</AlertDialogTitle>
           <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente esse feedback.
           </AlertDialogDescription>
         </AlertDialogHeader>
         <AlertDialogFooter>
           <AlertDialogCancel>Cancelar</AlertDialogCancel>
           <AlertDialogAction onClick={onDelete}>Confirmar</AlertDialogAction>
         </AlertDialogFooter>
       </AlertDialogContent>
      </Card>
    </AlertDialog>

  );
}