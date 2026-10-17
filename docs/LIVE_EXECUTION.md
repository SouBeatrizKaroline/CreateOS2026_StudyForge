# Verified real execution

The CreateOS account now displays 3500 credits. A dedicated temporary API key was created with user authorization and stored only in the local .env.

The real end-to-end test used OpenRouter's free model and the EU CreateOS Sandbox API:
- Function: x², x=2, initial h=0.1; locale English.
- A real sandbox was created and reached running status.
- The agent generated Python using the real AI provider.
- Python executed in the CreateOS sandbox.
- Independent output validation passed on attempt 1.
- Analytic derivative: 4.
- First forward difference: 4.100000000000001.
- Sandbox DELETE request succeeded in the cleanup block.

Run the manual check with `node scripts/live-lab.mjs` after configuring local credentials. This uses real provider resources; ordinary `node --test` still uses mocks.

The Render public preview remains reference-only unless credentials and access protections are configured there. This local live test does not establish that the public Generate AI lab button works. Video recording, public post, official form and leaderboard submission remain pending.
