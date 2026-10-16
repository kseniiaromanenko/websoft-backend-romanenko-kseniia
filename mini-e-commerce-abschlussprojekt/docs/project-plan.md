# Projektplan nach Aufgabenstellung – Mini E-Commerce

## 1. Projektidee und Ziel

Das Abschlussprojekt ist eine REST-API für einen kleinen E-Commerce-Shop. Benutzer sollen Produkte ansehen und Bestellungen erstellen können. Administratoren sollen Produkte, Kategorien und Bestellungen verwalten können.

Der Schwerpunkt liegt auf dem Backend. Die Benutzeroberfläche bleibt bewusst einfach.

## 2. Technologie-Stack

| Bereich           | Technologie                                            |
| ----------------- | ------------------------------------------------------ |
| Frontend          | HTML + CSS + Vanilla JavaScript                        |
| Backend           | Node.js + Express.js                                   |
| API               | REST API                                               |
| Datenbank         | PostgreSQL                                             |
| ORM               | Prisma                                                 |
| Validierung       | Zod                                                    |
| Authentication    | Login / geschützte Routen                              |
| Authorization     | USER / ADMIN                                           |
| Security          | Helmet + CORS + Rate Limiting + sicherer Error Handler |
| Testing           | automatisierte API-Tests                               |
| Versionskontrolle | Git + GitHub                                           |
| Deployment        | Backend und PostgreSQL online bereitstellen            |

### Begründung

Node.js und Express werden verwendet, weil sie im Kurs behandelt wurden und sich für eine REST-API eignen.

PostgreSQL passt gut zum Projekt, weil die Daten miteinander verbunden sind.

Prisma vereinfacht den Zugriff auf PostgreSQL und die Arbeit mit Datenmodellen.

Zod wird für die Validierung von Eingaben verwendet.

## 3. MVP

### USER

- registrieren und einloggen
- Produkte anzeigen
- einzelnes Produkt anzeigen
- Produkte auswählen
- Bestellung erstellen
- eigene Bestellungen anzeigen

### ADMIN

- Produkte erstellen, anzeigen, bearbeiten und löschen
- Kategorien verwalten
- Bestellungen anzeigen
- Bestellstatus ändern

## 4. Datenmodelle

- User
- Category
- Product
- Order
- OrderItem

### Beziehungen

- Category 1:N Product
- User 1:N Order
- Order 1:N OrderItem
- Product 1:N OrderItem

Das ERD und die genauen Tabellenfelder werden in der Planungsphase erstellt.

## 5. Geplante REST-Endpunkte

### Authentication mit Clerk

Registrierung und Login werden über Clerk umgesetzt. Clerk verwaltet Passwörter, E-Mail-Verifizierung und Sessions.

Das Express-Backend prüft die Clerk-Session bzw. das Token und schützt damit die API-Routen.

### Products

| Methode  | Endpoint            | Zweck                      |
| -------- | ------------------- | -------------------------- |
| `GET`    | `/api/products`     | Produkte anzeigen          |
| `GET`    | `/api/products/:id` | einzelnes Produkt anzeigen |
| `POST`   | `/api/products`     | Produkt erstellen (ADMIN)  |
| `PATCH`  | `/api/products/:id` | Produkt bearbeiten (ADMIN) |
| `DELETE` | `/api/products/:id` | Produkt löschen (ADMIN)    |

### Categories

| Methode  | Endpoint              | Zweck                        |
| -------- | --------------------- | ---------------------------- |
| `GET`    | `/api/categories`     | Kategorien anzeigen          |
| `POST`   | `/api/categories`     | Kategorie erstellen (ADMIN)  |
| `PATCH`  | `/api/categories/:id` | Kategorie bearbeiten (ADMIN) |
| `DELETE` | `/api/categories/:id` | Kategorie löschen (ADMIN)    |

### Orders

| Methode | Endpoint                 | Zweck                               |
| ------- | ------------------------ | ----------------------------------- |
| `POST`  | `/api/orders`            | Bestellung erstellen (USER)         |
| `GET`   | `/api/orders/my`         | eigene Bestellungen anzeigen (USER) |
| `GET`   | `/api/orders`            | alle Bestellungen anzeigen (ADMIN)  |
| `PATCH` | `/api/orders/:id/status` | Bestellstatus ändern (ADMIN)        |

### Filter

Produkte können optional nach Kategorie gefiltert werden:

`GET /api/products?categoryId=:categoryId`

Ohne `categoryId` werden alle Produkte zurückgegeben.

## 6. Request-, Response- und Error-Beispiele

Diese Beispiele werden vor der Implementierung der jeweiligen API-Routen dokumentiert.

Geplant sind:

- Beispiel für einen erfolgreichen Request
- Beispiel für eine erfolgreiche JSON-Response
- Beispiel für ungültige Eingaben
- Beispiel für Authentication-/Authorization-Fehler
- passende HTTP-Statuscodes

## 7. Authentication und Authorization

### Öffentlich

- Produkte und Kategorien lesen
- Registrierung und Login

### USER

- Bestellung erstellen
- nur eigene Bestellungen ansehen

### Rollen und Berechtigungen

