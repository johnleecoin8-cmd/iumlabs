import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
interface SeoulTimeDisplayProps {
  isCollapsed: boolean;
}
const SeoulTimeDisplay = ({
  isCollapsed
}: SeoulTimeDisplayProps) => {
  const [time, setTime] = useState<Date>(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Get Seoul time (UTC+9)
  const seoulTime = new Date(time.toLocaleString("en-US", {
    timeZone: "Asia/Seoul"
  }));
  const hours = seoulTime.getHours();
  const minutes = seoulTime.getMinutes().toString().padStart(2, "0");
  const formattedHours = hours.toString().padStart(2, "0");
  const dayOfWeek = seoulTime.getDay(); // 0 = Sunday, 6 = Saturday
  const date = seoulTime.getDate();
  const month = seoulTime.getMonth() + 1;

  // Day names in Korean
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = dayNames[dayOfWeek];

  // Check if within business hours (Mon-Fri, 09:00-18:00 KST)
  const isBusinessHours = dayOfWeek >= 1 && dayOfWeek <= 5 && hours >= 9 && hours < 18;
  if (isCollapsed) {
    return <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <motion.div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.3
        }}>
            <Clock className="w-3.5 h-3.5 text-white/35" />
            <div className={cn("w-1.5 h-1.5 rounded-full", isBusinessHours ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" : "bg-white/20")} />
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={10} className="bg-black/90 backdrop-blur-xl text-white text-[10px] font-medium px-3 py-2 rounded-lg border border-white/10">
          <div className="flex flex-col gap-1">
            <span className="text-white/50 text-[9px]">{month}/{date} ({dayName})</span>
            <span className="text-white/90">{formattedHours}:{minutes} KST</span>
            <span className={cn("text-[9px]", isBusinessHours ? "text-emerald-400" : "text-white/40")}>
              {isBusinessHours ? "Open Now" : "Closed"}
            </span>
          </div>
        </TooltipContent>
      </Tooltip>;
  }
  return <motion.div className="space-y-1.5" initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3
  }}>
      
      
    </motion.div>;
};
export default SeoulTimeDisplay;