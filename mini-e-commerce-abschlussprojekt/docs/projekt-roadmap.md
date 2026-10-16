# Projekt-Roadmap – bisheriger Stand

## Bereits umgesetzt

- **Projekt-Setup**
  - Node.js, Express und PostgreSQL eingerichtet.
  - Prisma verbunden und Migrationen verwendet.
  - Projektstruktur mit Routes, Controllers und Middleware erstellt.

- **Kategorien und Produkte**
  - Datenmodelle `Category` und `Product` erstellt.
  - Category- und Product-CRUD implementiert.
  - Produkte können Kategorien zugeordnet werden.

- **Authentifizierung**
  - Clerk integriert.
  - Anmeldung mit E-Mail/Passwort und zusätzlich Google vorbereitet.
  - Lokales User-Profil mit `clerkId`, E-Mail und Rolle in PostgreSQL gespeichert.

- **Rollen und Rechte**
  - Rollen `USER`, `ADMIN` und `SUPER_ADMIN` erstellt.
  - `requireAuth` prüft die Anmeldung.
  - `requireAdmin` schützt Category- und Product-Verwaltung.
  - USER darf keine Produkte oder Kategorien ändern.

- **Bestellungen**
  - Modelle `Order`, `OrderItem` und `OrderStatus` erstellt.
  - Geschützter Endpoint `POST /api/orders` implementiert.
  - Backend prüft Warenkorb, Produkt-ID, Menge und Produkte.
  - Preis und Gesamtpreis werden sicher im Backend berechnet.
  - `GET /api/orders/my` zeigt nur die Bestellungen des aktuellen Benutzers.
  - Mit zwei Testbenutzern und Prisma Studio getestet.

## Nächste Schritte

- Admin-Endpoints für alle Bestellungen erstellen.
- Bestellstatus ändern: `PENDING`, `PROCESSING`, `COMPLETED`, `CANCELLED`.
- Zod für Datenvalidierung hinzufügen.
- Zentralen Error Handler sowie Helmet, CORS und Rate Limiting hinzufügen.
- Frontend für Produkte, Warenkorb und Bestellung erstellen.
- Einfache Admin-Seite für Produkte, Kategorien und Bestellungen erstellen.
- Dokumentation, Tests, README und Deployment abschließen.

## Was ist Prisma ORM?

**Prisma ist ein ORM.**

**ORM** bedeutet **Object-Relational Mapping**.

Ein ORM verbindet den JavaScript-Code mit einer relationalen Datenbank.

In meinem Projekt ist **Prisma** das ORM.  
Prisma übersetzt JavaScript-Code in Datenbankabfragen für PostgreSQL.
ORM bedeutet: Prisma verbindet JavaScript mit PostgreSQL.

Ich schreibe zum Beispiel JavaScript-Code:

```js
prisma.order.findMany();
```

````md
### Warum Clerk?

Clerk übernimmt die sichere Anmeldung.  
Ich muss Passwörter nicht selbst speichern.

### Warum OrderItem?

Eine Bestellung kann mehrere Produkte enthalten.  
OrderItem speichert jedes Produkt einzeln.

### Warum unitPrice?

Der Produktpreis kann sich später ändern.  
unitPrice speichert den Preis beim Kauf.

### Wie schützt du die API?

`requireAuth` prüft die Anmeldung.  
`requireAdmin` prüft bei Admin-Routen die Rolle.  
Ohne Anmeldung gibt es **401**.  
Ohne Berechtigung gibt es **403**.

## Wichtige Begriffe

### REST API

**REST API** ist eine Schnittstelle zwischen Frontend und Backend.

Das Frontend sendet eine Anfrage an einen Endpoint.  
Das Backend verarbeitet die Anfrage und sendet meistens JSON zurück.

Beispiele:

```text
GET  /api/orders/my      → meine Bestellungen lesen
POST /api/orders         → neue Bestellung erstellen
Browser / Frontend
Der Benutzer klickt auf eine Seite oder sendet eine Anfrage.
```

**Express app**
Die Express-App nimmt die Anfrage entgegen und leitet sie weiter.

**Middleware**
Sie prüft zum Beispiel, ob der Benutzer angemeldet ist und Rechte hat.

**Router**
Der Router entscheidet, welcher Endpoint zur Anfrage passt.

**Controller**
Der Controller enthält die Logik: Daten prüfen, berechnen oder speichern.

**PostgreSQL**
Die Datenbank speichert Benutzer, Produkte, Bestellungen und Kategorien.

PostgreSQL
PostgreSQL ist eine relationale Datenbank.
Relational bedeutet: Die Daten werden in Tabellen gespeichert und können miteinander verbunden werden.

## Tabellen, Beziehungen und Schlüssel

Jede Tabelle hat einen **Primary Key**.

Ein Primary Key ist eine eindeutige ID für jeden Datensatz.

Beispiel:

```text
Product
id: 2
name: Test Laptop
categoryId: 1
``

ist der Primary Key des Produkts.
Jedes Produkt hat eine andere ID.
Ein Foreign Key verbindet Tabellen miteinander.

Foreign Keys helfen der Datenbank, Beziehungen korrekt zu speichern und ungültige Verbindungen zu verhindern.

**JSON response**
Der Server sendet das Ergebnis als JSON zurück an das Frontend.

**JSON** bedeutet **JavaScript Object Notation**.
JSON ist ein einfaches Textformat für Daten.
Frontend und Backend senden damit Informationen miteinander.

Das Backend kann JSON lesen und als Antwort wieder JSON senden.

```

```

```

осталось фронтенд

**Zod**
**Helmet**
**CORS**
**Rate limiting**
**Test**
**гит хаб репо и деплоймен**

```

```

```

```
````
