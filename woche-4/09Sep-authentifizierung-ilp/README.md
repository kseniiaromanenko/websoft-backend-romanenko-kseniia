# Sicheres Login-Backend mit Node.js und Express

In diesem Projekt entwickle ich schrittweise ein Backend für eine sichere
Benutzerregistrierung und einen Login. Dabei übe ich die Grundlagen von
Authentifizierung, Passwort-Hashing, Login-Tokens und geschützten Routen.

## Aufgabe 1 – Backend-Grundgerüst

Ich habe ein Node.js-Projekt erstellt und einen einfachen Express-Server
vorbereitet. Der Server verarbeitet JSON-Daten und stellt zwei Test-Endpunkte
bereit. Benutzerdaten und Login-Tokens werden später zunächst in
In-Memory-Datenstrukturen gespeichert.

### Verwendet wurden

- `npm init -y` zum Erstellen der Datei `package.json`
- `express` zum Erstellen des Webservers und der API-Routen
- `express.json()` zum Lesen von JSON-Daten aus dem Request-Body
- `dotenv` zum Laden von Umgebungsvariablen aus der Datei `.env`
- `process.env.PORT` zum Lesen des konfigurierten Server-Ports
- ein In-Memory-Array als vorübergehender Speicher für Benutzer
- eine In-Memory-`Map` für die spätere Zuordnung von Tokens zu Benutzern
- `app.listen()` zum Starten des Servers

`bcryptjs` wurde bereits installiert und wird in Aufgabe 2 für das sichere
Hashen von Passwörtern verwendet.

### Konfiguration

Der Server-Port wird in der lokalen Datei `.env` festgelegt:

```env
PORT=3000
```

Die Datei `.env.example` dokumentiert die benötigten Umgebungsvariablen. Die
echte `.env`-Datei und der Ordner `node_modules` werden über `.gitignore` nicht
in Git gespeichert.

### Endpunkte

- `GET /` gibt eine einfache Meldung zurück und zeigt, dass die API erreichbar
  ist.
- `GET /health` gibt `{ "status": "ok" }` zurück und dient als Health-Check des
  Servers.

### Projekt starten

Die Abhängigkeiten werden installiert mit:

```bash
npm install
```

Der Server wird gestartet mit:

```bash
npm start
```

Anschließend ist die API unter `http://localhost:3000` erreichbar.

### Ergebnis

Der Express-Server startet ohne Fehler, liest die Portnummer aus der
Umgebungsvariable und beantwortet die Routen `/` und `/health` erfolgreich.
