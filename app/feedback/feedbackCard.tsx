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
import { StarIcon, Trash2Icon } from "lucide-react";

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
              <h3 className="text-lg font-semibold">
                {feedback.visitante.nome}
              </h3>
              <AlertDialogTrigger className="w-10 h-10 hover:bg-accent hover:text-accent-foreground flex justify-center rounded">
                <Trash2Icon className="w-4 h-4 my-auto" />
              </AlertDialogTrigger>
            </div>
            <div className="flex items-center text-sm">
              <StarIcon className=" text-black dark:text-gray-950 w-4 h-4 fill-yellow-500 mr-1" />
              <span className="text-gray-900 dark:text-gray-100">
                {feedback.nota}
              </span>
            </div>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {feedback.conteudo}
        </p>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você realmente tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso excluirá permanentemente
              esse feedback.
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
