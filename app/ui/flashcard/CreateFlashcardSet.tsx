"use client";

import { useState, useActionState, Fragment } from "react";
import { createFlashcardSet } from "@/app/actions/actions";
import { CreateFlashcard } from "@/app/lib/sampleData";

export const CreateFlashcardSet = () => {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [flashcards, setFlashcards] = useState<CreateFlashcard[]>(Array(5).fill({ term: "", definition: "" }));
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const initialState = { message: "" };
  const [state, formAction, isPending] = useActionState(createFlashcardSet, initialState);

  function adjustHeight(event: React.ChangeEvent<HTMLTextAreaElement>) {
    event.target.style.height = "2rem"; 
    event.target.style.height = `${Math.max(event.target.scrollHeight, 32)}px`;
  }

  function updateFlashcard(index: number, event: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFlashcards((prev) =>
      prev.map((flashcard, i) =>
        i === index ? { ...flashcard, [name]: value } : flashcard
      )
    );
  }

  function addFlashcard(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setFlashcards((prev) => [...prev, { term: "", definition: "" }]);
  }

  function removeFlashcard(index: number, event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setFlashcards((prev) => prev.filter((_, i) => i !== index));
  }

  function handleDragStart(index: number) {
    setDraggedIndex(index);
  }

  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
  }

  function handleDrop(index: number) {
    if (draggedIndex === null) return;
    const updatedList = [...flashcards];
    const [movedItem] = updatedList.splice(draggedIndex, 1);
    updatedList.splice(index, 0, movedItem);
    setFlashcards(updatedList);
    setDraggedIndex(null);
  }

  function insertFlashcard(index: number) {
    setFlashcards([...flashcards.slice(0, index + 1), { term: "", definition: "" }, ...flashcards.slice(index + 1)]);
  }

  return (
    <article className="w-[800px] m-auto space-y-5 py-10">
      <h2 className="text-2xl font-bold mb-5">Create Flashcards</h2>
      <label className="relative text-white" htmlFor="title">
        <input
          required
          className="peer w-full bg-red-700 p-2 rounded-xl text-white shadow-xl focus:outline-none"
          name="categoryTitle"
          type="text"
          placeholder=""
          value={categoryTitle}
          onChange={(event) => setCategoryTitle(event.target.value)}
        />
        <span className="absolute -top-2 left-2 text-xs text-white/70  transition-all peer-placeholder-shown:block hidden">
          Title
        </span>
      </label>
      <form action={formAction}>
        <input type="hidden" name="categoryTitle" value={categoryTitle} />
        {flashcards.map((flashcard, index) => (
          <Fragment key={index} >
            <section    
              className="bg-red-700 rounded-xl shadow-xl"
              draggable 
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
            >
              <div className="flex justify-between px-10 pt-5 py-2 text-white/70 border-b border-red-900">
                <div>{index+1}</div>
                <button onClick={(event) => removeFlashcard(index, event)}>Remove</button>
              </div>
              <div className="grid grid-cols-2 gap-10 px-10 py-5">
                <input type="hidden" name={`flashcards[${index}][term]`} value={flashcard.term} />
                <input type="hidden" name={`flashcards[${index}][definition]`} value={flashcard.definition} />
                <textarea
                  className="h-8 bg-transparent resize-none placeholder:text-white/70 overflow-hidden border-b-4 outline-none border-red-900 focus:border-white" 
                  name="term"
                  placeholder="Term"
                  value={flashcard.term}
                  onChange={(event) => {
                    updateFlashcard(index, event)
                    adjustHeight(event);
                  }}
                />
                <textarea
                  className="h-8 bg-transparent resize-none placeholder:text-white/70 overflow-hidden border-b-4 outline-none border-red-900 focus:border-white" 
                  name="definition"
                  placeholder="Definition"
                  value={flashcard.definition}
                  onChange={(event) => {
                    updateFlashcard(index, event)
                    adjustHeight(event);
                  }}
                />
              </div>
            </section>
            {index !== flashcards.length - 1 && (
              <div
                className="relative h-5 flex justify-center items-center"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {hoveredIndex === index && (
                  <button
                    className="rounded-full h-10 w-10 bg-red-900 hover:bg-red-800 transition duration-300"
                    type="button"
                    onClick={() => insertFlashcard(index)}
                  >
                    +
                  </button>
                )}
              </div>
            )}
          </Fragment>
        ))}
        <div className="mt-5 w-full py-6 bg-red-700 rounded-xl flex justify-center items-center">
          <button 
            onClick={addFlashcard}
            className="uppercase border-b-4 font-bold text-red-900 hover:text-white leading-8 border-red-900 hover:border-white transition-colors duration-500 ease-in"
          >
            Add a Card
          </button>
        </div>
        {state.message && <p className="text-center font-bold text-white">{state.message}</p>}
        <div className="flex justify-end">
          <button className="text-xl mt-5 shadow-lg bg-red-700 block w-fit py-2 px-5 rounded-xl mb-10 hover:bg-red-800 duration-300 ease-in">
            Done
          </button>
        </div>
      </form>
    </article>
  );
};


