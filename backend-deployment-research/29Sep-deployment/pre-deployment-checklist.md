# Checkliste vor dem Deployment

Diese Checkliste hilft dabei, eine Node.js-/Express-Anwendung vor dem Deployment zu prüfen. Sie ist für Einsteigerinnen und Einsteiger geschrieben. Nicht jeder Punkt passt zu jedem Projekt: Bei MongoDB/Mongoose werden andere Datenbankbefehle verwendet als bei PostgreSQL/Prisma.

## 1. Sicherheit

### Geheimnisse und Umgebungsvariablen

- [ ] Alle geheimen Werte stehen in Umgebungsvariablen, zum Beispiel `DATABASE_URL`, `MONGODB_URI`, `JWT_SECRET` und API-Schlüssel.
- [ ] Die Datei `.env` steht in `.gitignore`.
- [ ] In GitHub befinden sich keine Passwörter, Tokens oder vollständigen Datenbank-URIs.
- [ ] In Logs werden keine Passwörter, Tokens oder vollständigen Verbindungsstrings ausgegeben.
- [ ] Für Produktion werden andere Zugangsdaten als für die lokale Entwicklung verwendet.
- [ ] Datenbankbenutzer erhalten nur die Rechte, die die Anwendung wirklich benötigt.

Beispiel für `.gitignore`:

```gitignore
node_modules/
.env
.env.*
```

Wichtig: Wurde ein Geheimnis bereits nach GitHub gepusht, reicht es nicht, die Datei später zu löschen. Das alte Passwort oder Token muss beim Anbieter widerrufen und durch ein neues ersetzt werden.

### CORS richtig einstellen

- [ ] In Produktion ist nicht automatisch jede Website mit `origin: "*"` erlaubt.
- [ ] Die echte Frontend-Adresse wird über eine Umgebungsvariable eingetragen.
- [ ] Lokale Adressen wie `http://localhost:5173` werden nur in der Entwicklungsumgebung erlaubt.
- [ ] Wenn Cookies verwendet werden, sind `credentials` und die erlaubte Origin korrekt eingestellt.

Ein einfaches Beispiel:

```js
import cors from "cors";

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
```

CORS ersetzt keine Anmeldung und keine Rechteprüfung. Es steuert hauptsächlich, ob Browser eine Antwort lesen dürfen. Auch `curl`, Postman oder andere Server können die API weiterhin aufrufen.

