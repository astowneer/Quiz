import { FlashcardSet } from "@/app/ui/flashcard/FlashcardSet";
import { getFlashcardsById, getCategoryNameById } from "@/app/prisma-db";

interface QuizFlashcardProps {
  params: Promise<{ id: string }>
}

export default async function QuizFlashcard({ params }: QuizFlashcardProps) {
  const categoryId = Number((await params).id);

  const [category, flashcards] = await Promise.all([
    getCategoryNameById(categoryId),
    getFlashcardsById(categoryId)
  ]);

  return (
    <FlashcardSet 
      categoryId={categoryId} 
      categoryName={category?.title} 
      flashcards={flashcards} 
    />
  );
}