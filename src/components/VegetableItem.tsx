
import { Vegetable } from "@/data/vegetables";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { X } from "lucide-react";

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
              "vegetable p-2 rounded-full flex items-center justify-center text-2xl md:text-3xl transition-all relative",
              isSelected && "ring-2 ring-primary ring-offset-2 bg-muted animate-pulse-gentle"
            )}
            aria-label={isSelected ? `Deselect ${vegetable.name}` : `Select ${vegetable.name}`}
          >
            <span role="img" aria-label={vegetable.name}>
              {vegetable.icon}
            </span>
            {isSelected && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center text-xs">
                <X className="h-3 w-3" />
              </span>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <div className="space-y-1">
            <p className="font-semibold">{vegetable.name}</p>
            <p className="text-xs max-w-52">{vegetable.description}</p>
            {isSelected && <p className="text-xs text-muted-foreground">Click again to deselect</p>}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VegetableItem;
