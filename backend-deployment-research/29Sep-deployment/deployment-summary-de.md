# Backend-Deployment: Kurze Zusammenfassung und wichtige Punkte

## Die Hauptidee

Deployment bedeutet nicht nur, Code auf einen Server zu kopieren. Es ist ein geplanter Prozess. Nach diesem Prozess soll die Anwendung:

- über das Internet erreichbar sein;
- in einer eigenen Production-Umgebung laufen;
- sicher mit einer entfernten Datenbank verbunden sein;
- zuverlässig starten und aktualisiert werden können;
- HTTPS verwenden;
- Fehler in Logs speichern;
- geprüft, wiederhergestellt oder auf eine ältere Version zurückgesetzt werden können.

## Was wird für ein Deployment benötigt?

Für ein einfaches Projekt mit Node.js und Express brauche ich:

1. Eine funktionierende Anwendung.
2. Ein GitHub-Repository.
3. Einen Host für das Backend, zum Beispiel Render.
4. Einen eigenen Datenbankdienst, zum Beispiel MongoDB Atlas.
5. Einen Build Command und einen Start Command.
6. Umgebungsvariablen und Secrets.
7. Eine öffentliche HTTPS-Adresse.
8. Logs und einen Health Check.
9. Eine Möglichkeit, das Lesen und Schreiben von Daten zu testen.
10. Einen Plan für Fehler: Rollback und Wiederherstellung der Datenbank.

## Der Prozess Schritt für Schritt

### 1. Die Anwendung vorbereiten

- In `package.json` muss es ein funktionierendes `start`-Skript geben.
- Der Server muss `process.env.PORT` verwenden.
- Die Node.js-Version muss festgelegt sein.
- Die Datenbankverbindung muss aus einer Umgebungsvariable gelesen werden.
- Die Anwendung muss lokal ohne Fehler starten.

Beispiel:

```json
{
  "scripts": {
    "start": "node server.js"
  },
  "engines": {
    "node": ">=22 <23"
  }
}
```

### 2. Secrets schützen

- `.env` darf nicht nach GitHub hochgeladen werden.
- Passwörter, API-Schlüssel, `MONGODB_URI`, `DATABASE_URL` und `JWT_SECRET` werden in den Einstellungen der Hosting-Plattform gespeichert.
- Ein veröffentlichtes Secret muss ersetzt werden. Es reicht nicht, das Secret nur aus der Datei zu löschen.
- Für Production werden eigene Secrets und eine eigene Datenbank verwendet.

Minimale `.gitignore`:

```gitignore
node_modules/
.env
.env.*
```

### 3. Eine entfernte Datenbank erstellen

- Einen MongoDB-Atlas-Cluster erstellen.
- Einen eigenen Database User erstellen.
- Dem Benutzer nur die nötigen Rechte geben.
- Die IP Access List konfigurieren.
- Die Verbindungs-URI kopieren.
- Die URI bei Render als `MONGODB_URI` speichern.

Der Datenbankbenutzer ist nicht derselbe Benutzer wie der normale Atlas-Account.

### 4. Den Code nach GitHub pushen

Vor dem Push prüfe ich den Status:

```bash
git status
```

`.env`, `node_modules`, eine lokale Datenbank und andere geheime Dateien dürfen nicht im Commit sein.

### 5. Einen Web Service auf Render erstellen

Wichtige Einstellungen:

- Das richtige GitHub-Repository ist verbunden.
- Der richtige Branch ist ausgewählt.
- Runtime: Node.
- Build Command: zum Beispiel `npm install` oder `npm ci`.
- Start Command: `npm start`.
- Falls nötig, ist das Root Directory eingetragen.
- `MONGODB_URI`, `NODE_ENV=production` und andere Secrets sind gespeichert.

### 6. Das erste Deployment prüfen

In den Logs prüfe ich:

- Wurden alle Abhängigkeiten ohne Fehler installiert?
- Ist der Server gestartet?
- Ist die Datenbank verbunden?
- Werden keine Secrets ausgegeben?
- Gibt es Fehler beim Build Command oder Start Command?

### 7. Die öffentliche Anwendung testen

Ich prüfe:

- `GET /health` liefert einen erfolgreichen Status.
- Ein GET-Request liest Daten.
- Ein POST-Request erstellt einen Datensatz.
- Der neue Datensatz ist in MongoDB Atlas sichtbar.
- Ein falscher Request liefert eine verständliche Fehlermeldung.
- Ein interner Fehler zeigt den Nutzerinnen und Nutzern keinen Stacktrace.

### 8. Automatische Updates einrichten

- Mit **On Commit** deployt Render jeden Push in den ausgewählten Branch.
- **After CI Checks Pass** ist eine sicherere Option.
- CI führt zuerst Tests und den Linter aus.
- Wenn eine Prüfung fehlschlägt, darf die neue Version nicht deployt werden.

### 9. Auf Stopps und Fehler vorbereitet sein

- Die Anwendung soll `SIGTERM` behandeln.
- Der HTTP-Server und die Datenbankverbindung sollen sauber geschlossen werden.
- Ich muss wissen, wie ein Rollback funktioniert.
- Ein Code-Rollback stellt gelöschte Daten nicht wieder her.
- Für die Datenbank brauche ich ein Backup und einen getesteten Wiederherstellungsplan.

### 10. Die Anwendung nach dem Start beobachten

Nach dem Deployment prüfe ich regelmäßig:

- Runtime- und Build-Logs;
- Fehler mit dem Status `4xx` und `5xx`;
- RAM und CPU;
- die kostenlosen Laufzeitstunden;
- den ausgehenden Traffic;
- Datenbankspeicher und Verbindungen;
- mögliche Kosten.

## Domain und sichere Verbindung

