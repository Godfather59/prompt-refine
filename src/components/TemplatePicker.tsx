import { useState } from "react";
import { Sparkles } from "lucide-react";
import { templates } from "../lib/templates";
import { useWizardStore } from "../store/useWizardStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function TemplatePicker() {
  const [selectedId, setSelectedId] = useState<string>("");
  const [open, setOpen] = useState(false);
  const applyTemplate = useWizardStore((state) => state.applyTemplate);

  const chosenTemplate = templates.find((item) => item.id === selectedId);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="h-4 w-4 text-primary" />
          Jump-start with a template
        </div>
        <Dialog open={open && Boolean(chosenTemplate)} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="w-56">
              <Select
                value={selectedId}
                onValueChange={(value) => {
                  setSelectedId(value);
                  setOpen(true);
                }}
              >
                <SelectTrigger aria-label="Template selection">
                  <SelectValue placeholder="Choose template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </DialogTrigger>
          {chosenTemplate ? (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Apply template?</DialogTitle>
                <DialogDescription>
                  This replaces your current answers with the preset from{" "}
                  <strong>{chosenTemplate.name}</strong>. You can tweak details
                  after applying it.
                </DialogDescription>
              </DialogHeader>
              <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
                {chosenTemplate.description}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      applyTemplate(chosenTemplate.preset, chosenTemplate.id);
                      setTimeout(() => setSelectedId(""), 0);
                    }}
                  >
                    Apply template
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          ) : null}
        </Dialog>
      </div>
      <p className="text-xs text-muted-foreground">
        Templates populate the wizard with sensible defaults for common tasks.
      </p>
    </div>
  );
}
