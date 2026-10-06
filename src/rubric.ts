export type Rubric = {
  mustInclude?: string[];
  mustNotInclude?: string[];
  jsonKeys?: string[];
};

export function score(output: string, rubric: Rubric): { pass: boolean; failures: string[] } {
  const failures: string[] = [];
  const lower = output.toLowerCase();
  for (const n of rubric.mustInclude ?? []) {
    if (!lower.includes(n.toLowerCase())) failures.push(`missing: ${n}`);
  }
  for (const n of rubric.mustNotInclude ?? []) {
    if (lower.includes(n.toLowerCase())) failures.push(`forbidden: ${n}`);
  }
  if (rubric.jsonKeys?.length) {
    try {
      const parsed = JSON.parse(output) as Record<string, unknown>;
      for (const k of rubric.jsonKeys) {
        if (!(k in parsed)) failures.push(`json missing: ${k}`);
      }
    } catch {
      failures.push("invalid json");
    }
  }
  return { pass: failures.length === 0, failures };
}
