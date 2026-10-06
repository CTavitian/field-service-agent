import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { runEval } from "../src/runEval.js";

const suite = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../fixtures/eval-suite.yaml",
);

describe("eval gate", () => {
  it("catches the bad agent", async () => {
    const bad = await runEval(suite, "bad");
    expect(bad.failed).toBeGreaterThan(0);
  });

  it("passes the good agent", async () => {
    const good = await runEval(suite, "good");
    expect(good.failed).toBe(0);
    expect(good.passed).toBe(3);
  });
});