// "use client";

// import { useState, useActionState, Fragment } from "react";
// import { createFlashcardSet } from "@/app/actions/actions";

// export type Flashcard = {
//   term: string;
//   definition: string;
// };

// export const CreateFlashcardSet = () => {
//   const [categoryTitle, setCategoryTitle] = useState("");
//   const [flashcardAreas, setFlashcardAreas] = useState<Flashcard[]>([
//     { term: "", definition: "" },
//     { term: "", definition: "" },
//     { term: "", definition: "" },
//     { term: "", definition: "" },
//     { term: "", definition: "" },
//   ]);
//   const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
//   const [indexAddFlashcard, setIndexAddFlashcard] = useState(-1);
  
//   const initialState = { message: "" };
//   const [state, formAction, isPending] = useActionState(createFlashcardSet, initialState);

//   function adjustHeight(event: React.ChangeEvent<HTMLTextAreaElement>) {
//     event.target.style.height = "2rem"; 
//     event.target.style.height = `${Math.max(event.target.scrollHeight, 32)}px`;
//   }

//   function handleFormChange(index: number, event: React.ChangeEvent<HTMLTextAreaElement>) {
//     const { name, value } = event.target;
//     setFlashcardAreas((prev) =>
//       prev.map((flashcard, i) =>
//         i === index ? { ...flashcard, [name]: value } : flashcard
//       )
//     );
//     adjustHeight(event);
//   }

//   function addFlashcard(event: React.MouseEvent<HTMLButtonElement>) {
//     event.preventDefault();
//     setFlashcardAreas((prev) => [...prev, { term: "", definition: "" }]);
//   }

//   function removeFlashcard(index: number, event: React.MouseEvent<HTMLButtonElement>) {
//     event.preventDefault();
//     setFlashcardAreas((prev) => prev.filter((_, i) => i !== index));
//   }

//   function handleDragStart(index: number) {
//     setDraggedIndex(index);
//   }

//   function handleDragOver(event: React.DragEvent) {
//     event.preventDefault();
//   }

//   function handleDrop(index: number) {
//     if (draggedIndex === null) return;

//     const updatedList = [...flashcardAreas];
//     const [movedItem] = updatedList.splice(draggedIndex, 1);
//     updatedList.splice(index, 0, movedItem);

//     setFlashcardAreas(updatedList);
//     setDraggedIndex(null);
//   }

//   function handleAddFlashcardBetween() {
//     const newFlashcard: Flashcard = {
//       term: "",
//       definition: ""
//     };

//     setFlashcardAreas((prevList) => [
//       ...prevList.slice(0, indexAddFlashcard + 1),
//       newFlashcard,                  
//       ...prevList.slice(indexAddFlashcard + 1)    
//     ]);
//   }

