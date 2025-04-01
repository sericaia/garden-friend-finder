
import { useState, useEffect } from "react";
import { getVegetableById } from "@/data/vegetables";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PlacedVegetable {
  id: string;
  vegetableId: string;
  x: number;
  y: number;
}

interface CompanionshipDetailsProps {
  placedVegetables: PlacedVegetable[];
}

const CompanionshipDetails = ({ placedVegetables }: CompanionshipDetailsProps) => {
  const [relationships, setRelationships] = useState<Array<{
    veg1: string;
    veg2: string;
    relationship: "good" | "bad";
  }>>([]);

  // Calculate relationships when placed vegetables change
  useEffect(() => {
    const newRelationships = [];
    
    // Check each pair of vegetables
    for (let i = 0; i < placedVegetables.length; i++) {
      const veg1 = getVegetableById(placedVegetables[i].vegetableId);
      if (!veg1) continue;
      
      for (let j = i + 1; j < placedVegetables.length; j++) {
        const veg2 = getVegetableById(placedVegetables[j].vegetableId);
        if (!veg2) continue;
        
        // Check if they are companions or antagonists
        if (veg1.companions.includes(veg2.id)) {
          newRelationships.push({
            veg1: veg1.name,
            veg2: veg2.name,
            relationship: "good"
          });
        } else if (veg1.antagonists.includes(veg2.id)) {
          newRelationships.push({
            veg1: veg1.name,
            veg2: veg2.name,
            relationship: "bad"
          });
        }
      }
    }
    
    setRelationships(newRelationships);
  }, [placedVegetables]);

  // Group relationships by type
  const goodRelationships = relationships.filter(r => r.relationship === "good");
  const badRelationships = relationships.filter(r => r.relationship === "bad");

  if (placedVegetables.length <= 1) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Companion Planting Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Place at least two vegetables in your garden to see their relationships.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full overflow-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Companion Planting Guide</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <span className="h-3 w-3 rounded-full bg-green-200 mr-2"></span>
            Good Companions
          </h3>
          {goodRelationships.length > 0 ? (
            <ul className="space-y-1">
              {goodRelationships.map((rel, idx) => (
                <li key={idx} className="text-sm">
                  <Badge variant="outline" className="bg-green-50 mr-1">
                    {rel.veg1}
                  </Badge>
                  and
                  <Badge variant="outline" className="bg-green-50 ml-1">
                    {rel.veg2}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm">No good companions found in your current layout.</p>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <span className="h-3 w-3 rounded-full bg-red-200 mr-2"></span>
            Bad Companions
          </h3>
          {badRelationships.length > 0 ? (
            <ul className="space-y-1">
              {badRelationships.map((rel, idx) => (
                <li key={idx} className="text-sm">
                  <Badge variant="outline" className="bg-red-50 mr-1">
                    {rel.veg1}
                  </Badge>
                  and
                  <Badge variant="outline" className="bg-red-50 ml-1">
                    {rel.veg2}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm">No bad companions found - great job!</p>
          )}
        </div>

        <div className="pt-2 border-t text-xs text-muted-foreground">
          <p>Tip: Double-click on a vegetable to remove it from the garden.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanionshipDetails;
