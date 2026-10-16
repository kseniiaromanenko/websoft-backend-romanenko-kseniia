# Mini E-Commerce

Ein Full-Stack-Mini-E-Commerce-Projekt mit Node.js, Express, PostgreSQL, Prisma und Clerk.

## Funktionen

### USER

- Registrierung und Login mit Clerk
- Produktkatalog ansehen
- Produkte in den Warenkorb legen
- Menge ändern und Produkte aus dem Warenkorb entfernen
- Warenkorb wird mit `localStorage` gespeichert
- Bestellung erstellen
- Eigene Bestellungen ansehen

### ADMIN / SUPER_ADMIN

- Alle Bestellungen ansehen
- Bestellstatus ändern
- Produkte erstellen, bearbeiten und löschen
- Kategorien erstellen, bearbeiten und löschen

## Technologien

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- Clerk für Authentifizierung und Sessions
- Zod für Request-Validierung
- Helmet, CORS und Rate Limiting
- Vitest und Supertest für Integrationstests
- HTML, CSS und JavaScript

## Installation

```bash
git clone <repository-url>
cd mini-e-commerce-abschlussprojekt
npm install
```

## Environment Variables

Eine `.env`-Datei erstellen:

```env
DATABASE_URL="postgresql://..."
CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
CLIENT_ORIGIN="http://localhost:3000"
```

Keine Secrets in Git committen.

## Datenbank starten

```bash
npx prisma migrate dev
npx prisma studio
```

## Projekt starten

```bash
npm run dev
```

Danach ist das Projekt unter folgender Adresse erreichbar:

```text
http://localhost:3000/index.html
```

## Tests

```bash
npm test
```

Aktuelle Integrationstests prüfen:

- `200` für `GET /api/health`
- `200` für `GET /api/categories`
- `400` bei ungültiger `categoryId`
- `401` für `POST /api/orders` ohne Token
- `404` bei unbekanntem Endpoint

## Rollen

| Rolle       | Berechtigung                                                |
| ----------- | ----------------------------------------------------------- |
| USER        | Produkte ansehen, bestellen und eigene Bestellungen sehen   |
| ADMIN       | Produkte, Kategorien und alle Bestellungen verwalten        |
| SUPER_ADMIN | Gleiche Admin-Rechte, für spätere Erweiterungen vorbereitet |

## Wichtige API-Endpunkte

| Methode | Endpoint                 | Beschreibung                            |
| ------- | ------------------------ | --------------------------------------- |
| GET     | `/api/health`            | Health Check                            |
| GET     | `/api/products`          | Alle Produkte                           |
| POST    | `/api/products`          | Produkt erstellen, nur ADMIN            |
| PATCH   | `/api/products/:id`      | Produkt ändern, nur ADMIN               |
| DELETE  | `/api/products/:id`      | Produkt löschen, nur ADMIN              |
| GET     | `/api/categories`        | Alle Kategorien                         |
| POST    | `/api/categories`        | Kategorie erstellen, nur ADMIN          |
| PATCH   | `/api/categories/:id`    | Kategorie ändern, nur ADMIN             |
| DELETE  | `/api/categories/:id`    | Kategorie löschen, nur ADMIN            |
| POST    | `/api/orders`            | Bestellung erstellen, angemeldeter USER |
| GET     | `/api/orders/my`         | Eigene Bestellungen                     |
| GET     | `/api/orders`            | Alle Bestellungen, nur ADMIN            |
| PATCH   | `/api/orders/:id/status` | Bestellstatus ändern, nur ADMIN         |

## Sicherheit

- Clerk prüft Anmeldung und Sessions.
- Das Backend prüft Rollen für Admin-Routen.
- Zod validiert Eingaben.
- Der Server berechnet Bestellpreise selbst aus PostgreSQL.
- Prisma schützt bei normalen Abfragen vor SQL-Injection.
- Helmet, CORS und Rate Limiting schützen die API zusätzlich.
- Produkte oder Kategorien mit bestehenden Bestell- bzw. Produktbeziehungen können nicht einfach gelöscht werden.

## Mögliche Erweiterungen

- Produktbilder hochladen
- Pagination, Filter und Suche
- Produktarchivierung statt Löschen
- Mehrere Kategorien pro Produkt
- Weitere Integrationstests
