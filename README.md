# Emoji Card Tycoon — Ultimate Prototype

This repository is a functional web prototype for Emoji Card Tycoon. It includes a minimal playable core: pack purchase, pack opening, binder, and persistent save (localStorage).

Run locally:

1. npm install
2. npm run dev
3. Open http://localhost:5173

Notes:
- Prototype is mobile-first and uses Tailwind CSS.
- Data-driven card defs are in `src/data/cards.ts`.
- Gacha logic is in `src/lib/gacha.ts`.
- Save/load in `src/lib/save.ts`.

This is the initial commit with MVP skeleton. More features (market, NPC, negotiation, achievements, offline sim, sound) will be pushed in follow-up commits.
