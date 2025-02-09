"use client";

export default function Error({
  error,
  reset
}: {
  error: Error,
  reset: () => void
}) {
  return (
    <div className="h-full flex flex-col justify-center items-center space-y-10">
      <h2 className="text-6xl font-bold drop-shadow-xl">Something went wrong</h2>
      <button className="py-4 px-8 bg-red-800 rounded-xl text-4xl hover:bg-red-700 duration-300 ease-in" onClick={() => reset()}>Try again</button>
    </div>
  );
};