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
