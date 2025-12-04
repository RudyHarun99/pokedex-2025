// Loading skeleton for PokemonCard component

export default function PokemonCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden min-h-60 sm:min-h-[260px] animate-pulse">
      {/* Image Container Skeleton */}
      <div className="relative bg-gray-200 p-4 sm:p-6 flex items-center justify-center h-40 sm:h-48">
        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-300 rounded-full"></div>
      </div>

      {/* Name Container Skeleton */}
      <div className="p-3 sm:p-4 bg-linear-to-b from-white to-gray-50">
        <div className="h-5 sm:h-6 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  );
}
