import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-muted",
        className
      )}
    />
  );
};

// Card skeleton for projects/cases
export const CardSkeleton = () => {
  return (
    <div className="p-6 md:p-8 lg:p-10 border-b border-border">
      <div className="flex items-start gap-6">
        <Skeleton className="w-20 h-20 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-full max-w-xs" />
        </div>
      </div>
    </div>
  );
};

// Article skeleton for research/insights
export const ArticleSkeleton = () => {
  return (
    <div className="p-6 md:p-8 lg:p-10 border-b border-border">
      <div className="flex items-center gap-3 mb-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-14" />
      </div>
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-4" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
};

// Service card skeleton
export const ServiceSkeleton = () => {
  return (
    <div className="p-6 md:p-8 lg:p-10 border-b border-r border-border">
      <Skeleton className="w-10 h-10 rounded-xl mb-6" />
      <Skeleton className="h-6 w-40 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-6" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
};

// Hero skeleton
export const HeroSkeleton = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6">
      <div className="text-center space-y-6 max-w-4xl">
        <Skeleton className="h-16 w-3/4 mx-auto" />
        <Skeleton className="h-16 w-2/3 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
        <Skeleton className="h-12 w-40 mx-auto rounded-full" />
      </div>
    </div>
  );
};

// Stats skeleton
export const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="text-center space-y-2">
          <Skeleton className="h-10 w-20 mx-auto" />
          <Skeleton className="h-4 w-24 mx-auto" />
        </div>
      ))}
    </div>
  );
};

// Page loading skeleton
export const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSkeleton />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {[...Array(4)].map((_, i) => (
            <ServiceSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
