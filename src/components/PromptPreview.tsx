import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import copy from "copy-to-clipboard";
import { Check, Clipboard, FileDown, Share2 } from "lucide-react";
import { useWizardStore } from "../store/useWizardStore";
import {
  buildPrompt,
  checklistLabels,
  computeChecklist,
} from "../lib/promptBuilder";
import { encodeStateToQuery } from "../lib/url";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

function normalizeScore(score: number) {
  return Math.max(0, Math.min(5, score));
}

function checklistVariant(score: number) {
  const value = normalizeScore(score);
  if (value >= 3) return "success" as const;
  if (value >= 1) return "warning" as const;
  return "danger" as const;
}

function downloadFile(contents: string, filename: string, mime: string) {
  const blob = new Blob([contents], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function PromptPreview() {
  const data = useWizardStore((state) => state.data);
  const prompt = useMemo(() => buildPrompt(data), [data]);
  const checklist = useMemo(() => computeChecklist(data), [data]);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(prompt);
      } else {
        copy(prompt);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { 
      copy(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExportMarkdown = () => {
    downloadFile(prompt, "prompt.md", "text/markdown");
  };

  const handleExportJson = () => {
    downloadFile(
      JSON.stringify({ prompt, data }, null, 2),
      "prompt.json",
      "application/json",
    );
  };

  const handleShare = async () => {
    const baseUrl = new URL(window.location.href);
    baseUrl.search = encodeStateToQuery(data);
    const shareUrl = baseUrl.toString();
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        copy(shareUrl);
      }
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch { 
      copy(shareUrl);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <Card className="h-full border-primary/30 shadow-lg">
      <CardHeader className="gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle>Live Prompt Preview</CardTitle>
            <CardDescription>
              Changes update in real time. Share, copy, or export when ready.
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              aria-label="Copy prompt to clipboard"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Clipboard className="h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportMarkdown}
              aria-label="Export as markdown"
            >
              <FileDown className="h-4 w-4" />
              .md
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportJson}
              aria-label="Export as JSON"
            >
              <FileDown className="h-4 w-4" />
              .json
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleShare}
              aria-label="Copy shareable link"
            >
              {shared ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
              {shared ? "Link copied!" : "Share"}
            </Button>
          </div>
        </div>
        <div
          className="flex flex-wrap gap-2"
          aria-label="Prompt quality checklist"
        >
          {Object.entries(checklist).map(([key, score]) => {
            const normalized = normalizeScore(score);
            return (
              <Badge key={key} variant={checklistVariant(normalized)}>
                {checklistLabels[key as keyof typeof checklistLabels]}: {normalized}/5
              </Badge>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="prose prose-sm max-w-none overflow-y-auto rounded-lg bg-muted/20 p-4 text-foreground shadow-inner dark:prose-invert">
        <ReactMarkdown>{prompt}</ReactMarkdown>
      </CardContent>
    </Card>
  );
}
