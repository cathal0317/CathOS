# CathOS — Cathal Lee

Portfolio for Cathal Lee, AI engineer and founder of Upcrossing AI. Updated on 19 October 2026 around three themes: AI research, agentic systems, and product engineering.

## Run

Open `dist/index.html`, or run `python3 -m http.server 8080 --directory dist` and visit `http://localhost:8080`. There are no dependencies to install or build commands to run. All artwork and fonts are local.

## Current content

- **AdBalloon / Upcrossing AI** — in-development video generation product. The current backend uses Google Pub/Sub and Google Cloud Storage. The public link goes to https://www.upcrossing.ai/.
- **Dialogue generation** — separate user, assistant, and reviewer roles, private user context, reviewer-controlled stopping, and candidate opening selection. Source: https://github.com/cathal0317/Agentic_generation. The current code uses a Python conversation loop.
- **EmoSteer / F5-TTS** — an unofficial activation-steering implementation: https://github.com/cathal0317/emosteer-tts-unofficial.
- **Sohri** — graph validation and dialogue runtime: https://github.com/cathal0317/chatbot-graph-builder.
- **Reward alignment for TTS** — stochastic sampling and SMC: https://github.com/cathal0317/Reward_Alignment-Test.
- **Speech-to-LLM alignment** — the current public implementation uses Whisper and TinyLlama: https://github.com/cathal0317/LLaVa_Implementation.
- **Korean emotional TTS** — https://github.com/cathal0317/vevo.
- **Group theory & music** — the original `Cathal_Essay.pdf` and P/L/R chord demo.

The focus section describes the work in broad terms rather than as an employment or education timeline.

## Files

- `dist/index.html`: visible page structure and project cards.
- `dist/app.js`: project descriptions, filters, dialogs, terminal, and chord interface.
- `dist/styles.css`: neutral charcoal/off-white theme and responsive layouts.
- `dist/visuals.js`: interactive canvas and procedural illustrations.
- `dist/core.js`: P/L/R transformations, unchanged from the previous version.
- `dist/assets/`: local font, its license, and favicon.

## Controls

Drag the hero sculpture or focus it and use arrow keys. Choose Form, Signal, or Network. The pause button stops automatic motion, and reduced-motion preferences are respected.

Use the terminal button, `Ctrl/Cmd+K`, or `/`. Try `help`, `projects`, `open adballoon`, `open 1`, `about`, `skills`, `technologies`, `contact`, `play`, `clear`, or `exit`. Up/down recalls history; Tab completes commands. Typed input stays in the browser and is never executed as code.

In the chord demo, P/L/R change the triad. Sound starts only when **Hear chord** is selected.

## Deployment and checks

Deploy the contents of `dist/` to a static host. Paths work on repository subpaths. `.openai/hosting.json` retains the existing Sites identity.

JavaScript syntax, internal references, project/data consistency, current contact details, and removal of the previous palette and introduction were checked. The musical model was previously checked across all 72 major/minor P/L/R cases and was not changed. Browser-based visual and interaction QA is unavailable in this environment.
