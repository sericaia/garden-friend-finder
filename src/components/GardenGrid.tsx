
import { useState, useRef, useEffect } from "react";
import { checkCompanionship, getVegetableById, Vegetable } from "@/data/vegetables";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PlacedVegetable {
  id: string;
  vegetableId: string;
  x: number;
  y: number;
}

interface GardenGridProps {
  selectedVegetable: string | null;
  onPlaceVegetable: (vegetableId: string, x: number, y: number) => void;
  placedVegetables: PlacedVegetable[];
  onRemoveVegetable: (id: string) => void;
}

const GardenGrid = ({
  selectedVegetable,
  onPlaceVegetable,
  placedVegetables,
  onRemoveVegetable,
}: GardenGridProps) => {
  const [draggingVegetable, setDraggingVegetable] = useState<string | null>(null);
  const [hoveredPosition, setHoveredPosition] = useState<{ x: number; y: number } | null>(null);
  const [companions, setCompanions] = useState<{ good: string[]; bad: string[] }>({ good: [], bad: [] });
  const gridRef = useRef<HTMLDivElement>(null);

  // Handle click on grid to place a vegetable
  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedVegetable || !gridRef.current) return;

    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    onPlaceVegetable(selectedVegetable, x, y);
  };

  // Handle mouse move to show placement preview and calculate companions
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current || !selectedVegetable) {
      setHoveredPosition(null);
      return;
    }

    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHoveredPosition({ x, y });

    // Calculate companionship status for each placed vegetable
    if (selectedVegetable) {
      const good: string[] = [];
      const bad: string[] = [];

      placedVegetables.forEach(placed => {
        const relationship = checkCompanionship(selectedVegetable, placed.vegetableId);
        if (relationship === "good") {
          good.push(placed.id);
        } else if (relationship === "bad") {
          bad.push(placed.id);
        }
      });

      setCompanions({ good, bad });
    }
  };

  // Handle mouse leave to hide placement preview
  const handleMouseLeave = () => {
    setHoveredPosition(null);
  };

  // Handle dragging functionality
  const startDragging = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDraggingVegetable(id);
  };

  const handleVegetableDoubleClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onRemoveVegetable(id);
    toast("Vegetable removed");
  };

  // Update companion indicators when selected vegetable changes
  useEffect(() => {
    if (!selectedVegetable) {
      setCompanions({ good: [], bad: [] });
    }
  }, [selectedVegetable]);

  // Get vegetable instance for preview
  const selectedVegetableData = selectedVegetable ? getVegetableById(selectedVegetable) : null;

  return (
    <div
      ref={gridRef}
      className="garden-grid soil-texture bg-garden-lightSoil relative rounded-lg shadow-inner-light w-full h-full overflow-hidden"
      onClick={handleGridClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Placed vegetables */}
      {placedVegetables.map((veg) => {
        const vegetable = getVegetableById(veg.vegetableId);
        if (!vegetable) return null;

        const isGoodCompanion = companions.good.includes(veg.id);
        const isBadCompanion = companions.bad.includes(veg.id);

        return (
          <div
            key={veg.id}
            className={cn(
              "absolute text-3xl vegetable",
              draggingVegetable === veg.id && "dragging"
            )}
            style={{
              left: `${veg.x - 20}px`,
              top: `${veg.y - 20}px`,
              zIndex: draggingVegetable === veg.id ? 100 : 10,
            }}
            onMouseDown={(e) => startDragging(e, veg.id)}
            onDoubleClick={(e) => handleVegetableDoubleClick(e, veg.id)}
          >
            <AnimatePresence>
              {(isGoodCompanion || isBadCompanion) && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className={cn(
                    "absolute inset-0 rounded-full -z-10 companion-indicator",
                    isGoodCompanion ? "bg-green-200/70" : "bg-red-200/70"
                  )}
                ></motion.div>
              )}
            </AnimatePresence>
            {vegetable.icon}
          </div>
        );
      })}

      {/* Hover preview */}
      {hoveredPosition && selectedVegetableData && (
        <div
          className="absolute text-3xl opacity-60 pointer-events-none"
          style={{
            left: `${hoveredPosition.x - 20}px`,
            top: `${hoveredPosition.y - 20}px`,
            zIndex: 5,
          }}
        >
          {selectedVegetableData.icon}
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-3 text-sm">
        <div className="flex items-center space-x-2 mb-2">
          <div className="h-3 w-3 rounded-full bg-green-200"></div>
          <span>Good companion</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-200"></div>
          <span>Bad companion</span>
        </div>
      </div>

      {/* Helper text */}
      {selectedVegetable ? (
        <Badge variant="secondary" className="absolute top-4 right-4">
          Click to place • Double-click to remove
        </Badge>
      ) : (
        <Badge variant="secondary" className="absolute top-4 right-4">
          Select a vegetable from the sidebar
        </Badge>
      )}
    </div>
  );
};

export default GardenGrid;
