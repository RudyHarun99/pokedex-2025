# Pokémon Explorer

A modern, responsive web application for browsing and exploring Pokémon using the [PokéAPI](https://pokeapi.co/). Built with Next.js 16, React 19, TypeScript, and TailwindCSS with intelligent caching for optimal performance.

## Features

- **Browse Pokémon**: View a paginated list of Pokémon with names and images
- **Search**: Quickly find Pokémon by name with real-time filtering
- **Detailed Information**: View comprehensive stats, types, height, weight, and more
- **Smart Caching**: Context API-based caching for instant loading and reduced API calls
- **Responsive Design**: Seamless experience across mobile, tablet, and desktop devices
- **Modern UI**: Clean, intuitive interface with loading states and error handling
- **Type-Safe**: Built with TypeScript for reliability and better developer experience
- **URL State Management**: Search and pagination state synced with URL parameters

## Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router & Turbopack
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API for caching
- **API**: [PokéAPI](https://pokeapi.co/) - RESTful Pokémon data
- **Runtime**: Node.js 18+
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pokemon-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `npm run dev` - Start the development server on http://localhost:3000
- `npm run build` - Create an optimized production build
- `npm start` - Start the production server (requires `npm run build` first)
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
pokedex/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx                # Root layout with global styles
│   ├── page.tsx                  # Home page with suspense
│   ├── error.tsx                 # Error boundary
│   ├── global-error.tsx          # Global error handler
│   ├── globals.css               # Global CSS styles
│   └── pokemon/
│       └── [id]/
│           ├── page.tsx          # Pokémon detail page
│           └── error.tsx         # Detail page error boundary
├── components/                 # Reusable React components
│   ├── Button.tsx                # Resuable Button components
│   ├── ErrorMessage.tsx          # Error display component
│   ├── Hero.tsx                  # Hero section with search
│   ├── Home.tsx                  # Home page content (Pokémon list)
│   ├── LoadingSpinner.tsx        # Loading indicator
│   ├── Pagination.tsx            # Pagination controls
│   ├── PokemonCard.tsx           # Individual Pokémon card
│   ├── PokemonCardSkeleton.tsx   # Loading skeleton
│   ├── SearchBar.tsx             # Search input component
│   └── StatBar.tsx               # Stat visualization component
├── contexts/                   # React Context providers
│   └── PokemonCacheContext.tsx   # Caching context & provider
├── hooks/                      # Custom React hooks
│   ├── usePokemonCard.ts         # Hook for Pokémon Card component
│   ├── usePokemonData.ts         # Hook for Pokémon list data
│   ├── usePokemonDetail.ts       # Hook for Pokémon detail data
│   ├── usePokemonQueryParams.ts  # Hook for URL state management
│   └── useSearchLocalValue.ts    # Hook for Search component
├── lib/                        # Utility functions and types
│   ├── api.ts                    # PokéAPI client functions
│   ├── types.ts                  # TypeScript interfaces
│   └── utils.ts                  # Helper functions
├── public/                     # Static assets
│   ├── icon.svg                  # App icon
│   ├── apple-touch-icon.png      # iOS icon
│   └── placeholder.svg           # Fallback image
├── .gitignore                  # Git ignore rules
├── CACHING_GUIDE.md            # Caching implementation guide
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.ts          # TailwindCSS configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## API Documentation

This application uses the [PokéAPI](https://pokeapi.co/), a free RESTful API for Pokémon data.

### Key Endpoints Used

- `GET /api/v2/pokemon?limit={limit}&offset={offset}` - Fetch paginated list of Pokémon
- `GET /api/v2/pokemon/{id}` - Fetch detailed information for a specific Pokémon

### API Client Functions

The application includes a custom API client (`lib/api.ts`) with the following functions:

- `fetchPokemonList(limit, offset)` - Fetch paginated Pokémon list
- `fetchPokemonDetails(id)` - Fetch detailed data for a single Pokémon
- `fetchMultiplePokemon(ids)` - Fetch multiple Pokémon in parallel

All API functions include error handling and return typed responses.

## Caching System

This application implements an intelligent caching system using React Context API to optimize performance and reduce API calls.

### Key Features

- **List Caching**: All Pokémon names (1000+) are cached after the first fetch
- **Detail Caching**: Individual Pokémon details are cached by ID
- **Smart Fetching**: Only fetches missing data from the API
- **Time-based Expiration**: Cache automatically expires after 30 minutes
- **Optimized Performance**: Instant loading for previously viewed Pokémon

### How It Works

1. **First Visit**: Data is fetched from PokéAPI and stored in cache
2. **Subsequent Visits**: Data is loaded instantly from cache
3. **Pagination**: No additional API calls needed (list already cached)
4. **Search**: Filters cached data without API calls
5. **Detail Pages**: Returns cached data if already viewed

### Benefits

- ⚡ **Faster Loading**: Instant display of cached data
- 📉 **Reduced API Calls**: Up to 90% reduction in network requests
- 💾 **Better UX**: Smooth navigation without repeated loading states
- 🌐 **Bandwidth Savings**: Less data transfer after initial load

## Deployment

### Vercel (Recommended)

The easiest way to deploy this Next.js application is using [Vercel](https://vercel.com):

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy" and your application will be live

### Other Platforms

This application can be deployed to any platform that supports Node.js:

#### Build for Production

```bash
npm run build
```

#### Start Production Server

```bash
npm start
```

The application will be available on port 3000 by default.

### Environment Variables

This application does not require any environment variables as it uses the public PokéAPI.

## Features in Detail

### Pokémon List Page

- Hero section with integrated search functionality
- Displays 20 Pokémon per page with images and names
- Real-time search filtering by name (from cached data)
- URL-synced search and pagination state
- Pagination controls to browse all Pokémon
- Responsive grid layout (1-5 columns based on screen size)
- Loading skeletons and error handling with retry functionality

### Pokémon Detail Page

- High-quality official artwork with hover effects
- Pokémon name, ID, height, and weight
- Type badges with custom color coding per type
- Base stats visualization with animated progress bars
- Gradient backgrounds for enhanced visual appeal
- Back button with smooth navigation
- Instant loading for cached Pokémon
- Responsive layout for all devices

### Responsive Design

- **Mobile** (< 640px): Single column layout, touch-optimized
- **Tablet** (640px - 1024px): 2-3 column grid
- **Desktop** (> 1024px): 4-5 column grid with enhanced spacing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Performance Optimization

### Caching Strategy
- Context API for global state management
- In-memory caching with 30-minute expiration
- Smart batch fetching for missing data
- O(1) lookup performance for cached items

### Code Splitting
- Automatic code splitting via Next.js
- Dynamic imports for optimal bundle size
- Client-side navigation for instant page transitions

### Image Optimization
- Official Pokémon artwork from PokéAPI
- Responsive image sizing
- Lazy loading for off-screen images

## Acknowledgments

- [PokéAPI](https://pokeapi.co/) for providing the comprehensive Pokémon data
- [Next.js](https://nextjs.org/) team for the amazing framework
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icon library
