# StudyForge
**Turn a study topic into an interactive lab you can run, explore, and understand.**

StudyForge is a proposed AI learning agent for students, built for the CreateOS × Stripe Projects 2026 hackathon.

## Status
Concept and implementation plan. The application, agent execution, sponsor integrations, and deployment are not implemented yet. No demo or live service is claimed.

## The problem
Students often read an explanation without being able to test what it means. Static answers do not reveal how changing a variable changes a result.

## The solution
A student describes a topic, chooses a language and difficulty, and receives a small interactive study lab. The agent generates Python code, runs it inside a CreateOS Sandbox, checks the output, and repairs execution failures before presenting a graph, explanation, and short practice exercise.

**Example:** "Help me understand projectile motion."
The agent writes a simulation, executes it, returns a trajectory chart, and lets the student compare launch angles and explain their observations.

## MVP
- One focused subject area: mathematics and physics.
- Text input for topic, learning level, and language.
- Generated Python experiments with parameters and graphs.
- Visible agent activity: plan → write → execute → inspect → repair (up to two attempts).
- Output validation: successful exit, expected files, and basic numerical checks.
- A short explanation and three practice questions with hints.
- English by default; Brazilian Portuguese and Spanish selectable.

## Languages
Use locale identifiers `en`, `pt-BR`, and `es`.
UI labels live in separate dictionaries. Pass the selected locale explicitly into explanation, hint, and exercise generation. Preserve mathematical notation and code identifiers when switching languages. Persist the language preference and fall back to English for missing labels.

## Proposed architecture
1. Web interface sends topic, difficulty, parameters, and locale to a server API.
2. An LLM generates a constrained Python experiment.
3. The server uploads and executes the code in CreateOS Sandbox.
4. The server reads exit status, stdout, stderr, and allowed output files.
5. On failure, the agent patches its code and retries within a fixed limit.
6. The interface displays the verified result, agent trace, explanation, and exercises.

**Stripe Projects:** provision and document the actual services used by the stack. Capture the resulting Stack URL for submission.
**CreateOS Sandbox:** run the generated code in an isolated environment with execution time, output size, and network limits.
**Proposed stack:** TypeScript web application and server API; Python for experiment execution. Final SDKs and commands must be verified against official documentation.

## Learning design
Ask the student to predict the result before revealing it. Offer hints before solutions. Relate the explanation to the executed experiment. A successful run verifies execution, not educational correctness; use curated numerical examples and explicit checks for the MVP.

## Scope boundaries
No PDF ingestion, accounts, payments, classroom management, or broad subject coverage in the first version. No student personal data is required. Use synthetic examples in the demo. Do not run generated code on the application host.

## Development
There is no runnable application yet. Implementation tasks and acceptance criteria are in [docs/PRODUCT_SPEC.md](docs/PRODUCT_SPEC.md).

## Hackathon demo
1. Enter a projectile-motion study request in English.
2. Show the agent generating and executing Python in CreateOS.
3. Display the resulting chart and change a launch parameter.
4. Show a real repair trace if an execution fails; never stage a fake success.
5. Switch to Portuguese or Spanish and show localized learning content.
6. Explain the actual Stripe Projects configuration and CreateOS execution.

## Submission checklist
- [ ] Working agent that generates and runs code in CreateOS Sandbox
- [ ] Actual stack configured through Stripe Projects
- [ ] Public repository with verified setup instructions
- [ ] 2–3 minute video with a team member on camera
- [ ] Public X or LinkedIn post tagging CreateOS
- [ ] Official event submission form
- [ ] Stripe Projects leaderboard submission with code `CreateOS-2026`
- [ ] Confirm the final submission deadline in Discord

Never commit API keys or `.env` files.
