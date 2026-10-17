# StudyForge MVP specification

## Product promise
An AI study partner that builds executable experiments so students learn by exploring.

## Primary user
A high-school or introductory university student studying mathematical functions or projectile motion.

## Core journey
1. Select English, Português (Brasil), or Español.
2. Choose a supported topic and difficulty.
3. Predict the result of an experiment.
4. Watch the agent write and run the experiment.
5. Inspect the chart and change a parameter.
6. Answer three questions, requesting hints when needed.

## First supported experiment
Projectile motion without air resistance.
Inputs: initial speed, launch angle, and gravity.
Validate units, finite numbers, positive gravity, bounded speed, and angle between 0 and 90 degrees.
Check flight time, range, and maximum height against known analytical formulas. Label the simplifying assumptions.
Return a trajectory image and structured numerical results. Explain why 45 degrees maximizes range only under the stated equal-height assumptions.

## Agent contract
Input: topic, level, locale, and validated parameters.
Output: generated source, execution status, bounded trace, result values, chart artifact, explanation, and practice questions.
The LLM must actually generate executable code. A fixed calculator alone does not meet the intended agent behavior.
Track each attempt and preserve stderr for repair. At most one initial execution plus two repairs.
Stop with a clear localized error when validation or repairs fail; do not invent results.

## Execution controls
Keep provider credentials on the server. Do not place LLM keys inside generated source.
Run generated code only in CreateOS Sandbox.
Use restricted network access, resource limits, bounded stdout and stderr, and fixed output paths.
Treat generated files and logs as untrusted. Serve charts as images; never execute generated HTML in the main application origin.
Clean up sandboxes and temporary artifacts after each session.

## Implementation order
1. Verify current official Stripe Projects and CreateOS documentation; provision a minimal stack.
2. Prove a server-side sandbox execution and chart download.
3. Add LLM code generation, result validation, and bounded repair.
4. Add the student flow with prediction, output, parameter adjustment, and hints.
5. Wire all three locales for interface text and generated learning content.
6. Verify a full real-provider demo and write exact setup instructions.
7. Record the video and complete both submissions.

## Acceptance criteria
- An English request produces generated Python, a real CreateOS execution trace, and a chart.
- Adjusting a parameter produces a consistent new result.
- A genuine execution failure can trigger repair; exhaustion gives a visible error.
- Known numerical examples match the analytical results within a documented tolerance.
- Each locale displays translated navigation, loading, errors, explanations, hints, and questions.
- Missing translation keys fall back to English.
- Sponsor setup is documented with actual provisioned services and Stack URL.
- Secrets are absent from browser responses, logs, and Git history.

## Demo allocation
0:00–0:20: student problem and team member on camera.
0:20–1:30: real agent generation, sandbox execution, and experiment.
1:30–2:05: prediction, parameter change, and learning questions.
2:05–2:30: language switch and sponsor architecture.
2:30–2:50: result and next steps.
