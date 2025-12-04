// Error message component with retry functionality
import { CircleX } from "lucide-react";
import Button from './Button';

interface ErrorMessageProps {
  message: string | null;
  onRetry?: () => void;
}

export default function ErrorMessage({
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 text-center animate-scale-in">
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-xl">
        <div className="bg-red-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <CircleX size={54} className="text-red-600"/>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-red-800 mb-3">
          Oops! Something went wrong
        </h3>
        <p className="text-sm sm:text-base text-red-600 mb-6 font-medium">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="danger">
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}
