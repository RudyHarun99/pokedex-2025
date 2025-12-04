// Loading spinner component with TailwindCSS animation

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-6 sm:p-8 md:p-12">
      <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 border-b-2 sm:border-b-3 border-blue-600"></div>
    </div>
  );
}
