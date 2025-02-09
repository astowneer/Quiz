export default function Loading()  {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-20 h-20 border-4 border-red-700 border-dashed rounded-full animate-spin"></div>
      <p className="mt-4 text-red-700 text-2xl font-bold">Loading, please wait...</p>
    </div>
  );
}