- Render gibt kostenlos eine Adresse wie `https://my-api.onrender.com`.
- Für ein Lernprojekt reicht diese Adresse aus.
- Eine eigene Domain muss nicht gekauft werden.
- Render stellt automatisch ein TLS-Zertifikat bereit.
- HTTP wird automatisch zu HTTPS weitergeleitet.
- Bei einer eigenen Domain müssen DNS, API-Adresse und CORS angepasst werden.

HTTPS schützt die Daten während der Übertragung. HTTPS ersetzt aber nicht die Anmeldung, die Rechteprüfung und die sichere Speicherung von Secrets.

## Grundlegende Sicherheit

Vor dem Start prüfe ich:

- Secrets befinden sich nicht in GitHub.
- CORS erlaubt nur die benötigte Frontend-Origin.
- `helmet` ist installiert.
- Rate Limiting ist eingerichtet.
- Eingehende Daten werden validiert.
- Passwörter werden nur als Hash gespeichert.
- Geschützte Routen prüfen die Rechte der Benutzer.
- Der Stacktrace wird nicht an den Client gesendet.
- Die Anwendung ist über HTTPS erreichbar.

Wichtig: CORS schützt die API nicht vor allen Clients. `curl`, Postman und andere Server müssen die Browserregeln nicht beachten. Für den Schutz sind Authentifizierung und Autorisierung nötig.

## Datenbank

### MongoDB und Mongoose

- Eine Mongoose-Verbindung soll wiederverwendet werden.
- Es darf nicht für jeden Request eine neue Verbindung erstellt werden.
- Die Größe des Connection Pools muss zum Limit des Datenbanktarifs passen.
- Häufig verwendete Felder brauchen passende Indizes.
- Zu viele Indizes verlangsamen Schreibvorgänge und brauchen Speicherplatz.
- Änderungen am Dokumentmodell müssen alte Daten berücksichtigen.

### PostgreSQL und Prisma

- In Development werden Migrationen mit `prisma migrate dev` erstellt.
- In Production werden sie mit `prisma migrate deploy` angewendet.
- `PrismaClient` soll wiederverwendet werden.
- Für Serverless kann ein Connection Pooler nötig sein.
- `prisma migrate deploy` wird nicht für MongoDB verwendet.

## Limits kostenloser Tarife

Bei einem kostenlosen Tarif muss ich Folgendes beachten:

- Der Server kann in den Sleep-Modus wechseln.
- Der erste Request nach dem Sleep dauert länger.
- RAM und CPU sind begrenzt.
- Die Laufzeitstunden sind begrenzt.
- Der Traffic ist begrenzt.
- Speicher und Verbindungen der Datenbank sind begrenzt.
- Nach einem Limit kann der Dienst stoppen oder Kosten verursachen.
- Das lokale Dateisystem von Render ist nicht dauerhaft.

Hochgeladene Bilder, Dokumente und eine SQLite-Datenbank dürfen nicht dauerhaft auf dem lokalen Speicher eines kostenlosen Render-Dienstes liegen. Dateien gehören in einen Objektspeicher. Anwendungsdaten gehören in eine entfernte Datenbank.

## Häufige Fehler von Einsteigern

- `.env` wird nach GitHub hochgeladen.
- Im Code bleiben `localhost` oder ein fester Port.
- In Production wird die lokale Datenbank verwendet.
- Umgebungsvariablen werden auf der Hosting-Plattform vergessen.
- Der Start Command ist falsch.
- Die Node.js-Version ist nicht festgelegt.
- CORS erlaubt ohne Grund alle Websites.
- Für jeden Request wird eine neue Datenbankverbindung erstellt.
- Uploads werden auf einem flüchtigen lokalen Speicher abgelegt.
- Der vollständige Stacktrace wird den Nutzern angezeigt.
- Migrationen werden ohne Backup ausgeführt.
- Logs und Limits werden nach dem Deployment nicht geprüft.
- Ein Code-Rollback wird mit einem Datenbank-Backup verwechselt.

## Minimale Abschlussprüfung

- [ ] Die Anwendung startet mit `npm start`.
- [ ] `process.env.PORT` und Umgebungsvariablen werden verwendet.
- [ ] `.env` befindet sich nicht in GitHub.
- [ ] Die Node.js-Version ist festgelegt.
- [ ] Production verwendet eine eigene Datenbank.
- [ ] Build Command und Start Command sind korrekt.
- [ ] Die öffentliche HTTPS-Adresse funktioniert.
- [ ] Der Health Check liefert einen erfolgreichen Status.
- [ ] GET und POST funktionieren mit der entfernten Datenbank.
- [ ] CORS, Helmet und Rate Limiting sind eingerichtet.
- [ ] Nutzer sehen keinen Stacktrace.
- [ ] Logs enthalten keine Secrets.
- [ ] Auto-Deploy oder CI ist eingerichtet.
- [ ] Der Ablauf für ein Rollback ist bekannt.
- [ ] Es gibt einen Plan für Backup und Wiederherstellung der Datenbank.
- [ ] Limits und mögliche Kosten werden geprüft.

## Fazit

Eine fertige Production-Anwendung ist nicht nur über eine öffentliche URL erreichbar. Sie ist sicher konfiguriert, verwendet eine eigene Datenbank, wird vor dem Deployment geprüft und läuft über HTTPS. Sie zeigt ihren Zustand mit einem Health Check, speichert Fehler in Logs und kann nach einem fehlerhaften Update oder Datenverlust wiederhergestellt werden.

Für diese Lernaufgabe muss keine eigene Domain gekauft und die Anwendung nicht wirklich deployt werden. Wichtig ist, den Prozess zu verstehen, ihn zu beschreiben und die fertigen Dateien nach GitHub hochzuladen.
