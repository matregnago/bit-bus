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
      <Card className="min-w-80">
        <CardHeader>
          <CardTitle>{feedback.visitante.nome}</CardTitle>
          <CardDescription>{feedback.conteudo}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Nota: {feedback.nota}</p>
          <AlertDialogTrigger>Deletar</AlertDialogTrigger>
        </CardContent>
      </Card>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
