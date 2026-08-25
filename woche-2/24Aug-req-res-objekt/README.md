# Express Request, Response und Middleware

## Aufgabe 1: Projektsetup und Start-Route

### Was wurde gemacht?

- Ein Node.js-Projekt wurde erstellt.
- Express wurde installiert.
- In `src/main.js` wurde eine Express-App eingerichtet.
- Der Server startet auf Port `3000`.
- Die Route `GET /` gibt eine JSON-Antwort zurueck.

### Verwendete Befehle

```bash
npm init -y
npm install express
npm start
curl -i http://localhost:3000/
```

### Ergebnis

Der Server startet ohne Fehler. Ein Request an `GET /` liefert den Status `200 OK` und eine JSON-Antwort:

```json
{
  "message": "Support API is running"
}
```

## Aufgabe 2: Request-Daten sichtbar machen

### Was wurde gemacht?

- Die Route `GET /support/info` wurde erstellt.
- In der Route werden wichtige Informationen aus dem Request-Objekt gelesen.
- Die API gibt diese Informationen als strukturierte JSON-Antwort zurueck.
- Die Route wurde mit Query-Parametern und einem selbst gesetzten Header getestet.

### Verwendete Befehle

```bash
npm start
curl -i "http://localhost:3000/support/info?topic=login&priority=high" -H "x-student-name: Ksenia"
```

### Ergebnis

Ein Request an `GET /support/info` liefert den Status `200 OK` und eine JSON-Antwort mit Request-Daten:

```json
{
  "method": "GET",
  "path": "/support/info",
  "query": {
    "topic": "login",
    "priority": "high"
  },
  "userAgent": "curl/8.5.0",
  "customHeader": "Ksenia"
}
```

### Wichtige Request-Eigenschaften

- `req.method` zeigt die HTTP-Methode, zum Beispiel `GET`.
- `req.path` zeigt den Pfad, zum Beispiel `/support/info`.
- `req.query` zeigt die Query-Parameter aus der URL nach dem `?`.
- `req.get("user-agent")` liest einen normalen Header.
- `req.get("x-student-name")` liest einen selbst gesetzten Header.

## Aufgabe 3: JSON-Antworten mit passenden Statuscodes senden

### Was wurde gemacht?

- Eine kleine Ticket-Datenbasis wurde als Array in `src/main.js` erstellt.
- Die Route `GET /support/ticket/:id` wurde erstellt.
- Die `id` wird aus `req.params.id` gelesen und in eine Zahl umgewandelt.
- Mit `find()` wird das passende Ticket gesucht.
- Wenn ein Ticket gefunden wird, gibt die API das Ticket als JSON zurueck.
- Wenn kein Ticket gefunden wird, gibt die API eine JSON-Fehlermeldung mit dem Status `404 Not Found` zurueck.

### Verwendete Befehle

```bash
npm start
curl -i http://localhost:3000/support/ticket/1
curl -i http://localhost:3000/support/ticket/999
```

Zusaetzlich wurde die Route im Browser getestet:

```text
http://localhost:3000/support/ticket/1
```

### Ergebnis bei gueltiger ID

Ein Request an `GET /support/ticket/1` liefert den Status `200 OK` und das gefundene Ticket:

```json
{
  "id": 1,
  "title": "Login problem",
  "message": "User cannot log in",
  "email": "user1@example.com"
}
```

### Ergebnis bei ungueltiger ID

Ein Request an `GET /support/ticket/999` liefert den Status `404 Not Found` und eine JSON-Fehlermeldung:

```json
{
  "error": "Ticket nicht gefunden"
}
```

### Wichtige Request- und Response-Eigenschaften

- `req.params.id` liest den dynamischen Teil der URL, zum Beispiel die `1` aus `/support/ticket/1`.
- `Number(req.params.id)` wandelt die ID von einem String in eine Zahl um.
- `res.json(...)` sendet eine JSON-Antwort.
- `res.status(404).json(...)` sendet eine JSON-Antwort mit einem passenden Fehlerstatus.
