"use client";

import { Flashcard } from "../../lib/sampleData";
import { useState } from "react";
import Link from "next/link";

interface FlashcardSetProps {
  categoryId: number;
  categoryName?: string;
  flashcards: Flashcard[];
};

export const FlashcardSet = ({ categoryId, categoryName, flashcards }: FlashcardSetProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDefinitionVisible, setIsDefinitionVisible] = useState(false);

  const hasFlashcards = flashcards.length > 0;

  function toggleDefinition() {
    setIsDefinitionVisible(!isDefinitionVisible);
  }

  function setNextCard() {
    setCurrentIndex(currentIndex + 1);
    setIsDefinitionVisible(false);
  }

  function setPreviousCard() {
    setCurrentIndex(currentIndex - 1);
    setIsDefinitionVisible(false);
  }

  return (
    <div className="max-w-[500px] m-auto text-white h-full">
      <div className="flex flex-col justify-center h-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl">{categoryName || "Unknown Category"}</h2>
          <div className="flex flex-col text-right">
            <Link href={`/quiz`}>Go back</Link>
            <Link href={`/quiz/${categoryId}/edit`}>Edit</Link>
          </div>
        </div>
        <article className="flex flex-col items-center">
          {hasFlashcards ? (
            <div 
              className="w-full min-h-[300px] max-h-[300px] bg-red-700 rounded-lg text-bold text-2xl my-5 flex items-center py-5 select-none" 
              onClick={toggleDefinition}
              aria-label="Flip flashcard"
            >
              <div className="h-full w-full overflow-scroll flex justify-center items-center">
                <p className="whitespace-pre-line">
                  {isDefinitionVisible ? flashcards[currentIndex].definition : flashcards[currentIndex].title}
                </p>
              </div>
            </div>
          ): (
            <p className="text-center text-gray-300">No flashcards available.</p>
          )}
          <div className="flex justify-center gap-5">
            <button 
              className="bg-red-700 px-4 py-2 rounded-xl disabled:bg-red-900 disabled:text-red-400" 
              onClick={setPreviousCard}
              disabled={currentIndex === 0} 
            >
              Prev
            </button>
            <button 
              className="bg-red-700 px-4 py-2 rounded-xl disabled:bg-red-900 disabled:text-red-400" 
              disabled={currentIndex === flashcards.length - 1} 
              onClick={setNextCard}
            >
              Next
            </button>
          </div>
        </article>
      </div>
    </div>  
  );
}