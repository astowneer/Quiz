import { Suspense } from "react";
import { getCategories } from "../prisma-db";
import { QuizFlashcard } from "../ui/flashcard/QuizFlashcards";
import Loading from "./loading";

export default function Quiz() {
  return (
    <Suspense fallback={<Loading />}>
      <QuizContent />
    </Suspense>
  );
}

const QuizContent = async () => {
  const categories = await getCategories();
  const flashcardCountInEachCategory = categories.map(({ flashcards }) => flashcards.length);
  return <QuizFlashcard categories={categories} flashcardCountInEachCategory={flashcardCountInEachCategory} />;
}
