export type Flashcard = {
  id: number;
  title: string;
  definition: string;
  categoryId: number;
};

export type FlashcardCategory = {
  id: number;
  title: string;
  collectionId: number;
};

export type FlashcardCollections = {
  id: number;
  sets: FlashcardCategory[];
};

export interface CreateFlashcard {
  term: string;
  definition: string;
};

export interface EditFlashcard {
  id: number;
  term: string;
  definition: string;
};

// export const flashcarsdDay1: Flashcard[] = [
//   { id: "1", title: "apple", definition: "яблуко" },
//   { id: "2", title: "orange", definition: "апельсин" },
//   { id: "3", title: "grapes", definition: "виноград" },
// ];

// export const flashcardsDay2: Flashcard[] = [
//   { id: "1", title: "banana", definition: "банан" },
//   { id: "2", title: "kivi", definition: "ківі" },
//   { id: "3", title: "hurma", definition: "хурма" },
// ];

// export const emptyFlashcard: Flashcard[] = [
//   { id: 1 },
//   { id: 2 },
//   { id: 3 },
//   { id: 4 },
//   { id: 5 },
// ];

// export const flashcardSetDay1: FlashcardCategory = {
//   id: "1",
//   title: "day 1",
//   flashcards: flashcarsdDay1
// };

// export const flashcardSetDay2: FlashcardCategory = {
//   id: "2",
//   title: "day 2",
//   flashcards: flashcardsDay2
// };

// export const flashcardCollections: FlashcardCollections = {
//   id: "1",
//   sets: [
//     flashcardSetDay1,
//     flashcardSetDay2
//   ]
// };