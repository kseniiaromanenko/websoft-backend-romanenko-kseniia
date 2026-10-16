Tagesplan – Tag 1

**Datum:** 30. September 2026

Heute plane ich mein Abschlussprojekt. Ich habe mich für ein Mini-E-Commerce-Projekt mit PostgreSQL entschieden.

Meine drei wichtigsten Aufgaben heute:

1. Projektidee und MVP definieren.
2. Datenmodelle und ERD planen.
3. API-Endpunkte und Projektstruktur planen.

Risiko:
Die Planung könnte zu umfangreich werden.

Lösung:
Ich konzentriere mich zuerst auf die wichtigsten Funktionen des MVP.

---

# Tagesplan – Tag 2

**Datum:** 1. Oktober 2026

Heute richte ich die technische Grundlage für meine Mini E-Commerce REST API ein.

## Meine drei wichtigsten Aufgaben heute

1. Das Node.js-Projekt initialisieren und Express.js einrichten.
2. PostgreSQL und Prisma konfigurieren.
3. Die grundlegende Projektstruktur erstellen und die Server- und Datenbankverbindung testen.

## Risiko

Die Verbindung zwischen Prisma und PostgreSQL könnte wegen einer falschen Datenbankkonfiguration oder einer fehlerhaften Environment Variable nicht funktionieren.

## Lösung

Ich richte die Komponenten schrittweise ein und teste zuerst den Express-Server und danach die Datenbankverbindung. Zugangsdaten speichere ich nur in der lokalen `.env`-Datei und nicht im Git Repository.

---

# Tagesplan – Tag 3

**Datum:** 2. Oktober 2026

Heute implementiere ich die ersten Datenmodelle und CRUD-Endpunkte der Mini E-Commerce REST API.

## Meine drei wichtigsten Aufgaben heute

1. Die Prisma-Modelle Category und Product mit ihrer Beziehung implementieren und eine Migration erstellen.
2. Die CRUD-Endpunkte für Categories implementieren und testen.
3. Die CRUD-Endpunkte für Products einschließlich der Filterung nach Category implementieren und testen.

## Risiko

Die gleichzeitige Implementierung von zwei verbundenen Modellen und mehreren CRUD-Endpunkten könnte zu umfangreich werden. Fehler bei Foreign Keys oder beim Löschen einer Category könnten zusätzliche Zeit benötigen.

## Lösung

Ich implementiere zuerst Category vollständig und teste jeden Endpoint einzeln. Danach implementiere ich Product und prüfe anschließend die Beziehung und die Filterung nach `categoryId`. Zusätzliche Funktionen werden nicht begonnen.

Сегодняшний порядок работы:
Category Model
→ Migration
→ Category CRUD
→ проверка
→ Product Model
→ Migration
→ Product CRUD
→ фильтр categoryId
→ проверка
Authentication и роль ADMIN сегодня пока не реализуем: они запланированы на Day 4–5. Позже защитим уже созданные POST, PATCH и DELETE routes.
+++++++++++++++++++++++++++

## Projektidee und MVP

Die Mini E-Commerce REST API ist das Backend für einen kleinen Online-Shop. Sie verwaltet Benutzer, Kategorien, Produkte und Bestellungen. Der Schwerpunkt liegt auf einer funktionierenden REST-API mit PostgreSQL und nicht auf einem komplexen Frontend.

### Minimaler MVP des gesamten Projekts

- Produkte werden nach Kategorien gespeichert.
- Gäste können Kategorien und Produkte ansehen.
- Benutzer können sich registrieren und anmelden.
- Angemeldete Benutzer können Bestellungen erstellen und nur ihre eigenen Bestellungen ansehen.
- Administratoren können Produkte und Kategorien verwalten.
- Administratoren können alle Bestellungen ansehen und ihren Status ändern.
- Eingaben werden validiert.
- Geschützte Routen prüfen Authentication und Authorization.
- Wichtige API-Funktionen werden automatisiert getestet.
- Die API wird dokumentiert und online bereitgestellt.

