import { Lightbulb } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface SuggestionCardProps {
  title: string;
  suggestions: string[];
  defaultLabel: string;
  onUseDefault: () => void;
}

export function SuggestionCard({
  title,
  suggestions,
  defaultLabel,
  onUseDefault,
}: SuggestionCardProps) {
  return (
    <Card className="border-dashed border-primary/40 bg-primary/5">
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <Lightbulb className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <p className="font-medium text-sm text-primary">{title}</p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-primary/80">
              {suggestions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <Button size="sm" variant="secondary" onClick={onUseDefault}>
            Use a safe default ({defaultLabel})
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
