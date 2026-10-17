# CreateOS deployment

## Prepared configuration
- Repository: SouBeatrizKaroline/CreateOS2026_StudyForge
- Branch: main
- Root directory: /
- Runtime: Dockerfile (Node.js 24)
- Port: 3000 (or platform-provided PORT)
- Start command: node server.mjs
- Health endpoint: /api/status

The GitHub App installation was verified with only this repository selected. Import from the CreateOS dashboard once the account connection is working. No deployment has been completed or verified.

## Current blockers
The account previously returned "user is suspended" when creating a Sandbox API key. A later creation attempt still did not create a key. Contact event support to review the account and credit allocation. Installing the GitHub App does not itself create a Sandbox API key.

## Environment
Set CREATEOS_API_KEY and OPENROUTER_API_KEY as server-side secrets. Set CREATEOS_BASE_URL=https://api-eu.sb.createos.sh. OPENROUTER_MODEL is optional. Never put keys in browser code or commit them.

The image runs without credentials as a reference-only preview. Before configuring provider keys on a publicly reachable deployment, add authentication and per-user request/spending controls or put the entire app behind a trusted access gateway. The current single-run concurrency limit is not a substitute for access control.

## Stripe Projects requirement
Complete the official Stripe Projects workflow from README.md separately. A CreateOS dashboard import alone does not fulfill the Stripe Projects requirement. Commit the actual non-secret shared state after successful provisioning and save the resulting Stack URL.

## Verification before demo
1. Confirm account access and hackathon credits with support.
2. Configure provider credentials privately.
3. Generate a real AI lab and inspect the execution trace and returned Python.
4. Confirm numerical validation and sandbox cleanup.
5. Verify English, Brazilian Portuguese, and Spanish in the browser.
6. Complete the event form and leaderboard submission.
