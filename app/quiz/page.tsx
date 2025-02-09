import { Suspense } from "react";
import { getCategories } from "../prisma-db";
import { QuizCollection } from "../ui/flashcard/QuizCollection";
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
  return <QuizCollection categories={categories} flashcardCountInEachCategory={flashcardCountInEachCategory} />;
}
