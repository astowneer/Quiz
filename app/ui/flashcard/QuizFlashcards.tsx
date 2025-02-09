"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { Square2StackIcon } from "@heroicons/react/16/solid";
import { FlashcardCategory } from "@prisma/client";
import { useActionState } from "react";
import { removeFlashcardSet } from "@/app/actions/actions";

interface QuizFlashcardProps {
  categories: FlashcardCategory[];
  flashcardCountInEachCategory: number[];
};

export const QuizFlashcard = ({ categories, flashcardCountInEachCategory }: QuizFlashcardProps) => {
  const [categoryList, setCategoryList] = useState<FlashcardCategory[]>(categories);
  const [flashcardCounts, setFlashcardCounts] = useState<number[]>(flashcardCountInEachCategory);
 
  const initialValue = { message: "" };
  const [state, formAction, isPending] = useActionState(removeFlashcardSet, initialValue);

  return (
    <div className="p-10">
      <Link className="text-xl font-bold shadow-lg bg-red-700 block w-fit py-2 px-5 rounded-xl mb-10 hover:bg-red-800 duration-300 ease-in" href="/quiz/create">Create Set</Link>
      <h2 className="text-2xl font-bold shadow-drop-xl">Recent Sets</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-10">
        {categoryList.map((category, index) => (
          <Fragment key={category.id}>
            <Link 
              href={`/quiz/${category.id}`} 
              className="col-span-1 bg-red-700 shadow-lg rounded-xl flex gap-5 justify-center items-center py-8 hover:bg-red-800 duration-200 ease-in p-5"
            >
              <Square2StackIcon width={40} height={40} className="shrink-0"/>
              <div className="overflow-hidden">
                <div className="text-xl font-bold">{category.title}</div>
                <div className="text-white/70">Flashcard set - {flashcardCounts[index]} terms</div>
              </div>
            </Link>
            <form className="col-span-1" action={formAction}>
              <input type="hidden" name="categoryId" value={category.id} />
              <button className="font-bold text-lg" type="submit" disabled={isPending}>Remove</button>
              {state.message && <p>{state.message}</p>}
            </form>
          </Fragment>
        ))}
      </div>
    </div>
  );
};
