# Mini E-Commerce

Ein Full-Stack-Mini-E-Commerce-Projekt mit Node.js, Express, PostgreSQL, Prisma und Clerk.

## Live-Demo

Die veröffentlichte Anwendung ist hier erreichbar:

https://websoft-backend-romanenko-kseniia-1.onrender.com

Hinweis: Der kostenlose Render-Service kann nach längerer Inaktivität
einschlafen. Der erste Aufruf kann deshalb bis zu etwa einer Minute dauern.

## Autorin

Kseniia Romanenko

## Projektdokumentation

- [Projektplan](./docs/project-plan.md)
- [Datenmodell](./docs/data-model.md)
- [Entity-Relationship-Diagramm (ERD)](./docs/erd.md)
- [API-Endpunkte und Beispiele](./docs/endpoint.md)

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

### Backend und API

- Node.js
- Express.js
- REST API mit JSON
- dotenv für Environment Variables

### Datenbank

- PostgreSQL
- Prisma ORM
- Neon für die bereitgestellte PostgreSQL-Datenbank

### Authentication und Sicherheit

- Clerk für Registrierung, Login und Sessions
- Zod für Request-Validierung
- Helmet für HTTP-Sicherheits-Header
- CORS für kontrollierten Zugriff vom Frontend
- express-rate-limit für Rate Limiting

### Testing

- Vitest
- Supertest für Integrationstests

### Frontend

- HTML
- CSS
- Vanilla JavaScript
- Browser API `localStorage` für den Warenkorb

### Deployment und Versionskontrolle

- Render für das Deployment des Node.js-/Express-Web-Service
- Git und GitHub für Versionskontrolle und automatisches Deployment

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
| GET     | `/api/auth/me`           | Aktuellen eingeloggten Benutzer abrufen |
| GET     | `/api/products`          | Alle Produkte abrufen                   |
| GET     | `/api/products/:id`      | Einzelnes Produkt mit Kategorie abrufen |
| POST    | `/api/products`          | Produkt erstellen, nur ADMIN            |
| PATCH   | `/api/products/:id`      | Produkt bearbeiten, nur ADMIN           |
| DELETE  | `/api/products/:id`      | Produkt löschen, nur ADMIN              |
| GET     | `/api/categories`        | Alle Kategorien abrufen                 |
| POST    | `/api/categories`        | Kategorie erstellen, nur ADMIN          |
| PATCH   | `/api/categories/:id`    | Kategorie bearbeiten, nur ADMIN         |
| DELETE  | `/api/categories/:id`    | Kategorie löschen, nur ADMIN            |
| POST    | `/api/orders`            | Bestellung erstellen, angemeldeter USER |
| GET     | `/api/orders/my`         | Eigene Bestellungen abrufen             |
| GET     | `/api/orders`            | Alle Bestellungen abrufen, nur ADMIN    |
| PATCH   | `/api/orders/:id/status` | Bestellstatus ändern, nur ADMIN         |

## Sicherheit

- Clerk prüft Anmeldung und Sessions.
- Das Backend prüft Rollen für Admin-Routen.
- Zod validiert Eingaben.
- Der Server berechnet Bestellpreise selbst aus PostgreSQL.
- Prisma schützt bei normalen Abfragen vor SQL-Injection.
- Helmet, CORS und Rate Limiting schützen die API zusätzlich.
- Produkte oder Kategorien mit bestehenden Bestell- bzw. Produktbeziehungen können nicht einfach gelöscht werden.

### Nicht verwendete Sicherheitsmaßnahmen

- Eine eigene Passwortspeicherung oder Passwort-Hashing ist nicht nötig,
  weil Clerk Passwörter, Login und Sessions verwaltet.
- Die Anwendung verarbeitet keine Datei-Uploads. Produktbilder werden nur
  als URL gespeichert; deshalb ist keine serverseitige Datei-Upload-Prüfung
  erforderlich.

## Mögliche Erweiterungen

- Produktbilder hochladen
- Pagination, Filter und Suche
- Produktarchivierung statt Löschen
- Mehrere Kategorien pro Produkt
- Weitere Integrationstests
