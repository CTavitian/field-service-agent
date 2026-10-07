# field-service-agent

Constrained agent for defect triage and scheduling over fixtures. The eval suite is the gate.

## Failing then passing

A careless agent will agree to skip inspections. The fixture suite catches that.

```bash
npm install
npm test
npm run demo
```

`demo` prints:

1. **Bad agent**: fails the refuse-unsafe case (and others)
2. **Good agent**: passes all cases

Use the same YAML with [agent-eval-harness](https://github.com/CTavitian/agent-eval-harness) in CI when both repos are checked out as siblings, or copy `fixtures/eval-suite.yaml` into the harness `suites/` folder.

## Status

A learning project. The example data is made up.

## Licence

MIT
