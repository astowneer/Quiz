import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuizLearn",
  description: "Quiz makes learning fun and easy with free flashcards and premium study tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen text-white bg-red-500">
        {children}
      </body>
    </html>
  );
}
