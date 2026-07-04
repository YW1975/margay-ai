# Gates and Attestation

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

Gates and attestations make CCL delivery auditable by tying submitted work to test commands, pass/fail counts, changed cases, process evidence, and reviewer outcomes.

<!-- section: capabilities -->
## Capabilities

- Record exact test commands and results.
- Tie code or documentation changes to acceptance cases.
- Use policy checks to block missing evidence when configured.
- Separate architecture discussion from development-start test gating.
- Preserve reviewer evidence so a later audit can reconstruct why a slice passed.

<!-- section: operational-model -->
## Operational model

- For documentation work, gates should prove publication safety, language parity, link integrity, translation quality, and source accuracy rather than imitating unit-test TDD.
- For code-bearing work, gates should prove the behavior changed and the surrounding regression suite still passes.
- A PASS is review evidence, not a shortcut around failed gates.

<!-- section: configuration -->
## Configuration and commands

- Use attest lines in RLL submissions and keep logs under `.dual-agent/harness-results` when appropriate.
- `[PLAN]` is for architecture and scope alignment. `[TDD-PLAN]` is the development-start checkpoint that locks concrete test cases for complex or expert code-bearing slices.
- `[CODE]` and `[FIX]` submissions must carry `Test-Process`, `Test-Cases`, and `Test-Results` lines so Lisa and later auditors can connect claims to evidence.

## Gates

<a id="gates"></a>

A gate is a runnable check tied to a claim. For public docs, useful gates include generated-doc parity, link integrity, source-evidence existence, forbidden-branding scan, private-path/secret scan, site build, and live URL fetch after deployment. A broad passing command is weak evidence when it does not cover the claim being made.

## Gate Types

| Gate type | Proves | Example for docs | Example for code |
| --- | --- | --- | --- |
| Structure | Required artifacts exist and match inventory. | Every inventory page exists in `en`, `zh`, and `ja`. | Expected source and test files are present. |
| Safety | Public output does not leak private or sensitive data. | Secret, private-path, and forbidden branding scans pass. | Secret and dangerous-permission checks pass. |
| Behavioral | The changed behavior actually works. | Rendered site contains the new page content and links. | Unit, integration, smoke, or e2e tests exercise the changed path. |
| Source accuracy | Claims are backed by source or runtime output. | Page source-evidence points to real files and verified commands. | Tests cite the function, CLI path, or API response they validate. |
| Review | A second agent checked the evidence. | Lisa cites page lines and validation commands. | Lisa reruns or inspects the relevant tests and changed files. |

## Attestation

<a id="attestation"></a>

Attestation records the process evidence: what command ran, what it covered, whether it passed, where the log lives, and which acceptance case it proves. In RLL submissions, the required `Test-Process`, `Test-Cases`, and `Test-Results` lines are meant to make the evidence falsifiable.

Required Ralph attest lines for `[CODE]` and `[FIX]`:

| Line | Purpose |
| --- | --- |
| `Test-Process` | Summarizes what was changed and points to the process evidence file or diff range. |
| `Test-Cases` | Names the locked plan rows exercised by this round. |
| `Test-Results` | Gives the exact command, pass/fail/total counts, and evidence file. |

Required Lisa review evidence:

| Review item | Purpose |
| --- | --- |
| File and line cites | Prevents rubber-stamp review by tying approval to concrete artifacts. |
| Test log or command result | Shows Lisa checked the stated oracle, not only the prose. |
| Pass rationale or needs-work reason | Records the technical reason for the decision. |

## Complexity Gates

<a id="complexity-gates"></a>

Complexity gates should scale with risk. A documentation-only slice should not pretend that unrelated unit tests prove content quality, but it should run documentation-specific checks. A code-bearing slice should include the relevant unit, integration, smoke, security, or e2e tiers from the project manifest and plan.

## Documentation Evidence Pattern

For official documentation, the strongest evidence set is:

| Evidence | Why it matters |
| --- | --- |
| Inventory parity | Proves every public page exists in every supported language. |
| Section-marker parity | Proves translations preserve the same structural contract. |
| Public content audit | Blocks secrets, local paths, private deployment details, and stale version claims. |
| Site build | Proves the generated static site can be published. |
| Rendered HTML spot checks | Proves the content is present after markdown-to-site conversion. |
| Source-evidence scan | Proves factual claims point back to implementation or runtime output. |

This is why documentation tasks do not need fake TDD. They still need tests, but the tests should verify documentation truthfulness, safety, and publishability.

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md`
- `gate-manifest.json`
- `.dual-agent`

<!-- section: related -->
## Related pages

- [Ralph-Lisa Loop](ralph-lisa-loop.md)
- [Clarify and Planning](clarify-and-planning.md)
- [GitHub and CI Workflows](github-ci.md)
