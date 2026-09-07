# AllCollegeEvent

Next-gen gamified campus event platform and Gen Z community growth hub — discover fests, hackathons, and cultural events, track XP and badges, build squads, and get AI-powered fest recommendations.

**🔗 Live demo:** [allcollegeevent.ai.studio](https://allcollegeevent.ai.studio/)

## Features

- **Event discovery** — browse and filter campus events (tech, cultural, gaming, networking) with rich detail views
- **AI Fest Mate** — a Gemini-powered concierge that answers questions and builds personalized fest itineraries
- **Gamification** — quests, badges, XP, and a leaderboard to drive engagement
- **Campus map view** — spatial view of event venues
- **Schedule & digital passes** — plan attendance and manage QR passes
- **Referral & rewards hub** — invite-based growth loop
- **Social community hub** — posts, reactions, and community feed
- **Event creation** — organizers can create and publish new events

## Tech stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- Express (API layer for Gemini calls)
- Google Gemini API (`@google/genai`)
- Framer Motion (`motion`), Recharts, Lucide icons, Canvas Confetti


## Getting started

### Prerequisites

- Node.js 18+
- A [Gemini API key](https://aistudio.google.com/apikey) (optional — the app falls back to canned responses without one)

### Setup

```bash
# install dependencies
npm install

# copy the env template and add your Gemini API key
cp .env.example .env

# run the dev server
npm run dev
```

The app runs at `http://localhost:3000`.

### Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Express + Vite middleware) |
| `npm run build` | Build the client bundle and bundle the server for production |
| `npm run start` | Run the production build |
| `npm run preview` | Preview the built client with Vite |
| `npm run lint` | Type-check the project with `tsc --noEmit` |
| `npm run clean` | Remove build output |

## Environment variables

See `.env.example`:

- `GEMINI_API_KEY` — enables the AI Fest Mate concierge and AI itinerary generation. Without it, the app returns sensible static fallbacks.
- `APP_URL` — the public URL the app is hosted at, for any self-referential links.

## License

MIT — see [LICENSE](LICENSE).

