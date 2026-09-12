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

### Test mit curl

Eine erfolgreiche Registrierung kann mit folgendem Request getestet werden:

```bash
curl -i -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"email":"  Anna@Example.COM  ","password":"Secret123!"}'
```

Der Server antwortet mit dem HTTP-Status:

```text
HTTP/1.1 201 Created
```

Beispiel für die JSON-Antwort:

```json
{
  "message": "Registrierung erfolgreich",
  "user": {
    "id": "...",
    "email": "anna@example.com",
    "role": "user"
  }
}
```

Die Antwort zeigt, dass die E-Mail-Adresse normalisiert wurde. Das Passwort und
der Passwort-Hash werden nicht an den Client zurückgegeben.

### Test mit Postman

Die Registrierung kann alternativ in Postman getestet werden:

1. Als Methode `POST` auswählen.
2. Die URL `http://localhost:3000/register` eintragen.
3. Unter **Body** die Option **raw** und anschließend **JSON** auswählen.
4. Folgende Daten in den Request-Body eintragen:

```json
{
  "email": "  Anna@Example.COM  ",
  "password": "Secret123!"
}
```

Postman setzt dabei den Header `Content-Type: application/json`. Nach dem
Absenden wird bei einer erfolgreichen Registrierung der Status `201 Created`
angezeigt. Wird derselbe Request ohne einen Neustart des Servers erneut
gesendet, antwortet die API mit `409 Conflict`, weil die E-Mail-Adresse bereits
registriert ist.

### Ergebnis

Ein neuer Benutzer kann über `POST /register` registriert werden. Seine
E-Mail-Adresse wird in normalisierter Form und sein Passwort ausschließlich als
Hash im In-Memory-Array gespeichert. Fehlende Daten und doppelte
E-Mail-Adressen werden mit passenden Fehlermeldungen und HTTP-Statuscodes
behandelt.

## Aufgabe 3 – Login mit Passwortprüfung

Ich habe den Endpunkt `POST /login` umgesetzt. Der Endpunkt sucht den Benutzer
anhand seiner normalisierten E-Mail-Adresse und prüft das eingegebene Passwort
mit `bcrypt.compare()`. Bei einem erfolgreichen Login wird ein zufälliges Token
erstellt, mit der Benutzer-ID verknüpft und an den Client zurückgegeben.

### Ablauf des Logins

```text
Request-Body lesen                    / получить email и password
→ E-Mail normalisieren               / нормализовать email
→ Pflichtfelder prüfen               / проверить наличие данных
→ Benutzer suchen                    / найти пользователя
→ Passwort mit dem Hash vergleichen  / сравнить пароль с passwordHash
→ Token erstellen                    / создать token
→ Token mit Benutzer-ID speichern    / сохранить token → user.id
→ Token zurückgeben                  / вернуть token
```

### Unterschied zwischen Registrierung und Login

| Registrierung                           | Login                                               |
| --------------------------------------- | --------------------------------------------------- |
| erstellt einen neuen Benutzer           | sucht einen vorhandenen Benutzer                    |
| prüft, ob die E-Mail schon existiert    | prüft, ob die Anmeldedaten gültig sind              |
| verwendet `bcrypt.hash()`               | verwendet `bcrypt.compare()`                        |
| speichert einen `passwordHash`          | speichert kein neues Passwort und keinen neuen Hash |
| gibt sichere Benutzerdaten zurück       | erstellt und gibt ein Login-Token zurück            |
| antwortet erfolgreich mit `201 Created` | antwortet erfolgreich mit `200 OK`                  |

Bei der Registrierung wird aus dem Klartextpasswort einmalig ein Hash für die
Speicherung erstellt. Beim Login wird das eingegebene Klartextpasswort nicht
erneut mit `bcrypt.hash()` gehasht. `bcrypt.compare()` prüft es stattdessen
gegen den bereits gespeicherten Hash und liefert `true` oder `false`.

### Verwendet wurden

- `app.post("/login")` zum Definieren des Login-Endpunkts
- `users.find()` zum Suchen des Benutzers anhand seiner E-Mail-Adresse
- `bcrypt.compare(password, user.passwordHash)` zur Passwortprüfung
- `crypto.randomUUID()` zum Erstellen eines zufälligen Tokens
- `tokens.set(token, user.id)` zum Verknüpfen des Tokens mit dem Benutzer
- eine allgemeine Fehlermeldung für eine unbekannte E-Mail und ein falsches
  Passwort

### HTTP-Statuscodes

- `200 OK`: Der Login war erfolgreich.
- `400 Bad Request`: E-Mail oder Passwort fehlt.
- `401 Unauthorized`: Die E-Mail oder das Passwort ist ungültig.

### Test mit curl

Da Benutzer nur im Arbeitsspeicher gespeichert werden, muss nach jedem Neustart
des Servers zuerst ein Benutzer registriert werden. Danach kann der Login
getestet werden:

```bash
curl -i -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"anna@example.com","password":"Secret123!"}'
```

Beispiel für eine erfolgreiche Antwort:

