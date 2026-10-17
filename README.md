# StudyForge
**Turn university concepts into executable learning labs.**

StudyForge helps undergraduates understand Calculus I through predictions, numerical experiments, charts, and guided questions. English is the default, with Brazilian Portuguese and Spanish available throughout the interface.

## Implemented
- Interactive derivative labs for x², x³, and sin(x).
- Predict the slope, compare secants with tangents, and change step size.
- Three fully translated interfaces and reference explanations.
- Live agent integration: generate Python through OpenRouter, execute only in CreateOS Sandbox, validate numerical output independently, and repair up to twice.
- Actual execution event stream and generated-source inspection.
- Sandbox polling, restricted egress, execution timeout, and cleanup in a finally block.
- Nine automated tests covering math, orchestration, repair, cleanup, and translations.

## Current verification status
Automated tests pass with mocked provider responses. Live provider execution has **not** been verified because credentials are not configured. Stripe Projects has now provisioned the CreateOS free plan and createos/project resource successfully. Leaderboard submission is **not yet completed**. The provisioned platform key returned HTTP 401 from the Sandbox API; a separate valid Sandbox credential is still required. The reference example runs deterministic browser mathematics and is explicitly labeled as no AI execution.

## Run locally
Requires Node.js 22.9 or newer. No package installation is needed.

```sh
cp .env.example .env
# Fill in the two keys locally, then:
node --env-file-if-exists=.env server.mjs
```

On PowerShell, replace the first command with `Copy-Item .env.example .env`.
Open http://localhost:3000. Without keys, the reference lab still works. `Generate AI lab` requires both provider keys. Run tests with `node --test`.

## Credentials and Brazil setup
Brazil-based participation is allowed according to the organizers' Discord announcement; activating Stripe Payments or supplying US business details is not required for this event's Projects setup.

1. CreateOS: sign in at https://createos.sh/app and open Profile / API Keys (https://createos.sh/app/profile). Generate an API key and put it in `.env` as `CREATEOS_API_KEY`. Ask the event support team about hackathon credits if needed.
2. OpenRouter: sign in at https://openrouter.ai and create a key at https://openrouter.ai/settings/keys. Put it in `.env` as `OPENROUTER_API_KEY`. Available model access and credits depend on your account. Optionally set `OPENROUTER_MODEL` to a model supporting JSON output; otherwise your OpenRouter default is used.
3. Never paste keys into GitHub, public posts, screenshots, or chat. Keep `.env` local.

## Stripe Projects — required before submission
Install the official Stripe CLI, sign in, and run these commands from the project directory:

```sh
stripe plugin install projects
# If already installed: stripe plugin upgrade projects
stripe projects init StudyForge
stripe projects add createos/project
stripe projects env --pull
stripe projects status
stripe projects share
```

Use the Projects-specific onboarding if ordinary payments onboarding asks for business activation. Verify actual environment variable names emitted by the provider and map the sandbox credential to `CREATEOS_API_KEY` if needed. Preserve CLI-generated shared configuration but never publish credentials or vault files. Do not claim provisioning succeeded until the CLI confirms it. Save the share/Stack URL for the leaderboard. See the [official Stripe Projects guide](https://docs.stripe.com/projects) and the [hackathon guide](https://projects.dev/hackathon-participants).

## Architecture
Browser → local Node server → OpenRouter (code and educational content) → CreateOS sandbox (Python) → independent server validation → chart and exercises.

CreateOS REST uses `X-Api-Key` and JSend envelopes. The default endpoint is the EU endpoint announced for the event. The sandbox uses `devbox:1`, no public ingress, and an egress allowlist restricted to the reserved documentation address `192.0.2.1:443`; it needs no external packages. An empty egress list would allow all traffic and is deliberately avoided. Python is sent via stdin to `timeout 15 python3 -I -`; no generated code is executed on the application host. The generated environment receives no provider secrets.

Numerical results are checked against separate analytic and finite-difference references. Educational prose and generated questions still require human review. Explanations discuss floating-point limitations rather than promising monotonic improvement for arbitrarily small steps.

## Deployment boundary
The server binds to loopback by default and permits only one live run at a time. It rejects cross-origin requests. This is a local hackathon MVP: add authentication, per-user rate limits, spend limits, and stronger response-size streaming controls before exposing a public generation endpoint. Verify cleanup in the CreateOS dashboard if an API failure leaves a sandbox behind. There is no automatic provisioning, billing, or deployment.

## Demo and submission
Show a team member on camera, enter a Calculus I experiment, generate real Python, show the actual sandbox execution, change h, and compare the approximation. Switch languages and explain the actual sponsor configuration. Do not present the reference example as a live AI run.

- [ ] Configure and verify both keys with a real lab
- [x] Provision CreateOS free plan and project through Stripe Projects
- [ ] Obtain a real Stack URL using the event-supported sharing workflow
- [ ] Record a 2–3 minute video with a member on camera
- [ ] Publish the required X or LinkedIn post tagging CreateOS
- [ ] Submit the official event form
- [ ] Submit to https://projects.dev/leaderboard using `CreateOS-2026`
- [ ] Confirm the deadline in Discord

## Reference documentation
- https://createos.sh/docs/Sandbox/REST-API/Sandboxes/
- https://createos.sh/docs/Sandbox/REST-API/Execution-And-Files/
- https://createos.sh/docs/Sandbox/REST-API/Egress/
- https://openrouter.ai/docs/api_reference/overview

See [the product specification](docs/PRODUCT_SPEC.md) for the original product scope.
