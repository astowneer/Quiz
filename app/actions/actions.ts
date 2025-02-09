"use server";

import { 
  createFlashcard, 
  createCategory, 
  editFlashcard, 
  removeFlashcardsFromCategory, 
  getFlashcardsCountByCategoryId, 
  removeCategoryById
} from "@/app/prisma-db";
import { redirect } from "next/navigation";
import { CreateFlashcard, EditFlashcard } from "../lib/sampleData";

async function getCategoryId(categoryTitle: string) {
  if (!categoryTitle.trim()) {
    throw new Error("Category title is required.");
  }

  const categoryId = await createCategory(categoryTitle);
  if (!categoryId) {
    throw new Error("Category failed to create.");
  }

  return categoryId;
}

export async function createFlashcardSet(prevState: any, formData: FormData) {
  const categoryTitle = formData.get("categoryTitle") as string;
  const categoryId = await getCategoryId(categoryTitle);

  const flashcards: CreateFlashcard[] = [];
  for (const [key, value] of formData.entries()) {
    const match = key.match(/^flashcards\[(\d+)\]\[(term|definition)\]$/);
    if (match) {
      const index = Number(match[1]);
      const field = match[2];

      if (!flashcards[index]) {
        flashcards[index] = { term: "", definition: "" };
      }
      flashcards[index][field as "term" | "definition"] = value as string;
    }
  }

  await Promise.all(
    flashcards.map((flashcard) => {
      if (flashcard.term.trim()) createFlashcard(categoryId.id, flashcard.term, flashcard.definition);
    })
  );
  
  redirect(`/quiz/${categoryId.id}`);
  return { message: `Flashcard set "${categoryTitle}" created successfully!` };
}

export async function editFlashcardSet(prevState: any, formData: FormData) {
  const categoryTitle = formData.get("categoryTitle") as string;
  const categoryId = await getCategoryId(categoryTitle);

  const flashcards: EditFlashcard[] = [];
  for (const [key, value] of formData.entries()) {
    const match = key.match(/^flashcards\[(\d+)\]\[(id|term|definition)\]$/);
    if (match) {
      const index = Number(match[1]);
      const field = match[2];
  
      if (!flashcards[index]) {
        flashcards[index] = { id: 0, term: "", definition: "" };
      }
  
      if (field === "id") {
        flashcards[index].id = Number(value); 
      } else {
        flashcards[index][field as "term" | "definition"] = value as string;
      }
    }
  }  

  const flashcardsCount = await getFlashcardsCountByCategoryId(categoryId.id);
  if (flashcardsCount !== flashcards.length) {
    await removeFlashcardsFromCategory(categoryId.id);
  }

  await Promise.all(
    flashcards.map((flashcard) => {
      editFlashcard(categoryId.id, flashcard.id, flashcard.term, flashcard.definition)
    })
  );

  redirect(`/quiz/${categoryId.id}`);
  return { message: `Flashcard set "${categoryTitle}" updated successfully!` };
}

export async function removeFlashcardSet(prevState: any, formData: FormData) {
  const categoryId = formData.get("categoryId") as string;
  if (!categoryId) {
    throw new Error("Category failed to create.");
  }
  const result = await removeCategoryById(Number(categoryId));

  if (result) {
    redirect("/quiz");
  }

  return { message: `Deleted "${categoryId}" failed.` };
}