```json
{
  "message": "Login erfolgreich",
  "token": "550e8400-e29b-41d4-a716-446655440000"
}
```

Das Token wird bei jedem erfolgreichen Login neu und zufällig erstellt.

### Test mit Postman

1. Als Methode `POST` auswählen.
2. Die URL `http://localhost:3000/login` eintragen.
3. Unter **Body** die Option **raw** und anschließend **JSON** auswählen.
4. Folgende Anmeldedaten eintragen und den Request absenden:

```json
{
  "email": "anna@example.com",
  "password": "Secret123!"
}
```

Bei richtigen Anmeldedaten antwortet die API mit `200 OK` und einem Token. Bei
einem falschen Passwort oder einer unbekannten E-Mail antwortet sie mit `401
Unauthorized` und der allgemeinen Meldung `Ungültige Anmeldedaten`.

### Sicherheit

Für eine unbekannte E-Mail-Adresse und ein falsches Passwort wird absichtlich
dieselbe Fehlermeldung verwendet. Dadurch verrät die API nicht, welche
E-Mail-Adressen registriert sind. Das zufällige Token wird serverseitig in der
In-Memory-`Map` gespeichert und ist noch kein JWT.

### Ergebnis

Ein registrierter Benutzer kann sich mit seiner E-Mail-Adresse und seinem
Passwort anmelden. Das Passwort wird sicher gegen den vorhandenen Hash geprüft.
Nach einem erfolgreichen Login erhält der Client ein Token für spätere
geschützte Requests.

## Aufgabe 4 – Geschützte Route für authentifizierte Benutzer

Ich habe die Authentication-Middleware `requireLogin` und den geschützten
Endpunkt `GET /me` umgesetzt. Die Middleware liest den Token aus dem
`Authorization`-Header, prüft ihn und ermittelt den zugehörigen Benutzer. Nur
bei einem gültigen Token wird der Request an den Handler von `/me`
weitergegeben.

### Ablauf der Authentifizierung

```text
Authorization-Header lesen          / прочитать заголовок Authorization
→ Bearer-Format prüfen              / проверить формат Bearer
→ Token extrahieren                 / извлечь token
→ Benutzer-ID in tokens suchen      / найти userId по token
→ Benutzer in users suchen          / найти пользователя
→ req.user und req.token setzen     / записать пользователя и token в req
→ next() aufrufen                   / передать запрос дальше
→ sichere Benutzerdaten senden      / вернуть безопасные данные пользователя
```

### Bearer-Token

Der Client sendet den Token in einem HTTP-Header:

```http
Authorization: Bearer 550e8400-e29b-41d4-a716-446655440000
```

`Bearer` bezeichnet das Authentifizierungsschema. Danach folgen ein Leerzeichen
und der eigentliche Token. Mit `startsWith("Bearer ")` wird dieses Format
geprüft. `slice(7)` entfernt anschließend die sieben Zeichen von `Bearer ` und
liefert nur den Token.

### Verwendet wurden

- `req.headers.authorization` zum Lesen des Authorization-Headers
- `startsWith("Bearer ")` zum Prüfen des Bearer-Formats
- `authHeader?.` zur sicheren Prüfung, auch wenn der Header fehlt
- `slice(7)` zum Extrahieren des Tokens
- `tokens.get(token)` zum Ermitteln der gespeicherten Benutzer-ID
- `users.find()` zum Suchen des zugehörigen Benutzers
- `req.user` zum Bereitstellen des Benutzers für nachfolgende Handler
- `req.token` zum Bereitstellen des aktuellen Tokens
- `next()` zum Fortsetzen der Express-Verarbeitung

### Geschützter Endpunkt

```text
GET /me → requireLogin → Handler von /me
```

`requireLogin` wird vor dem eigentlichen Handler ausgeführt. Bei erfolgreicher
Authentifizierung enthält `req.user` den gefundenen Benutzer. Der Handler gibt
nur `id`, `email` und `role` zurück, aber keinen Passwort-Hash.

### Test mit curl

Nach Registrierung und Login wird der zurückgegebene Token eingesetzt:

```bash
curl -i http://localhost:3000/me \
  -H "Authorization: Bearer HIER_DEN_TOKEN_EINSETZEN"
```

Beispiel für eine erfolgreiche Antwort:

```json
{
  "user": {
    "id": "...",
    "email": "anna@example.com",
    "role": "user"
  }
}
```

### Test mit Postman

1. Als Methode `GET` und als URL `http://localhost:3000/me` auswählen.
2. Unter **Authorization** den Typ **Bearer Token** auswählen.
3. Den Token aus der Login-Antwort ohne das Wort `Bearer` einfügen.
4. Den Request absenden.

Mit einem gültigen Token antwortet die API mit `200 OK`. Ohne Bearer-Token oder
mit einem ungültigen Token antwortet sie mit `401 Unauthorized`.

### Ergebnis

`GET /me` ist nur für authentifizierte Benutzer erreichbar. Die Middleware
identifiziert den Benutzer anhand des Tokens und stellt ihn dem geschützten
Route-Handler über `req.user` zur Verfügung.
