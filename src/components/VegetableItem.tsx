
import { Vegetable } from "@/data/vegetables";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VegetableItemProps {
  vegetable: Vegetable;
  onClick: () => void;
  isSelected: boolean;
}

const VegetableItem = ({ vegetable, onClick, isSelected }: VegetableItemProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className={cn(
              "vegetable p-2 rounded-full flex items-center justify-center text-2xl md:text-3xl transition-all",
              isSelected && "ring-2 ring-primary ring-offset-2 bg-muted animate-pulse-gentle"
            )}
            aria-label={vegetable.name}
          >
            <span role="img" aria-label={vegetable.name}>
              {vegetable.icon}
            </span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <div className="space-y-1">
            <p className="font-semibold">{vegetable.name}</p>
            <p className="text-xs max-w-52">{vegetable.description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VegetableItem;