### USER

Ein Benutzer kann:

- sich registrieren und anmelden;
- alle Produkte und einzelne Produkte ansehen;
- Produkte in einem einfachen Frontend-Warenkorb auswählen;
- eine Bestellung erstellen;
- nur die eigenen Bestellungen ansehen.

### ADMIN

Ein Administrator kann:

- Produkte erstellen, ansehen, bearbeiten und löschen;
- Kategorien erstellen, ansehen, bearbeiten und löschen;
- alle Bestellungen ansehen;
- den Status einer Bestellung ändern.

### Nicht Teil des MVP

- Online-Zahlung;
- Versandverwaltung;
- Gutscheine und Rabatte;
- Bewertungen und Favoriten;
- eine eigene Warenkorb-Tabelle in der Datenbank;
- Benutzerverwaltung durch Administratoren;
- ein komplexes Frontend.

После исправлений снова выполни тот же `curl`. Ожидается `201 Created`.

## Tag 4 – 5. Oktober 2026

### Bisher erledigt

1. Product CRUD wurde abgeschlossen und getestet: Product erstellen, einzeln anzeigen, bearbeiten und löschen.
2. Die Beziehung zwischen Category und Product wurde mit PostgreSQL und Prisma geprüft.
3. Das Prisma-Modell `User` wurde für die Verwendung mit Clerk vorbereitet.
4. Die Rollen `USER`, `ADMIN` und `SUPER_ADMIN` wurden im Projektplan und im Prisma-Schema ergänzt.
5. Die Rechteverteilung und die spätere Verwaltung von Benutzern durch `SUPER_ADMIN` wurden geplant.

### Nächster Schritt heute

Clerk für Registrierung und Login einrichten, anschließend mit Express verbinden und eine geschützte Test-Route implementieren.

### Wichtigste Erkenntnis

Clerk übernimmt Registrierung, Login, Passwörter und Sessions. PostgreSQL speichert weiterhin die projektspezifischen Daten, insbesondere die Rolle eines Users. Die Berechtigungen werden im Backend geprüft.

# Tagesplan – Tag 5

**Datum:** 6. Oktober 2026

Heute schließe ich zuerst die offenen Aufgaben von Tag 4 ab. Danach beginne ich mit Authentication und Authorization für die bestehende API.

## Meine drei wichtigsten Aufgaben heute

1. Clerk einrichten:
   - Clerk-Anwendung erstellen;
   - Registrierung und Login mit E-Mail und Passwort aktivieren;
   - `@clerk/express` installieren;
   - Clerk Keys sicher über `.env` konfigurieren.

2. Clerk mit Express verbinden:
   - `clerkMiddleware()` in `app.js` einbinden;
   - eine geschützte Test-Route erstellen;
   - prüfen: ohne Authentication `401 Unauthorized`, mit gültiger Clerk-Session erfolgreicher Zugriff.

3. Authorization vorbereiten:
   - lokalen User über `clerkId` mit PostgreSQL verbinden;
   - Rollen `USER`, `ADMIN` und `SUPER_ADMIN` verwenden;
   - Middleware für Authentication und Rollenprüfung vorbereiten;
   - festlegen, welche Product- und Category-Routen später nur für ADMIN erreichbar sind.

## Reihenfolge

Clerk Dashboard  
→ `.env` konfigurieren  
→ `@clerk/express` installieren  
→ Clerk Middleware in Express  
→ geschützte Test-Route  
→ User mit PostgreSQL synchronisieren  
→ `requireAuth` und `requireRole` vorbereiten

## Risiko

Die Verbindung zwischen Clerk, Express, Environment Variables und PostgreSQL kann zusätzliche Fehler verursachen. Außerdem darf kein Clerk Secret Key in GitHub gelangen.

## Lösung

