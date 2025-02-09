import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  try {
    const collection = await prisma.flashcardCollection.create({
      data: { title: "collection" },
    });

    const categories = await prisma.flashcardCategory.createMany({
      data: [{ title: "day 1", collectionId: collection.id }],
    });

    const category = await prisma.flashcardCategory.findFirst({
      where: { collectionId: collection.id }
    });

    if (category) {
      await prisma.flashcard.createMany({
        data: [
          { title: "apple", definition: "яблуко", categoryId: category?.id },
          { title: "pineapple", definition: "ананас", categoryId: category?.id },
          { title: "grapes", definition: "виноград", categoryId: category?.id },
          { title: "lemon", definition: "лимон", categoryId: category?.id },
        ],
      });
    }

    console.log("Seed data inserted successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

const deleteAllRecords = async () => {
  try {
    await prisma.flashcard.deleteMany({});
    await prisma.flashcardCategory.deleteMany({});
    await prisma.flashcardCollection.deleteMany({});
    console.log("All records deleted successfully!");
  } catch (error) {
    console.error("Error deleting records:", error);
  }
};

export const getFlashcardsById = async (categoryId: number) => {
  return await prisma.flashcard.findMany({
    where: { categoryId },
  });
};

export const getCategoryNameById = async (id: number) => {
  return await prisma.flashcardCategory.findUnique({
    where: { id },
    select: { title: true },
  });
};

export const getCategories = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return await prisma.flashcardCategory.findMany({
    include: {
      flashcards: true,
    },
  });
};

export const removeCategoryById = async (id: number) => {
  try {
    await prisma.flashcard.deleteMany({
      where: { categoryId: id },
    });

    return await prisma.flashcardCategory.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error removing category:", error);
    throw new Error("Category removal failed.");
  }
};

const getCategoryIdByTitle = async (title: string) => {
  return await prisma.flashcardCategory.findUnique({
    where: { title },
    select: { id: true },
  });
}

const doesCollectionExist = async (collectionId: number): Promise<boolean> => {
  const collection = await prisma.flashcardCollection.findUnique({
    where: { id: collectionId },
    select: { id: true },
  });
  return !!collection;
};

const getCollectionIdByName = async (title: string) => {
  return await prisma.flashcardCollection.findUnique({
    where: { title },
    select: { id: true },
  });
};

export const createCategory = async (title: string) => {
  const existingCategory = await getCategoryIdByTitle(title);
  if (existingCategory) return existingCategory;

  const collection = await getCollectionIdByName("collection");
  if (!collection) {
    throw new Error(`Collection "collection" does not exist.`);
  }

  return await prisma.flashcardCategory.create({
    data: {
      collectionId: collection.id,
      title,
    },
    select: { id: true },
  });
};

export const createFlashcard = async (categoryId: number, title: string, definition: string) => {
  return await prisma.flashcard.create({
    data: {
      categoryId,
      title,
      definition,
    },
  });
};

export const getFlashcardById = async (id: number) => {
  if (!id || id <= 0) return null;
  return await prisma.flashcard.findUnique({
    where: { id },
    select: { id: true },
  });
};

export const editFlashcard = async (categoryId: number, id: number, title: string, definition: string) => {
  const existingFlashcard = await getFlashcardById(id);
  if (!existingFlashcard) {
    return await createFlashcard(categoryId, title, definition);
  }

  return await prisma.flashcard.update({
    where: { id },
    data: { title, definition },
  });
};

export const removeFlashcardsFromCategory = async (categoryId: number) => {
  await prisma.flashcard.deleteMany({
    where: { categoryId },
  });
};

export const getFlashcardsCountByCategoryId = async (categoryId: number) => {
  return await prisma.flashcard.count({
    where: { categoryId },
  });
};