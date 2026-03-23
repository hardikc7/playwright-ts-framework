# Multi-Agent Test Automation Pipeline

## How to use
1. Open Claude Code: `cd playwright-ts-framework` then `claude`
2. Replace the 4 variables below
3. Paste the filled template into Claude Code
4. Watch all agents execute automatically

## Variables to replace
| Variable | Description | Example |
|----------|-------------|---------|
| [PAGE_URL] | Full URL of page to test | https://the-internet.herokuapp.com/login |
| [NUMBER] | How many test cases | 3 |
| [SCOPE] | What to cover | basic functional / happy path / negative / all |
| [FEATURE_NAME] | Name for generated files | Login, Dropdown, FileUpload |

## Pipeline template
```
You are a multi-agent test automation pipeline.
Execute each agent in sequence. Each agent depends on the previous agent's output.

AGENT 1 — Test Case Writer:
Research [PAGE_URL] by visiting it.
Write [NUMBER] functional test cases covering [SCOPE].
Save them to docs/[FEATURE_NAME]-testcases.md in this format:
| TC ID | Scenario | Steps | Expected Result | Priority |
Save the file. Do not proceed to Agent 2 until file is saved.

AGENT 2 — Analyzer:
Read docs/[FEATURE_NAME]-testcases.md from disk.
Read ALL existing files in pages/, tests/, test-data/ to understand patterns.
Before generating any code, decide:
1. How many page classes are needed?
   - If workflow spans multiple pages create one class per page
   - If single page create one class only
2. Is a test data file needed?
   - If tests need credentials, input variations, expected messages → create test-data/[FEATURE_NAME]Data.json
   - If no variable input data → skip test data file
Document your decisions. Do not proceed to Agent 3 until analysis is complete.

AGENT 3 — Code Generator:
Based on Agent 2 decisions, generate only what is needed:
- pages/[FEATURE_NAME]Page.ts for each page identified
- test-data/[FEATURE_NAME]Data.json if needed
- tests/[FEATURE_NAME].spec.ts
Follow exact same patterns from existing files read in Agent 2.
Map every TC from the doc to a test in the spec file.
Do not proceed to Agent 4 until all files are saved.

AGENT 4 — Executor:
Run: npx playwright test tests/[FEATURE_NAME].spec.ts
Read error output if any test fails.
Fix the code. Run again.
Repeat until all tests pass.
Report final results with pass/fail count.
```

## Examples

### Infinite Scroll
```
PAGE_URL     = https://the-internet.herokuapp.com/infinite_scroll
NUMBER       = 2
SCOPE        = basic functional
FEATURE_NAME = infiniteScroll
```
Generated: `docs/infiniteScroll-testcases.md`, `pages/InfiniteScrollPage.ts`, `tests/infiniteScroll.spec.ts`

### Login with dashboard
```
PAGE_URL     = https://the-internet.herokuapp.com/login
NUMBER       = 3
SCOPE        = happy path and negative
FEATURE_NAME = Login
```
Generated: `docs/Login-testcases.md`, `pages/LoginPage.ts`, `pages/DashboardPage.ts`, `test-data/LoginData.json`, `tests/Login.spec.ts`