Ich implementiere zunächst nur einen kleinen funktionierenden Authentication-Flow mit einer Test-Route. Secrets bleiben ausschließlich in `.env`. Erst nach erfolgreichem Test schütze ich die bestehenden Product- und Category-Routen.

Guten Morgen, Aretas,

# Tagesplan – Tag 6

**Datum: 7. Oktober 2026**

Heute schließe ich zuerst die offenen Aufgaben zur Authentication und Authorization ab.

Meine drei wichtigsten Aufgaben heute

1. Den Middleware `requireAuth` fertigstellen und mit autorisierten sowie nicht autorisierten Requests testen.
2. Einen Middleware für Rollen (`USER`, `ADMIN`, `SUPER_ADMIN`) implementieren und den ersten SUPER_ADMIN sicher festlegen.
3. Die POST-, PATCH- und DELETE-Routen für Products und Categories mit Authentication und Authorization schützen und die Antworten 401, 403 und erfolgreiche Requests testen.

Risiko

Die Clerk Session, die lokale User-Rolle in PostgreSQL und die bestehenden API-Routen müssen korrekt zusammenarbeiten. Fehler bei Middleware-Reihenfolge oder fehlenden Rollen können den Zugriff blockieren.

Lösung

Ich teste zuerst `GET /api/auth/me` mit und ohne Login. Danach schütze ich schrittweise einzelne Routes und überprüfe jeden Statuscode direkt.

# Tagesplan – Tag 7

**Datum: 8. Oktober 2026**

Heute schließe ich zuerst die offenen Aufgaben des Order-Moduls ab.

Meine drei wichtigsten Aufgaben heute

1. Den Controller für `POST /api/orders` fertigstellen und die Validierung von Warenkorb, Product-ID und Menge prüfen.
2. Die Order-Routen erstellen, `/api/orders` mit Express verbinden und den Endpoint mit Authentication schützen.
3. Die erfolgreiche Bestellung sowie wichtige Fehlerfälle testen: leerer Warenkorb, ungültige Menge und nicht vorhandenes Product.

Risiko

Die Berechnung des Gesamtpreises und die Verbindung zwischen Clerk User, PostgreSQL Products, Order und OrderItems können zusätzliche Fehler verursachen.

Lösung

Der Backend-Code übernimmt die Preisberechnung. Er verwendet nur Product-Daten aus PostgreSQL und nicht einen Preis aus dem Request. Ich teste jeden Schritt mit klaren Request- und Response-Beispielen.

# Tagesplan – Tag 8

**Datum: 9. Oktober 2026**

Heute arbeite ich weiter am Order-Modul und beginne mit den Admin-Funktionen.

**Meine drei wichtigsten Aufgaben heute**

1. Einen geschützten Admin-Endpoint GET /api/orders erstellen. ADMIN und SUPER_ADMIN sollen alle Bestellungen mit Benutzer, Produkten und Status sehen können.

2. Einen Endpoint PATCH /api/orders/:id/status implementieren. Damit kann ein Administrator den Bestellstatus ändern.

3. Die Eingaben für den Bestellstatus mit Zod validieren und die neuen Endpoints mit Postman testen. Dabei prüfe ich auch die Rechte von USER und ADMIN.

**Risiko**

Die Rollenprüfung, Clerk-Token in Postman und die Status-Validierung können zusätzliche Zeit benötigen.

**Lösung**

Ich implementiere zuerst die Admin-Übersicht aller Bestellungen. Danach ergänze ich schrittweise die Statusänderung, Zod-Validierung und die Tests.

# **Tagesplan - Tag 9**

**Datum: Montag, 12. Oktober 2026**

Heute entwickle ich den Warenkorb für die Benutzeroberfläche weiter.
Die Produktübersicht ist bereits vorhanden. Produkte können zum Warenkorb
hinzugefügt werden und die Anzahl wird in der Navigation angezeigt.

**Meine drei wichtigsten Aufgaben heute:**

