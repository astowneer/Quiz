import { getCategoryNameById, getFlashcardsById } from "@/app/prisma-db";
import { FlashcardSetEdit } from "./FlashcardSetEdit";

interface QuizFlashcardProps {
  params: Promise<{ id: string }>
};

export default async function FlashcardsEdit({ params }: QuizFlashcardProps) {
  const categoryId = Number((await params).id);

  const [category, flashcards] = await Promise.all([
    getCategoryNameById(categoryId),
    getFlashcardsById(categoryId)
  ]);

  
  return <FlashcardSetEdit categoryId={categoryId} categoryName={category?.title} editedFlashcards={flashcards} />
}