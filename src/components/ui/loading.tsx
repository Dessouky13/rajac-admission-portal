import React from "react";
import { Loader2, Skeleton } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className,
  text
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
      <Loader2 className={cn("animate-spin text-green-600", sizeClasses[size])} />
      {text && (
        <p className="text-sm text-gray-600 text-center">{text}</p>
      )}
    </div>
  );
};

interface SkeletonLoaderProps {
  className?: string;
  count?: number;
  height?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className,
  count = 1,
  height = "h-4"
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn("w-full rounded", height)}
        />
      ))}
    </div>
  );
};

interface PageLoaderProps {
  message?: string;
  showSpinner?: boolean;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  message = "Loading...",
  showSpinner = true
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="text-center space-y-4">
        {showSpinner && (
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-green-200 rounded-full animate-spin border-t-green-600"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 bg-green-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">{message}</h3>
          <p className="text-sm text-gray-600">Please wait while we process your request</p>
        </div>
      </div>
    </div>
  );
};

interface FormSkeletonProps {
  sections?: number;
  fieldsPerSection?: number;
}

export const FormSkeleton: React.FC<FormSkeletonProps> = ({
  sections = 4,
  fieldsPerSection = 6
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </div>

      {/* Form Sections */}
      {Array.from({ length: sections }).map((_, sectionIndex) => (
        <div key={sectionIndex} className="space-y-4">
          {/* Section Header */}
          <div className="border-b border-gray-200 pb-2">
            <Skeleton className="h-6 w-48" />
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: fieldsPerSection }).map((_, fieldIndex) => (
              <div key={fieldIndex} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Submit Button */}
      <div className="flex justify-center pt-6">
        <Skeleton className="h-12 w-32" />
      </div>
    </div>
  );
};

interface CardSkeletonProps {
  count?: number;
  showImage?: boolean;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  count = 3,
  showImage = false
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 space-y-4">
          {showImage && (
            <Skeleton className="h-32 w-full rounded-md" />
          )}
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
};

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 4
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <Skeleton className="h-6 w-32" />
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="px-6 py-4">
            <div className="flex gap-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton
                  key={colIndex}
                  className="h-4 flex-1"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Mobile-optimized loading states
export const MobileLoadingStates = {
  Spinner: LoadingSpinner,
  Skeleton: SkeletonLoader,
  Page: PageLoader,
  Form: FormSkeleton,
  Card: CardSkeleton,
  Table: TableSkeleton
}; 