Dokumentation: [Express CORS Middleware](https://expressjs.com/en/resources/middleware/cors/)

### Security Headers mit Helmet

- [ ] `helmet` ist installiert und wird früh in der Middleware-Kette verwendet.
- [ ] Nach dem Einbau werden Frontend und API getestet, weil manche Header angepasst werden müssen.

```bash
npm install helmet
```

```js
import helmet from "helmet";

app.use(helmet());
```

Helmet setzt mehrere HTTP-Sicherheitsheader. Diese helfen dem Browser, bestimmte Angriffe zu erschweren.

Dokumentation: [Express: Sicherheit in Produktion](https://expressjs.com/en/advanced/best-practice-security.html)

### Rate Limiting

- [ ] Besonders empfindliche Routen wie Login, Registrierung und Passwort-Reset haben ein strengeres Limit.
- [ ] Auch für die übrige API gibt es ein sinnvolles allgemeines Limit.
- [ ] Die Anwendung wurde hinter dem Proxy der Hosting-Plattform getestet, damit die richtige Client-IP erkannt wird.
- [ ] Bei mehreren App-Instanzen wird ein gemeinsamer Store verwendet, zum Beispiel Redis, statt nur Speicher einer Instanz.

Ein einfaches Beispiel:

```bash
npm install express-rate-limit
```

```js
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use(limiter);
```

Rate Limiting begrenzt die Anzahl der Requests in einem Zeitraum. Es hilft gegen Missbrauch, ist aber kein vollständiger Schutz gegen alle Angriffe.

Dokumentation: [express-rate-limit: Quickstart](https://express-rate-limit.mintlify.app/quickstart/usage)

### Weitere Sicherheitsprüfungen

- [ ] Eingaben aus `req.body`, `req.params` und `req.query` werden validiert.
- [ ] Passwörter werden gehasht und niemals als Klartext gespeichert.
- [ ] Geschützte Routen prüfen sowohl die Anmeldung als auch die Berechtigung.
- [ ] Fehlerantworten geben keine internen Details preis.
- [ ] Abhängigkeiten werden mit `npm audit` geprüft und kritische Probleme werden bewertet.
- [ ] Die API ist nur über HTTPS erreichbar; Hosting-Plattformen wie Render stellen HTTPS bereit.

## 2. Datenbankverwaltung

### Vor jeder Datenbankänderung

- [ ] Es gibt ein aktuelles Backup oder eine andere getestete Wiederherstellungsmöglichkeit.
- [ ] Die Änderung wurde zuerst lokal oder in einer Staging-Datenbank getestet.
- [ ] Die Anwendung verwendet in Produktion eine eigene Datenbank und nicht die lokale Testdatenbank.
- [ ] Der Production-Verbindungsstring steht nur als Umgebungsvariable auf der Hosting-Plattform.
- [ ] Die Änderung löscht keine Daten, ohne dass dies bewusst geplant und geprüft wurde.

### Prisma mit PostgreSQL

- [ ] Schemaänderungen werden während der Entwicklung mit einer Migration vorbereitet und in Git gespeichert.
- [ ] In Produktion wird `npx prisma migrate deploy` verwendet.
- [ ] In Produktion wird nicht einfach `prisma migrate dev` ausgeführt.
- [ ] `prisma db push` wird nicht als Ersatz für eine nachvollziehbare Production-Migration benutzt.
- [ ] Der Prisma Client wird während des Builds mit `npx prisma generate` erzeugt.
- [ ] `PrismaClient` wird in der Anwendung wiederverwendet und nicht für jeden Request neu erstellt.

Typische Befehle:

```bash
# lokal: Migration erstellen
npx prisma migrate dev --name add_example_field

# Produktion: vorhandene Migrationen anwenden
npx prisma migrate deploy
```

`migrate deploy` wendet vorhandene, noch nicht ausgeführte Migrationen an. Es erstellt keine neue Development-Migration und setzt die Datenbank nicht zurück.

Dokumentation: [Prisma: migrate deploy](https://www.prisma.io/docs/cli/v7/migrate/deploy)

### MongoDB mit Mongoose oder Prisma

- [ ] Änderungen am Dokumentmodell sind mit bereits gespeicherten Dokumenten kompatibel.
- [ ] Neue Pflichtfelder erhalten einen sinnvollen Standardwert oder alte Daten werden vorher aktualisiert.
- [ ] Eine Datenmigration wird zuerst mit einer Kopie der Daten getestet.
- [ ] Mongoose öffnet beim Start eine Verbindung und verwendet sie wieder.
- [ ] Der Connection Pool passt zum Verbindungslimit des Datenbanktarifs.

Wichtig: `prisma migrate deploy` wird nicht für MongoDB unterstützt. Bei Prisma mit MongoDB wird für Schema-Synchronisation `prisma db push` verwendet. Änderungen an vorhandenen Daten müssen trotzdem bewusst geplant und gegebenenfalls mit einem eigenen Skript durchgeführt werden.

Dokumentation: [Prisma: MongoDB und db push](https://www.prisma.io/docs/orm/overview/databases/mongodb)

### Indizes

- [ ] Häufig gefilterte oder sortierte Felder haben passende Indizes.
- [ ] Eindeutige Werte wie E-Mail-Adressen haben bei Bedarf einen Unique Index.
- [ ] Es werden nicht vorsorglich Indizes für jedes Feld erstellt.
- [ ] Langsame, häufige Abfragen wurden untersucht.
- [ ] Große Indizes werden zu einem geplanten Zeitpunkt erstellt, weil der Aufbau Leistung benötigt.

Ein Index funktioniert ähnlich wie das Register eines Buches: Die Datenbank findet Werte schneller, ohne alle Datensätze zu lesen. Zu viele Indizes verbrauchen aber Speicher und machen Schreibvorgänge langsamer.

Dokumentation:

- [MongoDB: Indizes für häufige Abfragen](https://www.mongodb.com/docs/manual/data-modeling/schema-design-process/create-indexes/)
- [Prisma: Indizes im Schema](https://www.prisma.io/docs/orm/prisma-schema/data-model/indexes)

## 3. Fehlerbehandlung und Logs

### Sichere Fehlerantworten

- [ ] Am Ende der Express-Middleware-Kette gibt es einen zentralen Error Handler.
- [ ] Öffentliche Antworten enthalten eine kurze Nachricht und einen passenden HTTP-Status.
- [ ] Stacktrace, Dateipfade, SQL-Abfragen, Datenbank-URI und interne Objekte werden nicht an Nutzer gesendet.
- [ ] Intern wird der Fehler mit genügend Kontext geloggt.
- [ ] Erwartete Fehler wie `404`, ungültige Eingaben und fehlende Anmeldung werden von echten Serverfehlern unterschieden.
- [ ] `NODE_ENV` ist auf der Plattform auf `production` gesetzt.

Ein einfaches Beispiel:

```js
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.status || 500).json({
    message:
      error.status && error.status < 500
        ? error.message
        : "Ein interner Serverfehler ist aufgetreten.",
  });
});
```

Der Parameter `next` muss vorhanden sein, damit Express die Funktion als Error Handler erkennt. `console.error(error)` ist für ein Lernprojekt ausreichend; größere Projekte verwenden oft strukturierte Logs.

Dokumentation: [Express: Error Handling](https://expressjs.com/en/guide/error-handling.html)

### Sinnvolle Logs

- [ ] Beim Start wird geloggt, dass der Server läuft und die Datenbank erreichbar ist.
- [ ] Fehler werden mit Zeitpunkt, Route und einem Request-Identifier geloggt.
- [ ] Passwörter, Tokens, Cookies und Authorization-Header werden nicht geloggt.
- [ ] Normale Erfolgsantworten erzeugen nicht unnötig große Logmengen.
- [ ] Es ist bekannt, wo Build- und Runtime-Logs auf der Plattform zu finden sind.

Bei Render finde ich die Live-Logs im Dashboard unter dem jeweiligen Service auf der Seite **Logs**. Die Logs einzelner Deployments sind zusätzlich unter **Deploys** verfügbar.

Dokumentation: [Render: Logs im Dashboard](https://render.com/docs/logging)

## 4. Production-Umgebung vorbereiten

### Abhängigkeiten

- [ ] Pakete, die die laufende Anwendung benötigt, stehen unter `dependencies`.
- [ ] Nur Entwicklungswerkzeuge wie Test-Runner, Linter und lokale TypeScript-Typen stehen unter `devDependencies`.
- [ ] `package-lock.json` ist im Repository gespeichert.
- [ ] Der Build wurde einmal mit einer sauberen Installation getestet.
- [ ] Es wurde geprüft, ob der Build Dev Dependencies benötigt, bevor sie weggelassen werden.
- [ ] Eine getestete Node.js-Version ist in `package.json`, `.node-version` oder `.nvmrc` festgelegt.

Für eine reproduzierbare Installation eignet sich:

```bash
npm ci
```

Wenn die Anwendung bereits gebaut ist und keine Dev Dependencies mehr benötigt:

```bash
npm ci --omit=dev
```

Nicht jedes Projekt darf die Dev Dependencies schon während des Builds auslassen. TypeScript, Prisma CLI oder ein Bundler können für den Build benötigt werden. In diesem Fall werden zuerst alle Build-Abhängigkeiten installiert und erst danach wird ein schlankes Runtime-Artefakt erstellt.

Dokumentation:

- [npm: dependencies und devDependencies](https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package.json-file/)
- [npm ci und --omit=dev](https://docs.npmjs.com/cli/commands/npm-ci/)

### Konfiguration

- [ ] `NODE_ENV=production` ist gesetzt.
- [ ] Die Anwendung hört auf `process.env.PORT` und nicht nur auf einem festen Port.
- [ ] Entwicklungs-URLs, Mock-Daten und Test-Zugangsdaten sind in Produktion deaktiviert.
- [ ] Debug-Modus und sehr ausführliche Logs sind deaktiviert.
- [ ] Testdateien, Coverage-Berichte und lokale Datenbanken werden nicht für den Runtime-Betrieb benötigt.
- [ ] Es gibt einen einfachen Health-Endpunkt, zum Beispiel `GET /health`.
- [ ] Build- und Startbefehle passen zu den Skripten in `package.json`.
- [ ] Die öffentliche URL verwendet HTTPS; HTTP wird zu HTTPS weitergeleitet.
- [ ] Bei einer eigenen Domain sind DNS, TLS-Zertifikat und CORS getestet.
- [ ] Dauerhafte Uploads oder SQLite-Daten liegen nicht im flüchtigen Dateisystem.
- [ ] Development, Test und Production verwenden getrennte Datenbanken und Secrets.
- [ ] Die Anwendung behandelt `SIGTERM` und schließt HTTP-Server und Datenbank sauber.
- [ ] CI führt Tests und Linting vor dem Deployment aus oder ist als spätere Verbesserung dokumentiert.

Beispiel:

```js
const port = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(port, "0.0.0.0");
```

## 5. Letzter Test vor dem Deployment

- [ ] Alle automatischen Tests laufen erfolgreich.
- [ ] Die Anwendung startet lokal mit den Production-Einstellungen.
- [ ] Ein falscher Request liefert `400` statt eines Absturzes.
- [ ] Eine nicht vorhandene Route liefert `404`.
- [ ] Ein interner Fehler liefert `500`, aber keinen Stacktrace.
- [ ] Anmeldung und geschützte Routen wurden getestet.
- [ ] CORS wurde mit der echten Frontend-Origin getestet.
- [ ] Lesen und Schreiben in der entfernten Datenbank funktionieren.
- [ ] Der Health-Endpunkt antwortet erfolgreich.
- [ ] Geheimnisse sind nur in den Einstellungen der Hosting-Plattform gespeichert.

## 6. Kontrolle direkt nach dem Deployment

- [ ] Die öffentliche HTTPS-URL ist erreichbar.
- [ ] Der Health-Endpunkt liefert Status `200`.
- [ ] Mindestens ein GET- und ein POST-Request wurden getestet.
- [ ] Der neue Datensatz ist in der entfernten Datenbank sichtbar.
- [ ] Build- und Runtime-Logs enthalten keine Fehler oder Geheimnisse.
- [ ] Ein neuer GitHub-Push löst das erwartete Auto-Deployment aus.
- [ ] Fehler-, Speicher-, CPU-, Datenbank- und Traffic-Limits werden im Dashboard beobachtet.
- [ ] Es ist bekannt, wie die letzte funktionierende Version wiederhergestellt werden kann.
- [ ] `/health` ist auf Render als HTTP Health Check Path eingetragen.
- [ ] Das Wiederherstellen eines Datenbank-Backups wurde geplant oder getestet.

## Wichtigste offizielle Ressourcen

- [Express: Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Express: Error Handling](https://expressjs.com/en/guide/error-handling.html)
- [Prisma: Production-Migrationen](https://www.prisma.io/docs/cli/v7/migrate/deploy)
- [MongoDB: Indizes planen](https://www.mongodb.com/docs/manual/data-modeling/schema-design-process/create-indexes/)
- [Render: Runtime-Logs](https://render.com/docs/logging)
- [Render: Domains und TLS-Zertifikate](https://render.com/docs/tls)
- [Render: Health Checks](https://render.com/docs/health-checks)
- [Render: Rollbacks](https://render.com/docs/rollbacks)
- [npm: saubere Installation mit npm ci](https://docs.npmjs.com/cli/commands/npm-ci/)
