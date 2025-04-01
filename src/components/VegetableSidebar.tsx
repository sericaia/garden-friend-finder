
import { vegetables } from "@/data/vegetables";
import VegetableItem from "./VegetableItem";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Trash2, Save } from "lucide-react";
import { toast } from "sonner";

interface VegetableSidebarProps {
  selectedVegetable: string | null;
  onVegetableSelect: (id: string) => void;
  onClearGarden: () => void;
  onSaveGarden: () => void;
}

const VegetableSidebar = ({
  selectedVegetable,
  onVegetableSelect,
  onClearGarden,
  onSaveGarden,
}: VegetableSidebarProps) => {
  const handleClear = () => {
    onClearGarden();
    toast("Garden cleared");
  };

  const handleSave = () => {
    onSaveGarden();
    toast("Garden layout saved");
  };

  return (
    <div className="bg-card border rounded-lg shadow-sm p-4 flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-4">Vegetables</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Select a vegetable and place it in your garden
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-6">
        {vegetables.map((vegetable) => (
          <VegetableItem
            key={vegetable.id}
            vegetable={vegetable}
            onClick={() => onVegetableSelect(vegetable.id)}
            isSelected={selectedVegetable === vegetable.id}
          />
        ))}
      </div>
      
      <div className="mt-auto">
        <Separator className="my-4" />
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleClear}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear
          </Button>
          <Button 
            className="flex-1"
            onClick={handleSave}
          >
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VegetableSidebar;