| Aktion                              | USER | ADMIN | SUPER_ADMIN |
| ----------------------------------- | ---- | ----- | ----------- |
| Produkte ansehen                    | ✅   | ✅    | ✅          |
| Bestellungen erstellen              | ✅   | ✅    | ✅          |
| Produkte und Kategorien verwalten   | ❌   | ✅    | ✅          |
| Bestellungen verwalten              | ❌   | ✅    | ✅          |
| Benutzer sperren und entsperren     | ❌   | ❌    | ✅          |
| ADMIN-Rolle vergeben oder entfernen | ❌   | ❌    | ✅          |
| Benutzer löschen                    | ❌   | ❌    | ✅          |

Die Rolle wird ausschließlich im Backend geprüft. Eine öffentliche Registrierung erstellt immer einen User mit der Rolle `USER`. Der Client darf keine Rolle wie `ADMIN` oder `SUPER_ADMIN` festlegen.

### Benutzerverwaltung durch SUPER_ADMIN

Geplante Endpunkte:

```text
GET    /api/admin/users
PATCH  /api/admin/users/:id/role
POST   /api/admin/users/:id/ban
POST   /api/admin/users/:id/unban
DELETE /api/admin/users/:id
```

Nur SUPER_ADMIN darf Rollen und Benutzer verwalten. Ein SUPER_ADMIN darf sich nicht selbst sperren oder löschen. Der letzte SUPER_ADMIN darf nicht entfernt oder herabgestuft werden.

Clerk verwaltet die Anmeldung und kann Benutzer sperren oder entsperren. PostgreSQL speichert die projektspezifische Rolle und die Bestellhistorie. Für den Shop wird zunächst das Sperren bevorzugt, damit Bestellungen erhalten bleiben.

Die Zugriffsrechte werden im Backend geprüft, nicht nur im Frontend.

## 8. Business Logic

- Ein Produkt muss existieren.
- Die Menge muss gültig sein.
- Der Server verwendet Preis- und Produktdaten aus der Datenbank.
- Der Gesamtpreis wird im Backend berechnet.
- Ein Benutzer darf nur seine eigenen Bestellungen sehen.
- Admin-Funktionen sind nur für ADMIN verfügbar.
- Bestellstatus muss einen erlaubten Wert haben.

## 9. Security

- Eingaben mit Zod validieren
- geschützte Routen verwenden
- CORS gezielt konfigurieren
- Rate Limiting für sensible Endpunkte
- Fehler ohne Stacktrace oder Secrets an Clients senden
- Secrets nur über Environment Variables
- keine Zugangsdaten in GitHub veröffentlichen
- HTTPS beim Deployment verwenden

Nicht relevante Sicherheitsmaßnahmen werden in der Dokumentation kurz begründet.

## 10. Testing

Automatisierte Tests für:

- erfolgreiche Requests
- ungültige Eingaben
- Authentication-/Authorization-Fälle
- wichtige Fehlerfälle

## 11. Dokumentation und Abgabe

### README enthält

- kurze Beschreibung und Zweck der API
- Setup und Start
- Konfiguration
- API-Endpunkte
- Request-/Response-Beispiele
- Error-Beispiele
- Tests
- Link zum Projektplan
- Link/Abbildung des ERD
- Live-Backend-URL

### Abgabe

- GitHub Repository
- funktionierende Live-Backend-URL
- vollständige README
- tägliche Projekt-Updates

## 12. Arbeitsplan – 10 Arbeitstage

- **Tag 1:** Projektidee, MVP, Rollen, Datenmodelle, ERD, PostgreSQL-Tabellen, API-Endpunkte und Projektstruktur planen; Git Repository vorbereiten.
- **Tag 2:** Node.js + Express + PostgreSQL/Prisma einrichten; Datenbankverbindung und Grundstruktur testen.
- **Tag 3:** Category + Product und CRUD.
- **Tag 4:** User, Registrierung, Login und Authentication.
- **Tag 5:** USER/ADMIN und Authorization.
- **Tag 6:** Order + OrderItem und Business Logic.
- **Tag 7:** einfaches HTML/CSS/JavaScript-Frontend: Produktkatalog und Warenkorb.
- **Tag 8:** kleine Admin-Oberfläche: Products, Categories und Orders.
- **Tag 9:** Zod, Security, Error Handling und automatisierte API-Tests.
- **Tag 10:** vollständigen Flow testen, Fehler beheben, README, GitHub und Deployment.

### Pufferzeit bis zur Abgabe

- offene Tests und Fehler beheben
- Dokumentation vervollständigen
- Deployment prüfen
- Live-Endpunkte prüfen

## 13. Prioritäten

1. funktionierende REST-API und PostgreSQL
2. Datenbeziehungen und CRUD
3. Authentication und Authorization
4. Validation, Security und Error Handling
5. automatisierte Tests und Dokumentation
6. Deployment
7. einfache Benutzeroberfläche/Admin Panel

Wenn die Zeit knapp wird, werden keine zusätzlichen Features begonnen. Die Anforderungen der Backend-Aufgabe haben Vorrang vor dem Design des Frontends.

## 14. Tägliche Updates an die Lehrkraft

### TLP am Morgen

- drei wichtigste Aufgaben
- größtes Risiko/Hindernis
- Lösung bzw. Maßnahme gegen das Risiko

### Update nach der ILP

- mindestens drei tatsächlich abgeschlossene Aufgaben
- wichtigste Erkenntnis des Tages
- höchste Priorität für morgen

Wenn etwas nicht abgeschlossen wurde, wird es ehrlich erwähnt und der nächste Schritt beschrieben.

```

```
