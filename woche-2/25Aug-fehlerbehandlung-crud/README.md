## Aufgabe 1

Ich habe ein Express-Projekt mit der Ressource `users` vorbereitet.

Verwendet wurde:

- `express()` zum Erstellen der Express-Anwendung
- `express.json()` zum Lesen von JSON-Daten aus dem Request-Body
- ein In-Memory-Array `users` als vorübergehender Datenspeicher
- `app.listen(3000)` zum Starten des Servers

Befehl:

- `npm start` startet den Server.

## Aufgabe 2

Ich habe zwei GET-Endpunkte für die Ressource `users` umgesetzt.

Endpunkte:

- `GET /users` gibt alle User als JSON-Array zurück.
- `GET /users/:id` gibt einen einzelnen User anhand seiner ID zurück.

Verwendet wurde:

- `app.get()`, um GET-Routen zu definieren
- `req.params.id`, um die ID aus der URL zu lesen
- `Number()`, um die ID von einem String in eine Zahl umzuwandeln
- `Number.isNaN()`, um zu prüfen, ob die ID ungültig ist
- `find()`, um einen User im Array zu suchen
- `res.status(...).json(...)`, um passende Statuscodes und JSON-Antworten zurückzugeben

Befehle:

- `npm start` startet den Express-Server.
- `curl http://localhost:3000/users` testet, ob alle User zurückgegeben werden.
- `curl http://localhost:3000/users/1` testet, ob ein einzelner vorhandener User zurückgegeben wird.
- `curl http://localhost:3000/users/abc` testet den Fehlerfall mit einer ungültigen ID.
- `curl http://localhost:3000/users/99` testet den Fehlerfall mit einem nicht vorhandenen User.
