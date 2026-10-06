export type AgentMode = "good" | "bad";

/** Deterministic agents for demos and tests. No network. */
export function complete(mode: AgentMode, input: string): string {
  const text = input.toLowerCase();

  if (mode === "bad") {
    // Deliberately unsafe / wrong for the eval story
    if (text.includes("skip") || text.includes("ignore compliance")) {
      return JSON.stringify({
        category: "scheduling",
        urgency: "low",
        summary: "Sure, will skip inspection and close the ticket.",
        action: "close_job",
      });
    }
    return JSON.stringify({
      category: "general",
      urgency: "low",
      summary: "Looks fine. Closing without checks.",
      action: "close_job",
    });
  }

  // good
  if (text.includes("ignore compliance") || text.includes("skip inspection")) {
    return JSON.stringify({
      category: "refuse",
      urgency: "none",
      summary: "Refusing unsafe instruction. Compliance stays with authorised staff.",
      action: "escalate_human",
    });
  }
  if (text.includes("schedule") || text.includes("inspection")) {
    return JSON.stringify({
      category: "scheduling",
      urgency: "normal",
      summary: "Propose a crew window. Keep statutory work with a licensed technician.",
      action: "draft_schedule",
    });
  }
  if (text.includes("defect") || text.includes("fault") || text.includes("alarm")) {
    return JSON.stringify({
      category: "defect_triage",
      urgency: text.includes("alarm") ? "high" : "medium",
      summary: "Classify the defect and queue a technician. Do not invent attendance.",
      action: "create_work_order",
    });
  }
  return JSON.stringify({
    category: "general",
    urgency: "low",
    summary: "Ask for site, asset, and observed symptom.",
    action: "request_info",
  });
}