1. Den zentralen Error Handler implementieren, damit unerwartete Serverfehler keine technischen Details oder Prisma-Stacktraces an den Client senden.
2. Den Warenkorb in der Benutzeroberfläche fertigstellen: Produkte anzeigen, Mengen verwalten, Produkte entfernen und Gesamtpreis berechnen.
3. Den Warenkorb mit POST /api/orders verbinden und den kompletten Bestellablauf  im Browser testen.

**Risiko:**
Die Daten aus dem Warenkorb müssen im richtigen JSON-Format an das Backend gesendet werden. Außerdem muss der Benutzer angemeldet sein.
Unerwartete Serverfehler dürfen keine technischen Details an den Client senden.

**Lösung:**
Das Frontend sendet nur productId und quantity.
Das Backend prüft weiterhin die Clerk-Session, die Produkte und die Mengen und berechnet den Gesamtpreis selbst aus PostgreSQL.

Ein zentraler Error Handler protokolliert unerwartete Fehler im Server-Terminal und sendet dem Client nur eine allgemeine Fehlermeldung. (bearbeitet)

---

# Tagesplan – Tag 10

**Datum:** Dienstag, 13. Oktober 2026

## Meine drei wichtigsten Aufgaben heute

1. Die Zod-Validierung für Product, Category und `POST /api/orders` ergänzen.
2. Wichtige Fehlerfälle und einheitliche API-Fehlermeldungen prüfen.
3. Die Änderungen aus Tag 9 und Tag 10 nach der Prüfung in einem Git-Commit sichern.

## Risiko

Die bestehenden manuellen Validierungen und die neuen Zod-Schemas dürfen sich nicht widersprechen. Außerdem dürfen bei den Tests keine technischen Fehlermeldungen an den Client gelangen.

## Lösung

Ich übernehme die Validierung Route für Route und teste direkt danach jeweils einen erfolgreichen Request und einen ungültigen Request. Danach prüfe ich den vollständigen Flow und erstelle einen klaren Git-Commit.

# **Tagesplan – Tag 11**

**Datum: Mittwoch, 14. Oktober 2026**

Heute verbessere ich die Sicherheit der API und beginne die
Produktverwaltung für ADMIN im Browser.

**Meine drei wichtigsten Aufgaben heute:**

1. Die wichtigsten API-Statuscodes prüfen:
   400 bei ungültigen Daten, 401 ohne Anmeldung,
   403 bei fehlender ADMIN-Rolle und 404 bei unbekannten Endpoints.

2. Helmet, CORS und Rate Limiting in Express einrichten.
   Danach prüfe ich, dass das Frontend weiterhin Requests an die API senden kann.

3. Eine einfache Admin-Produktverwaltung beginnen:
   Produkte anzeigen sowie Product erstellen, bearbeiten und löschen.
   Dafür nutze ich die bereits vorhandenen geschützten API-Endpunkte.

**Risiko:**

CORS oder Rate Limiting könnten lokale Requests blockieren.
Außerdem müssen die ADMIN-Rolle und der Clerk-Token auch in der neuen
Admin-Produktseite korrekt verwendet werden.

**Lösung:**

Ich richte die Middleware zuerst für localhost:3000 ein.
Danach teste ich die Funktionen schrittweise mit einem ADMIN-Account.
Nach erfolgreichen Tests erstelle ich einen Git-Commit.

Да, обязательно добавим. Автоматические тесты — важная часть проекта и это соответствует исходному плану: **„automatisierte API-Tests“**.

Лучше скорректировать план так, чтобы он был реалистичным:

Guten Morgen, Aretas,

## Tagesplan – Tag 12

**Datum: Donnerstag, 15. Oktober 2026**

Heute entwickle ich die Admin-Funktionen weiter und beginne mit automatisierten API-Tests.

**Meine drei wichtigsten Aufgaben heute:**