//   return (
//     <article className="w-[800px] m-auto space-y-5 py-10">
//       <h2 className="text-2xl font-bold mb-5">Create Flashcards</h2>
//       <label className="relative text-white" htmlFor="title">
//         <input
//           required
//           className="peer w-full bg-red-700 p-2 rounded-xl text-white shadow-xl focus:outline-none"
//           name="categoryTitle"
//           type="text"
//           placeholder=""
//           value={categoryTitle}
//           onChange={(event) => setCategoryTitle(event.target.value)}
//         />
//         <span className="absolute -top-2 left-2 text-xs text-white/70  transition-all peer-placeholder-shown:block hidden">
//           Title
//         </span>
//       </label>
//       <form action={formAction}>
//         <input type="hidden" name="categoryTitle" value={categoryTitle} />
//         {flashcardAreas.map((flashcard, index) => (
//           <Fragment key={index} >
//             <section    
//               className="bg-red-700 rounded-xl shadow-xl"
//               draggable 
//               onDragStart={() => handleDragStart(index)}
//               onDragOver={handleDragOver}
//               onDrop={() => handleDrop(index)}
//             >
//               <div className="flex justify-between px-10 pt-5 py-2 text-white/70 border-b border-red-900">
//                 <div>{index+1}</div>
//                 <button onClick={(event) => removeFlashcard(index, event)}>Remove</button>
//               </div>
//               <div className="grid grid-cols-2 gap-10 px-10 py-5">
//                 <input type="hidden" name={`flashcards[${index}][term]`} value={flashcard.term} />
//                 <input type="hidden" name={`flashcards[${index}][definition]`} value={flashcard.definition} />
//                 <textarea
//                   className="h-8 bg-transparent resize-none placeholder:text-white/70 overflow-hidden border-b-4 outline-none border-red-900 focus:border-white" 
//                   name="term"
//                   placeholder="Term"
//                   value={flashcard.term}
//                   onChange={(event) => handleFormChange(index, event)}
//                 />
//                 <textarea
//                   className="h-8 bg-transparent resize-none placeholder:text-white/70 overflow-hidden border-b-4 outline-none border-red-900 focus:border-white" 
//                   name="definition"
//                   placeholder="Definition"
//                   value={flashcard.definition}
//                   onChange={(event) => handleFormChange(index, event)}
//                 />
//               </div>
//             </section>
//             <div 
//               className="relative h-5" 
//               onMouseEnter={() => setIndexAddFlashcard(index)} 
//               onMouseLeave={() => setIndexAddFlashcard(-1)} 
//               hidden={index === flashcardAreas.length - 1}
//             >
//               {indexAddFlashcard > -1 && indexAddFlashcard === index ? (
//                 <span className="flex justify-center items-center -translate-y-1/4 delay-200 duration-500">
//                   <span 
//                     className="rounded-full h-10 w-10 bg-red-900 relative hover:bg-red-800 duration-300"
//                     onClick={handleAddFlashcardBetween} 
//                   >
//                     <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">+</span>
//                   </span>
//                 </span>
//               ): (
//                 <span className="absolute left-0 top-0"></span>
//               )}
//             </div>
//           </Fragment>
//         ))}

//         <div className="mt-5 w-full py-6 bg-red-700 rounded-xl flex justify-center items-center">
//           <button 
//             onClick={addFlashcard}
//             className="uppercase border-b-4 font-bold text-red-900 hover:text-white leading-8 border-red-900 hover:border-white transition-colors duration-500 ease-in"
//           >
//             add a card
//           </button>
//         </div>
//         <div className="relative">
//           {state.message && <p className="absolute top-5 font-bold">{state.message}</p>}
//         </div>
//         <div className="flex justify-end">
//           <button className="text-xl mt-5 shadow-lg bg-red-700 block w-fit py-2 px-5 rounded-xl mb-10 hover:bg-red-800 duration-300 ease-in">Done</button>
//         </div>
//       </form>
//     </article>
//   );
// };