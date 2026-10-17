# Alternative free preview deployment

The root render.yaml defines a free Docker web service using the existing application image and /api/status health check. It intentionally contains no provider credentials. This publishes the reference laboratory only; it does not prove a real CreateOS Sandbox run.

Open https://dashboard.render.com, sign in, choose New > Blueprint, and connect only SouBeatrizKaroline/CreateOS2026_StudyForge. Review the configuration: one web service, Free instance, no database, no disk, no paid add-ons. Stop if a charge or payment method is required. No deployment has been created by adding this file.

Render free web services sleep after 15 minutes without traffic and may take about a minute to wake. Free usage is limited. Do not add a payment method if you want over-limit activity to suspend rather than incur supplementary charges. Official details: https://render.com/docs/free

Do not import the project's .env into this public preview. Add access controls before enabling provider-backed generation publicly. The hackathon still requires actual CreateOS Sandbox execution and the Stripe Projects stack, regardless of where the interface is hosted.
