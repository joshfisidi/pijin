export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-2 border-b-2 border-gray-900 dark:border-white animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-gray-600 dark:text-gray-400">
          Loading...
        </div>
      </div>
    </div>
  );
} 