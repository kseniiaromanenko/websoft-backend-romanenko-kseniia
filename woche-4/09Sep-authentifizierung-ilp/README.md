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

## Aufgabe 2 – Registrierung mit Passwort-Hashing

Ich habe den Endpunkt `POST /register` für die Registrierung neuer Benutzer
umgesetzt. Die eingegebene E-Mail-Adresse wird normalisiert und vor dem
Speichern auf ein bereits vorhandenes Benutzerkonto geprüft. Das Passwort wird
nicht im Klartext gespeichert, sondern mit `bcryptjs` sicher gehasht.

### Ablauf der Registrierung

```text
Request-Body lesen                  / получить email и password
→ E-Mail normalisieren             / нормализовать email
→ Pflichtfelder prüfen             / проверить наличие данных
→ nach einem Duplikat suchen       / найти дубликат
→ Passwort-Hash erstellen          / создать passwordHash
→ Benutzer erstellen               / создать пользователя
→ Benutzer im Array speichern      / добавить пользователя в users
→ sichere Antwort zurückgeben      / вернуть безопасный ответ
```

### Verwendet wurden

- `app.post("/register")` zum Definieren des Registrierungsendpunkts
- `req.body` zum Lesen von `email` und `password`
- `trim()` zum Entfernen von Leerzeichen am Anfang und Ende der E-Mail-Adresse
- `toLowerCase()` zur einheitlichen Schreibweise der E-Mail-Adresse
- `users.find()` zum Prüfen, ob die E-Mail-Adresse bereits registriert ist
- `bcrypt.hash(password, 10)` zum Erstellen eines sicheren Passwort-Hashes
- `crypto.randomUUID()` zum Erstellen einer eindeutigen Benutzer-ID
- `users.push()` zum Speichern des Benutzers im In-Memory-Array

Die Route ist als `async` definiert, weil das Erstellen des Passwort-Hashes mit
`await bcrypt.hash()` asynchron ausgeführt wird.

### HTTP-Statuscodes

- `201 Created`: Der Benutzer wurde erfolgreich registriert.
- `400 Bad Request`: E-Mail oder Passwort fehlt.
- `409 Conflict`: Ein Benutzer mit derselben E-Mail-Adresse existiert bereits.

### Sicherheit

Im Benutzerobjekt wird nur `passwordHash` gespeichert. Das Klartextpasswort
wird nicht gespeichert. In der JSON-Antwort werden weder das Passwort noch der
Passwort-Hash zurückgegeben. Die Rolle wird auf dem Server standardmäßig als
`user` festgelegt, damit sich ein Benutzer nicht selbst als Admin registrieren
kann.

### Ergebnis

Ein neuer Benutzer kann über `POST /register` registriert werden. Seine
E-Mail-Adresse wird in normalisierter Form und sein Passwort ausschließlich als
Hash im In-Memory-Array gespeichert. Fehlende Daten und doppelte
E-Mail-Adressen werden mit passenden Fehlermeldungen und HTTP-Statuscodes
behandelt.
