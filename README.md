# BoardIt - Frontend

Frontend för BoardIt – en intern nyhets- och anslagstavla för personal.

Byggt som del av en skoluppgift och redovisas via videopresentation.

## Tekniker

- React 18
- TypeScript
- React Router DOM
- Axios
- Vite

## Funktionalitet

### Publika sidor
- **Startsida** (`/`) - Listar alla inlägg med klickbara kort
- **Detaljsida** (`/posts/:id`) - Visar fullständigt innehåll för enskilt inlägg
- **Inloggning** (`/login`) - Formulär för autentisering

### Skyddad sida (kräver inloggning)
- **Admin** (`/admin`) - Skapa och ta bort inlägg

## Autentisering

- JWT-token lagras i `localStorage`
- Token skickas automatiskt i Authorization-header via Axios interceptor
- Skyddade routes redirectar till login om användaren inte är autentiserad
- Navbar visar inloggningsstatus (logga in/logga ut-knapp beroende på status)

## Kom igång

Installera beroenden:
```bash
npm install
```

Starta utvecklingsserver:
```bash
npm run dev
```

Applikationen startar på `http://localhost:5173`

**Backend krävs:** Se till att BoardAPI körs på `http://localhost:5260`

**Inloggningsuppgifter:**
- Användarnamn: `admin`
- Lösenord: `admin123`