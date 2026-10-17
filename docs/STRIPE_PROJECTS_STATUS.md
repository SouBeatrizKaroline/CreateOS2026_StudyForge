# Stripe Projects setup status

Stripe CLI 1.54.0 authenticated successfully. Stripe Projects plugin v0.50.0 initialized StudyForge and linked CreateOS after explicit user consent to terms and data sharing.

Provisioned resources:
- createos/free: complete; pricing Free.
- createos/project: complete; pricing Free.

No paid plan was provisioned. Shared non-secret configuration is in .projects/state.json. Vault and .env remain local and are not committed.

Credentials from this integration target the CreateOS platform API. Testing that platform credential against the EU Sandbox listing endpoint returned HTTP 401. It must not be treated as a verified Sandbox key. OPENROUTER_API_KEY is still unset.

The installed Projects plugin v0.50.0 omits share from its general help, but running `stripe projects share --json` succeeded. Official Stack URL: https://projects.dev/s#v1:createos~project

OpenRouter/free is available in the catalog with zero-cost free models and no credit card required. Provisioning is pending separate user consent to OpenRouter terms and privacy policy.

Remaining: valid Sandbox credentials/credits, AI credentials, real end-to-end execution, video, public post, official form, leaderboard submission.
