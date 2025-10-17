import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle color scheme"
        >
          <Sun
            className={`h-5 w-5 transition-opacity ${
              theme === "dark" ? "hidden" : "block"
            }`}
            aria-hidden={theme === "dark"}
          />
          <Moon
            className={`h-5 w-5 transition-opacity ${
              theme === "dark" ? "block" : "hidden"
            }`}
            aria-hidden={theme === "light"}
          />
          <span className="sr-only">
            Switch to {theme === "dark" ? "light" : "dark"} mode
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        Switch to {theme === "dark" ? "light" : "dark"} mode
      </TooltipContent>
    </Tooltip>
  );
}