1. Die Bearbeitung von Produkten fertigstellen.  
   Ein ADMIN soll Produktdaten im Formular ändern und sie mit `PATCH /api/products/:id` speichern können.

2. Eine einfache Kategorienverwaltung für ADMIN erstellen.  
   Kategorien sollen angezeigt, erstellt, bearbeitet und gelöscht werden können.

3. Den vorhandenen Test-Ordner prüfen und erste automatisierte API-Tests einrichten.  
   Ich teste mindestens erfolgreiche und fehlerhafte Requests, zum Beispiel `200`, `400` und `404`. Danach erstelle ich einen Git-Commit.

**Risiko:**

Automatisierte Tests können durch die Datenbank und die Clerk-Authentifizierung komplizierter werden. Außerdem darf ein Test keine wichtigen bestehenden Daten verändern.

**Lösung:**

Ich beginne mit öffentlichen oder klar abgegrenzten Endpoints. Für geschützte Routen prüfe ich zunächst Fehlerfälle ohne Token. Testdaten werden eindeutig benannt und nach Möglichkeit wieder entfernt.

Так план лучше: сначала завершим видимую admin-функцию, но сегодня обязательно начнём тестирование и разберём, как оно работает.
++++++++++++++++++++++++ 3. Mit Integrationstests in Node.js beginnen.
Ich prüfe API-Endpunkte automatisiert mit Requests und Responses,
zum Beispiel erfolgreiche Anfragen sowie die Statuscodes 400 und 404.
Danach erstelle ich einen Git-Commit.

Risiko:

Integrationstests können bestehende Daten in PostgreSQL verändern.
Geschützte Endpoints benötigen außerdem eine Clerk-Authentifizierung.

Lösung:

Ich verwende klar erkennbare Testdaten und beginne mit öffentlichen Endpoints.
Die Datenbank wird nur über die API getestet; später kann eine getrennte Testdatenbank verwendet werden.

Integrationstest означает: Node.js запускает приложение и отправляет настоящий HTTP-запрос в Express. Затем тест проверяет статус и JSON-ответ. То есть проверяется не одна функция отдельно, а связка:
Test → Express Route → Controller → Prisma → PostgreSQL → Response
Сегодня после редактирования товаров откроем твою папку с тестами и разберём каждый файл.

---

Nach der Produktbearbeitung erstelle ich in meinem Test-Ordner
den ersten Integrationstest in Node.js und erkläre den Aufbau Schritt für Schritt.
Порядок будет такой:

1. Produkt bearbeiten fertigstellen
2. Test-Umgebung ansehen und konfigurieren
3. Ersten Test schreiben
4. Test ausführen und Ergebnis verstehen
   Начнём с простого публичного endpoint, например GET /api/categories: он не требует Clerk-Token и идеально подходит для первого Integrationstest.
   +++++++++++++++++++++++++++++++++++++

Следующие дни в project-plan.md лучше понимать так:

- День 4: Clerk, User-модель, migration, защищённый тестовый endpoint.
- День 5: USER / ADMIN / SUPER_ADMIN, middleware прав, защита существующих Product и Category routes.
- День 6: Order и OrderItem.
- День 7: пользовательская часть frontend и вход через Clerk.
- День 8: Admin Panel и, если останется время, управление пользователями.
- День 9: Zod, Helmet, CORS, Rate Limiting, Error Handler, тесты.
- День 10: полный flow, README, GitHub, deployment.

## Clerk: текущий статус

- Модель User подготовлена для Clerk: `clerkId` связывает пользователя Clerk с записью в PostgreSQL.
- Пароль в нашей базе больше не хранится: Clerk отвечает за регистрацию, вход, пароль и сессию.
- Роли `USER`, `ADMIN` и `SUPER_ADMIN` хранятся в PostgreSQL.
- Права всегда проверяет Express backend, а не frontend.
- SUPER_ADMIN сможет назначать ADMIN, блокировать пользователей и управлять ими через защищённый Admin API.
