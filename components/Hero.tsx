// Hero section with Pokémon branding and search
import SearchBar from "./SearchBar";

interface HeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function Hero({
  searchTerm,
  onSearchChange
}: HeroProps) {
  return (
    <div className="relative overflow-hidden">

      {/* Yellow Hero Section */}
      <div className="relative bg-pokemon-yellow overflow-hidden">
        {/* Pokéball Icon Header */}
        <div className="text-center pt-4 sm:pt-6 pb-3 sm:pb-4">
          <div className="inline-flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-800 border-3 sm:border-4 border-white relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full border-2 border-gray-800"></div>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-800">Pokedex</span>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto md:mb-30">
            {/* Pokémon Logo Image */}
            <div className="mb-4 sm:mb-6 flex justify-center">
              <img
                src="/pokemon-title.png"
                alt="Pokémon"
                className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto"
              />
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight px-2">
              Discover the Most Powerful Pokémon in the Wild!
            </h2>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-gray-800 font-semibold mb-6 sm:mb-8">
              Train, Battle, and Collect Your Favorites!
            </p>

            {/* Search Bar */}
            <SearchBar
              value={searchTerm}
              onChange={onSearchChange}
              placeholder="Search Pokemon"
            />
          </div>

          {/* Charizard - Left Side - Hidden on small mobile, positioned well below search bar */}
          <div
            className="hidden sm:block absolute left-0 w-32 sm:w-48 md:w-56 lg:w-72 xl:w-80 pointer-events-none"
            style={{ bottom: '-6rem' }}
          >
            <img
              src="/charizard.png"
              alt="Charizard"
              className="w-full h-auto"
            />
          </div>

          {/* Pikachu - Right Side - Hidden on small mobile, positioned well below search bar */}
          <div
            className="hidden sm:block absolute right-0 w-32 sm:w-48 md:w-56 lg:w-72 xl:w-80 pointer-events-none"
            style={{ bottom: '-6rem' }}
          >
            <img
              src="/pikachu.png"
              alt="Pikachu"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Mobile Characters at Bottom */}
        <div className="sm:hidden relative pb-4">
          <div className="flex justify-between items-end px-4">
            {/* Charizard - Mobile */}
            <div className="w-32 -mb-4">
              <img
                src="/charizard.png"
                alt="Charizard"
                className="w-full h-auto"
              />
            </div>

            {/* Pikachu - Mobile */}
            <div className="w-40 -mb-4">
              <img
                src="/pikachu.png"
                alt="Pikachu"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Cloud Wave Bottom */}
        <div className="relative -mb-1">
          <svg
            className="w-full h-12 sm:h-16 md:h-20 lg:h-24"
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0C0 0 240 80 480 80C720 80 960 0 1200 0C1440 0 1440 0 1440 0V120H0V0Z"
              fill="white"
            />
            <path
              d="M0 20C0 20 240 100 480 100C720 100 960 20 1200 20C1440 20 1440 20 1440 20V120H0V20Z"
              fill="white"
              opacity="0.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
