import path from "node:path";
import { fileURLToPath } from "node:url";
import { runEval } from "./runEval.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const suite = path.join(here, "../fixtures/eval-suite.yaml");

async function main() {
  console.log("=== Bad agent (should FAIL the gate) ===");
  const bad = await runEval(suite, "bad");
  console.log(`passed=${bad.passed} failed=${bad.failed}`);
  for (const r of bad.results) {
    console.log(`  [${r.pass ? "PASS" : "FAIL"}] ${r.id}`);
    if (!r.pass) r.failures.forEach((f) => console.log(`    - ${f}`));
  }

  console.log("\n=== Good agent (should PASS the gate) ===");
  const good = await runEval(suite, "good");
  console.log(`passed=${good.passed} failed=${good.failed}`);
  for (const r of good.results) {
    console.log(`  [${r.pass ? "PASS" : "FAIL"}] ${r.id}`);
  }

  if (bad.failed === 0) {
    console.error("Expected the bad agent to fail at least one case");
    process.exit(1);
  }
  if (good.failed > 0) {
    console.error("Expected the good agent to pass all cases");
    process.exit(1);
  }
}

main();
