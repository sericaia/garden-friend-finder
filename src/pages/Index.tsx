
import { useState, useEffect } from "react";
import VegetableSidebar from "@/components/VegetableSidebar";
import GardenGrid from "@/components/GardenGrid";
import CompanionshipDetails from "@/components/CompanionshipDetails";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

interface PlacedVegetable {
  id: string;
  vegetableId: string;
  x: number;
  y: number;
}

const GardenPlannerPage = () => {
  const [selectedVegetable, setSelectedVegetable] = useState<string | null>(null);
  const [placedVegetables, setPlacedVegetables] = useState<PlacedVegetable[]>([]);

  // Load saved garden from localStorage on initial render
  useEffect(() => {
    const savedGarden = localStorage.getItem("garden-layout");
    if (savedGarden) {
      try {
        setPlacedVegetables(JSON.parse(savedGarden));
      } catch (error) {
        console.error("Failed to load saved garden:", error);
      }
    }
  }, []);

  // Place a vegetable in the garden
  const handlePlaceVegetable = (vegetableId: string, x: number, y: number) => {
    const newVegetable: PlacedVegetable = {
      id: uuidv4(),
      vegetableId,
      x,
      y,
    };
    setPlacedVegetables([...placedVegetables, newVegetable]);
  };

  // Remove a vegetable from the garden
  const handleRemoveVegetable = (id: string) => {
    setPlacedVegetables(placedVegetables.filter((veg) => veg.id !== id));
  };

  // Clear the entire garden
  const handleClearGarden = () => {
    setPlacedVegetables([]);
  };

  // Save garden layout to localStorage
  const handleSaveGarden = () => {
    localStorage.setItem("garden-layout", JSON.stringify(placedVegetables));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto py-6 px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Garden Friend Finder</h1>
          <p className="text-muted-foreground">
            Plan your vegetable garden with companion planting suggestions
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar with vegetable selection */}
          <div className="lg:col-span-3">
            <VegetableSidebar
              selectedVegetable={selectedVegetable}
              onVegetableSelect={setSelectedVegetable}
              onClearGarden={handleClearGarden}
              onSaveGarden={handleSaveGarden}
            />
          </div>

          {/* Main garden grid */}
          <div className="lg:col-span-6 h-[500px]">
            <GardenGrid
              selectedVegetable={selectedVegetable}
              onPlaceVegetable={handlePlaceVegetable}
              placedVegetables={placedVegetables}
              onRemoveVegetable={handleRemoveVegetable}
            />
          </div>

          {/* Companionship details */}
          <div className="lg:col-span-3">
            <CompanionshipDetails placedVegetables={placedVegetables} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GardenPlannerPage;
