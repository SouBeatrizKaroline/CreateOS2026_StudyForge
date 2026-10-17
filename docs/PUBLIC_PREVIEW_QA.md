# Public preview verification

Public URL: https://studyforge-beatriz.onrender.com/

Verified through browser controls:
- English, Brazilian Portuguese, and Spanish interface switching.
- For square at x=2: slope 4.1 at h=0.1; slider step 3 yields h=0.0001 and slope 4.0001, analytic derivative 4.
- Switching to cubic at x=2 yields slope 12.61 at h=0.1 and analytic derivative 12.
- Expanding a hint reveals the expected learning guidance.

HTTP /api/status returns 200 with ready=false. The deployed app is still a reference preview, not a verified full agent execution. Successful browser checks do not establish CreateOS Sandbox integration. The free Render service may sleep and require a startup wait.
