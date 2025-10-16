import { useEffect, useState } from "react";
import { useWizardStore } from "../store/useWizardStore";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

export function StepContext() {
  const context = useWizardStore((state) => state.data.context);
  const updateContext = useWizardStore((state) => state.updateContext);
  const [details, setDetails] = useState(context.details);
  const [snippet, setSnippet] = useState(context.snippet);

  useEffect(() => {
    setDetails(context.details);
  }, [context.details]);

  useEffect(() => {
    setSnippet(context.snippet);
  }, [context.snippet]);

  useEffect(() => {
    const handle = setTimeout(() => {
      updateContext({ details });
    }, 250);
    return () => clearTimeout(handle);
  }, [details, updateContext]);

  useEffect(() => {
    const handle = setTimeout(() => {
      updateContext({ snippet });
    }, 250);
    return () => clearTimeout(handle);
  }, [snippet, updateContext]);

  return (
    <section aria-label="Provide context" className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Provide the backdrop for this task. Mention goals, recent changes, or
        blockers so the assistant can reason accurately.
      </p>
      <div className="space-y-2">
        <label htmlFor="context-summary" className="text-sm font-medium">
          Context summary
        </label>
        <Input
          id="context-summary"
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          placeholder="Example: Investigate why the new checkout flow throws a 500 error when applying coupons."
          aria-describedby="context-summary-help"
        />
        <p id="context-summary-help" className="text-xs text-muted-foreground">
          Summarize the situation, requirements, or business goals.
        </p>
      </div>
      <div className="space-y-2">
        <label htmlFor="context-snippet" className="text-sm font-medium">
          Optional code or logs
        </label>
        <Textarea
          id="context-snippet"
          value={snippet}
          onChange={(event) => setSnippet(event.target.value)}
          placeholder={`Paste the relevant code, stack traces, or API contracts here.
Example:
function applyCoupon(cart) {
  if (!cart.coupon) throw new Error("coupon missing");
  ...
}`}
          aria-describedby="context-snippet-help"
        />
        <p id="context-snippet-help" className="text-xs text-muted-foreground">
          Include only what is needed. Sensitive data stays on your machine.
        </p>
      </div>
    </section>
  );
}
