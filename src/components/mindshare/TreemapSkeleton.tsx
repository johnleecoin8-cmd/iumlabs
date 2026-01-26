import { cn } from '@/lib/utils';

interface TreemapSkeletonProps {
  className?: string;
}

const TreemapSkeleton = ({ className }: TreemapSkeletonProps) => {
  return (
    <div className={cn('w-full h-full min-h-[300px] sm:min-h-[400px]', className)}>
      {/* Mobile: Simpler 2-column grid */}
      <div className="grid grid-cols-2 sm:hidden gap-2 h-full p-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="w-full rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 animate-pulse aspect-[4/3]">
            <div className="p-2.5 h-full flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/10" />
                <div className="w-10 h-3 rounded bg-white/10" />
              </div>
              <div className="w-12 h-4 rounded bg-white/10" />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Full grid */}
      <div className="hidden sm:grid grid-cols-12 grid-rows-6 gap-1.5 h-full p-2">
        {/* Large cell 1 */}
        <div className="col-span-4 row-span-3">
          <div className="w-full h-full rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 animate-pulse">
            <div className="p-3 h-full flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10" />
                <div className="space-y-1.5">
                  <div className="w-14 h-4 rounded bg-white/10" />
                  <div className="w-10 h-2.5 rounded bg-white/5" />
                </div>
              </div>
              <div className="w-20 h-7 rounded bg-white/10" />
            </div>
          </div>
        </div>
        
        {/* Large cell 2 */}
        <div className="col-span-3 row-span-3">
          <div className="w-full h-full rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 animate-pulse">
            <div className="p-3 h-full flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10" />
                <div className="space-y-1.5">
                  <div className="w-12 h-4 rounded bg-white/10" />
                  <div className="w-8 h-2.5 rounded bg-white/5" />
                </div>
              </div>
              <div className="w-16 h-6 rounded bg-white/10" />
            </div>
          </div>
        </div>

        {/* Medium cells container */}
        <div className="col-span-5 row-span-3 grid grid-cols-2 grid-rows-2 gap-1.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full h-full rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 animate-pulse">
              <div className="p-2.5 h-full flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/10" />
                  <div className="w-10 h-3 rounded bg-white/10" />
                </div>
                <div className="w-12 h-4 rounded bg-white/10" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="col-span-12 row-span-3 grid grid-cols-6 gap-1.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="w-full h-full rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 animate-pulse">
              <div className="p-2.5 h-full flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/10" />
                  <div className="w-8 h-3 rounded bg-white/10" />
                </div>
                <div className="w-10 h-3.5 rounded bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreemapSkeleton;
