I'll create a tracked todo plan for the app development and external-database migration.

Completed: *Add groups (end group + Groups page)* (5/21)

**Development Plan**

- **Init Project**: Create project with Vite + React, commit baseline.
- **Core UI**: Implement `DecisionInput` and `UserInput` to collect text + 4 ranges and show list. See decisionInput.jsx and UserInput.jsx.
- **Persistence**: Use `localStorage` keys (`dm_items_<user>`, `dm_groups_<user>`, `dm_users`, `dm_currentUser`) for offline persistence while developing.
- **Priority Logic**: Add classification and sorting by Urgency & Importance (tie-breaker by sum).
- **Groups**: Add "End Group" flow and `Groups` page to save/load named groups.
- **Auth (local)**: Add `SIgnIn.jsx` and `SIgnUp.jsx` storing users locally (for dev/testing).
- **Splash & Routing**: Add splash screen and simple in-app routing in App.jsx.
- **Styling**: Add Tailwind, index.css, color variables and responsive utilities. Fix PostCSS config to match package "type" (use `.cjs` if needed).
- **UX Features**: Add Edit/Delete, edit flow (populate inputs), mobile hamburger nav, header logo, and centered layout.
- **Theme**: Implement light/dark theme toggle persisted to `dm_theme`; use CSS variables and Tailwind `dark:` variants.
- **Polish & Fixes**: Resolve JSX errors, add accessibility touches, test responsiveness.
- **Local Testing**: Run `npm install` and `npm run dev`, open the reported URL and verify flows/visuals.

**Commands**
- Install & run:
```bash
npm install
npm run dev
```

**External Database Migration Plan**

- **Choose an approach**: pick hosted BaaS (Firebase or Supabase) for speed, or self-hosted DB + API (Postgres + Node/Express) for control.
  - Recommended quick option: Supabase (Postgres + auth + real-time) or Firebase (Firestore + Auth).
- **Design schema / API**
  - Minimal tables: users, items (id, user_id, text, weights JSON, created_at, updated_at, group_id), groups.
  - Add indices on user_id and created_at for queries.
- **Add auth integration**
  - Replace local auth with provider auth (Supabase/Firebase) or JWT-based auth from your backend.
  - Ensure `currentUser` becomes token-backed user object.
- **Backend / Provider setup**
  - If using Supabase/Firebase: create project, enable Auth, create DB schema.
  - If using custom backend: create Node/Express (or Fastify) service with endpoints:
    - POST /api/items — create
    - GET /api/items?userId=... — list
    - PUT /api/items/:id — update
    - DELETE /api/items/:id — delete
    - POST /api/groups, GET /api/groups, DELETE /api/groups/:id
  - Add authentication middleware (JWT or provider SDK).
- **Frontend migration steps**
  - Add API client (fetch/axios or SDK).
  - Abstract storage with a service layer (e.g., `src/services/storage.js`) that exports same methods used by components: `getItems(user)`, `saveItem(item)`, `updateItem(item)`, `deleteItem(id)`, `getGroups()`, `saveGroup()`.
  - Replace direct `localStorage` calls with service calls. Keep service implementation using localStorage for offline dev, switch to API for production.
- **Sync & Offline**
  - For BaaS: use built-in realtime or replication features.
  - For custom backend: implement optimistic updates and background sync; queue changes locally if offline and retry on reconnect.
- **Migrations & Data**
  - Export existing local data for users if migrating real users.
  - Provide a migration script that reads `localStorage` export and posts to API for each user.
- **Security & Env**
  - Use environment variables for API URLs and keys (do NOT commit them). Add `.env` and update Vite config to expose only needed variables (VITE_ prefix).
- **Testing & Monitoring**
  - Add automated tests for API endpoints and E2E tests for critical flows.
  - Add logging/monitoring for backend (Sentry/Log provider).
- **Deployment**
  - Deploy backend (Vercel, Render, Heroku, or a cloud VM). If using Supabase/Firebase, deploy rules and enable production settings.
  - Update frontend env to point to production API/keys, build and deploy.

**Minimal next steps to start DB migration**
- Pick provider (Supabase recommended).
- Create project and schema (users, items, groups).
- Add provider SDK to frontend and wire sign-in → update `currentUser`.
- Implement `src/services/storage.js` and switch `UserInput`/`DecisionInput` to use it.
- Migrate a sample dataset and test CRUD flows.

If you want, I can:
- generate a concrete migration scaffold for Supabase (schema SQL + example `storage.js`), or
- scaffold a small Express + Postgres API and wire one endpoint into the app.

Which option do you prefer?