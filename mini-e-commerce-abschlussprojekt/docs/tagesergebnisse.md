# Tagesergebnisse

## Tag 1 – 30. September 2026

### Erledigte Aufgaben

1. Die Projektidee, der minimale MVP und die Rollen USER und ADMIN wurden definiert.
2. Die Datenmodelle User, Category, Product, Order und OrderItem mit ihren Feldern und Beziehungen wurden geplant.
3. Ein ERD für die PostgreSQL-Datenbank wurde erstellt.
4. Die REST-Endpunkte und eine minimale Filterung der Produkte nach Kategorie wurden geplant.
5. Eine einfache Projektstruktur für Backend, Frontend und Tests wurde festgelegt.

### Wichtigste Erkenntnis

Ich habe verstanden, wie User, Orders, OrderItems, Products und Categories miteinander verbunden sind. OrderItem verbindet eine Bestellung mit einem Produkt und speichert zusätzlich die Menge und den Produktpreis zum Zeitpunkt der Bestellung.

### Höchste Priorität für morgen

Node.js, Express.js, PostgreSQL und Prisma einrichten und anschließend die grundlegende Server- und Datenbankverbindung testen.

--

## Tag 2 – 1. Oktober 2026

### Erledigte Aufgaben

Heute habe ich das Node.js-Projekt initialisiert, Express installiert und einen minimalen Server mit dem Endpoint `GET /api/health` erstellt und getestet.

Außerdem habe ich Prisma und PostgreSQL eingerichtet. Ich habe eine lokale Datenbank mit einer eigenen Benutzerrolle erstellt, `DATABASE_URL` konfiguriert und die Verbindung zwischen Prisma und PostgreSQL erfolgreich getestet.

Schwierigkeiten gab es bei der PostgreSQL-Authentifizierung, bei der Prisma-Konfiguration und bei einer Sicherheitswarnung in einer Prisma-Abhängigkeit. Die Fehler wurden schrittweise geprüft und behoben.

### Wichtigste Erkenntnis

Meine wichtigste Erkenntnis war der Zusammenhang zwischen Express, Prisma, `DATABASE_URL` und PostgreSQL. Außerdem habe ich den Unterschied zwischen `npm`, `npx` und npm scripts wiederholt.

### Höchste Priorität für morgen

Meine höchste Priorität für morgen ist die Implementierung der Modelle Category und Product sowie der zugehörigen CRUD-Endpunkte.

## Tag 3 – 2. Oktober 2026

### Erledigte Aufgaben

1. Das Prisma-Modell `Category` wurde erstellt, formatiert und validiert.
2. Eine Migration für die Tabelle `Category` wurde erstellt und erfolgreich auf PostgreSQL angewendet.
3. Der Prisma Client wurde mit dem Express-Backend verbunden.
4. `GET /api/categories` wurde implementiert und getestet.
5. `POST /api/categories` wurde implementiert und mit einer neuen Kategorie getestet.
6. Die Aufteilung in Route, Controller, Prisma Client und Datenbank wurde umgesetzt.

### Schwierigkeiten

Beim Erstellen der Migration konnte Prisma zunächst keine Shadow Database erstellen. Die lokale Development-Role benötigte dafür die Berechtigung `CREATEDB`.

Außerdem gab es einen Fehler wegen einer fehlenden `.js`-Dateiendung in einem ES-Module-Import. Dabei wurde deutlich, dass `node --check` nur die Syntax prüft, aber nicht kontrolliert, ob importierte Dateien tatsächlich gefunden werden.

### Wichtigste Erkenntnis

Ich habe besser verstanden, wie ein Request durch das Backend läuft:

```text
Request
→ Route
→ Controller
→ Prisma
→ PostgreSQL
→ Response
```

Außerdem habe ich gelernt, wie Prisma aus einem Modell eine SQL Migration erstellt und diese auf die Datenbank anwendet.
Noch nicht abgeschlossen

