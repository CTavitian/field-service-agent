import { readFile } from "node:fs/promises";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { complete, type AgentMode } from "./agents.js";
import { score, type Rubric } from "./rubric.js";

type Case = { id: string; input: string; rubric: Rubric };
type Suite = { name: string; cases: Case[] };

export async function runEval(suitePath: string, mode: AgentMode) {
  const raw = await readFile(path.resolve(suitePath), "utf8");
  const suite = parseYaml(raw) as Suite;
  const results = suite.cases.map((c) => {
    const output = complete(mode, c.input);
    const { pass, failures } = score(output, c.rubric);
    return { id: c.id, pass, failures, output };
  });
  const failed = results.filter((r) => !r.pass).length;
  return {
    suite: suite.name,
    mode,
    passed: results.length - failed,
    failed,
    results,
  };
}
