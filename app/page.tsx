import Link from "next/link";

export default async function Home() {
  return (
    <main className="h-full flex flex-col justify-center items-center space-y-5">
      <h2 className="text-8xl font-bold drop-shadow-xl">Welcome to QuizLern</h2>
      <Link className="text-4xl hover:text-white/60 duration-300 ease-in" href="/quiz">Go to your assets</Link>
    </main>
  );
} 