- PATCH /api/categories/:id
- DELETE /api/categories/:id
- erfolgreiche und fehlerhafte Category Requests vollständig prüfen
- das Modell Product erstellen
- Category 1:N Product implementieren
- Product Migration erstellen
- Product CRUD und Filterung nach categoryId implementieren

Priorität für das Wochenende
Category CRUD fertigstellen und testen. Danach das Modell Product, die Beziehung zu Category, die Migration sowie Product CRUD und die Filterung nach categoryId implementieren.

Priorität für Montag
Mit Tag 4 des Projektplans beginnen: User, Registrierung, Login und Authentication implementieren.

## Tagesupdate – 05.10.2026

Heute habe ich den Product CRUD abgeschlossen und getestet. Außerdem habe ich das User-Modell für Clerk vorbereitet sowie die Rollen USER, ADMIN und SUPER_ADMIN im Prisma-Schema und Projektplan ergänzt.

Als Nächstes richte ich Clerk für Registrierung und Login ein und verbinde die Authentifizierung mit Express über eine geschützte Test-Route.

Wichtigste Erkenntnis: Clerk übernimmt Login, Passwörter und Sessions; PostgreSQL speichert die projektspezifischen Rollen. Die Berechtigungen werden im Backend geprüft.

Jetzt habe ich noch Deutschunterricht. Die heute nicht abgeschlossenen Aufgaben werde ich morgen weiterbearbeiten.

## Tagesupdate – 06.10.2026

Heute habe ich Clerk für die Registrierung und Anmeldung eingerichtet. E-Mail und Passwort sind aktiviert; Google bleibt als zusätzlicher Anmeldeweg verfügbar.

Ich habe Clerk mit dem Express-Backend verbunden, die Clerk Keys sicher über die .env-Datei konfiguriert und eine geschützte Route `GET /api/auth/me` implementiert und getestet.

Außerdem habe ich eine einfache temporäre Login-Seite mit den Clerk-Komponenten erstellt. Nach erfolgreichem Login wird der Clerk-User automatisch mit PostgreSQL synchronisiert. Dabei werden `clerkId`, E-Mail-Adresse und die Standardrolle `USER` in der lokalen User-Tabelle gespeichert.

Wichtigste Erkenntnis: Clerk übernimmt Registrierung, Passwort, Login und Session. Express prüft die Session, und PostgreSQL speichert die projektspezifischen Daten und Rollen.

Morgen implementiere ich `requireAuth` und die Rollenprüfung für USER, ADMIN und SUPER_ADMIN. Danach schütze ich die bestehenden POST-, PATCH- und DELETE-Routen für Products und Categories und teste die Antworten 401 Unauthorized sowie 403 Forbidden.

## Tagesupdate – 07.10.2026

Heute habe ich die Authentication und Authorization weiter abgeschlossen. Ich habe die Middleware `requireAuth`, `requireAdmin` und `requireSuperAdmin` implementiert und getestet.

Dabei habe ich folgende Fälle geprüft:

- ohne Login: 401 Unauthorized;
- eingeloggter USER ohne Admin-Rechte: 403 Forbidden;
- ADMIN beziehungsweise SUPER_ADMIN: erfolgreicher Zugriff mit 200 OK.

Außerdem habe ich die POST-, PATCH- und DELETE-Routen für Categories und Products geschützt. Lesen von Products und Categories bleibt weiterhin öffentlich möglich.

Danach habe ich die Prisma-Modelle Order und OrderItem mit den Beziehungen zu User und Product erstellt. Die Migration `add_order` wurde erstellt und auf PostgreSQL angewendet.

Wichtigste Erkenntnis: Authentication beantwortet die Frage, wer eingeloggt ist. Authorization prüft danach, ob diese Person aufgrund ihrer Rolle eine bestimmte Aktion ausführen darf.

Morgen implementiere und teste ich `POST /api/orders`. Dabei wird der User aus der Clerk Session bestimmt, Products werden aus PostgreSQL geladen und der Gesamtpreis wird sicher im Backend berechnet. Danach beginne ich mit den Endpunkten für eigene Bestellungen und die Bestellverwaltung durch Admins.
