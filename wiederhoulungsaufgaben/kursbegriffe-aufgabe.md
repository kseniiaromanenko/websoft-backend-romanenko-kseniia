# Kursbegriffe und Abkürzungen

Diese Übersicht sammelt die zentralen Begriffe, Abkürzungen und Prinzipien aus dem Backend-Kurs von Woche 1 bis zum 15. September 2026. Recherchiere ihre Bedeutungen selbst und ergänze deine eigenen Notizen.

## Abkürzungen

| Begriff | Kurze Definition |
|---|---|
| **API** | Application Programming Interface – eine Schnittstelle, über die Programme Daten und Funktionen austauschen. |
| **URL** | Uniform Resource Locator – die eindeutige Adresse einer Ressource im Internet. |
| **HTTP** | Hypertext Transfer Protocol – ein Protokoll für die Übertragung von Daten im Web. |
| **HTTPS** | Hypertext Transfer Protocol Secure – die verschlüsselte und sichere Version von HTTP. |
| **REST** | Representational State Transfer – ein Architekturstil für APIs, der Ressourcen über HTTP verwaltet. |
| **CRUD** | Create, Read, Update, Delete – die vier Grundoperationen: Erstellen, Lesen, Ändern und Löschen. |
| **JSON** | JavaScript Object Notation – ein textbasiertes Format zum Speichern und Übertragen von Daten. |
| **ESM** | ECMAScript Modules – das moderne Modulsystem von JavaScript mit `import` und `export`. |
| **CommonJS** | Common JavaScript – ein älteres Node.js-Modulsystem mit `require` und `module.exports`. |
| **npm** | Node Package Manager – ein Paketmanager für JavaScript und Node.js. |
| **REPL** | Read-Eval-Print Loop – eine Umgebung, die Code direkt liest, ausführt und das Ergebnis zeigt. |
| **SQL** | Structured Query Language – eine Sprache zum Verwalten relationaler Datenbanken. |
| **NoSQL** | Not Only SQL – ein Sammelbegriff für nicht relationale Datenbanksysteme. |
| **ORM** | Object-Relational Mapping – eine Technik, die Datenbanktabellen als Objekte im Code darstellt. |
| **ODM** | Object-Document Mapping – eine Technik, die Dokumente einer Datenbank als Objekte darstellt. |
| **ACID** | Atomicity, Consistency, Isolation, Durability – vier Eigenschaften, die zuverlässige Transaktionen garantieren. |
| **MVCC** | Multi-Version Concurrency Control – eine Technik, die mehrere Versionen von Daten parallel verwaltet. |
| **PK** | Primary Key – ein Primärschlüssel, der jeden Datensatz eindeutig identifiziert. |
| **FK** | Foreign Key – ein Fremdschlüssel, der Tabellen miteinander verbindet. |
| **1NF, 2NF, 3NF** | First, Second, Third Normal Form – Stufen der Normalisierung für gut strukturierte Tabellen. |
| **JWT** | JSON Web Token – ein signiertes Token, das Informationen über einen Benutzer enthalten kann. |
| **MFA** | Multi-Factor Authentication – eine Anmeldung mit mindestens zwei verschiedenen Sicherheitsfaktoren. |
| **2FA** | Two-Factor Authentication – eine Anmeldung mit genau zwei Sicherheitsfaktoren. |
| **TOTP** | Time-Based One-Time Password – ein zeitlich begrenzter Einmalcode für die Anmeldung. |
| **OAuth 2.0** | Open Authorization 2.0 – ein Standard, der begrenzten Zugriff auf fremde Ressourcen erlaubt. |
| **OIDC** | OpenID Connect – eine Identitätsschicht auf Basis von OAuth 2.0. |
| **SSO** | Single Sign-On – eine Anmeldung, die Zugang zu mehreren Anwendungen ermöglicht. |
| **CSRF** | Cross-Site Request Forgery – ein Angriff, bei dem ein Benutzer ungewollt eine Aktion ausführt. |
| **XSS** | Cross-Site Scripting – ein Angriff, bei dem schädlicher Code in eine Webseite eingefügt wird. |
| **CORS** | Cross-Origin Resource Sharing – Regeln, die Zugriffe zwischen verschiedenen Origins kontrollieren. |
| **OWASP** | Open Worldwide Application Security Project – eine Organisation mit Wissen und Standards zur Websicherheit. |
| **SDK** | Software Development Kit – eine Sammlung von Werkzeugen zur Entwicklung für eine Plattform. |
| **SaaS** | Software as a Service – Software, die als Onlinedienst angeboten wird. |
| **DBMS** | Database Management System – Software zum Erstellen und Verwalten von Datenbanken. |

## Woche 1: Node.js, npm und Express-Grundlagen

| Begriff | Kurze Definition |
|---|---|
| **Node.js** | Eine Laufzeitumgebung, die JavaScript außerhalb des Browsers ausführt. |
| **Backend** | Der Teil einer Anwendung, der Daten und Geschäftslogik verarbeitet. |
| **Client-Server-Modell** | Ein Modell, bei dem ein Client Anfragen an einen Server sendet. |
| **Event Loop** | Ein Mechanismus, der asynchrone Aufgaben in JavaScript koordiniert. |
| **Asynchronität** | Aufgaben werden ausgeführt, ohne den Rest des Programms während des Wartens zu blockieren. |
| **Modul** | Eine Datei oder Einheit mit wiederverwendbarem Code. |
| **`package.json`** | Eine Datei mit Informationen, Skripten und Abhängigkeiten eines Projekts. |
| **`package-lock.json`** | Eine Datei mit den exakt installierten Versionen aller Pakete. |
| **`dependencies`** | Pakete, die eine Anwendung im normalen Betrieb benötigt. |
| **`devDependencies`** | Pakete, die nur für Entwicklung und Tests benötigt werden. |
| **`node_modules`** | Der Ordner mit den installierten npm-Paketen. |
| **Semantische Versionierung** | Ein Versionssystem im Format Hauptversion.Nebenversion.Patch. |
| **Express.js** | Ein Framework zum Erstellen von Webservern und APIs mit Node.js. |
| **Middleware** | Eine Funktion, die eine Anfrage vor der Antwort verarbeitet. |
| **Route** | Die Verbindung aus HTTP-Methode, Pfad und Handler. |
| **Handler** | Eine Funktion, die auf eine Anfrage reagiert. |
| **statische Route** | Eine Route mit einem festen Pfad. |
| **dynamische Route** | Eine Route mit veränderlichen Teilen im Pfad. |
| **Routenparameter** | Ein variabler Wert direkt im Pfad einer URL. |
| **Queryparameter** | Zusätzliche Werte nach dem Fragezeichen einer URL. |
| **`req`** | Request – ein Express-Objekt mit Informationen über die Anfrage. |
| **`res`** | Response – das Express-Objekt zum Senden der Antwort. |
| **`next()`** | Übergibt die Anfrage an die nächste Middleware. |
| **`next(err)`** | Übergibt einen Fehler an die Fehlerbehandlung. |
| **JSON-Middleware** | JavaScript Object Notation Middleware – Middleware, die einen JSON-Request-Body in ein Objekt umwandelt. |

## HTTP, APIs und CRUD

| Begriff | Kurze Definition |
|---|---|
| **Request** | Eine Anfrage, die ein Client an einen Server sendet. |
| **Response** | Die Antwort eines Servers auf eine Anfrage. |
| **HTTP-Methode** | Hypertext Transfer Protocol Method – beschreibt die gewünschte Aktion, wie GET oder POST. |
| **Endpunkt** | Eine konkrete URL einer API für eine bestimmte Funktion. |
| **Request-Body** | Der Teil der Anfrage, der die gesendeten Daten enthält. |
| **Header** | Metadaten über eine Anfrage oder Antwort. |
| **Statuscode** | Eine Zahl, die das Ergebnis einer HTTP-Anfrage beschreibt. |
| **`200 OK`** | Die Anfrage war erfolgreich. |
| **`201 Created`** | Eine neue Ressource wurde erfolgreich erstellt. |
| **`204 No Content`** | Die Anfrage war erfolgreich, aber die Antwort enthält keine Daten. |
| **`400 Bad Request`** | Die Anfrage enthält ungültige oder fehlende Daten. |
| **`401 Unauthorized`** | Für die Anfrage fehlt eine gültige Anmeldung. |
| **`403 Forbidden`** | Der Zugriff ist trotz bekannter Identität nicht erlaubt. |
| **`404 Not Found`** | Die gesuchte Ressource wurde nicht gefunden. |
| **`500 Internal Server Error`** | Auf dem Server ist ein unerwarteter Fehler aufgetreten. |
| **REST-Ressource** | Representational State Transfer Resource – ein Objekt oder Datensatz, der von der REST-API verwaltet wird. |
| **`PUT`** | Ersetzt in der Regel die Ressource vollständig. |
| **`PATCH`** | Ändert in der Regel nur einzelne Teile der Ressource. |
| **404-Fallback** | Eine letzte Route für alle nicht gefundenen Endpunkte. |
| **zentrale Fehlerbehandlung** | Eine gemeinsame Stelle, die Fehler verarbeitet und Antworten sendet. |
| **In-Memory-Speicher** | Daten, die sich nur im Arbeitsspeicher des laufenden Programms befinden. |
| **Postman** | Ein Programm zum Senden und Testen von API-Anfragen. |
| **Pre-request** | Ein Skript, das vor einer Anfrage ausgeführt wird. |
| **Response-Test** | Ein automatischer Test für Inhalt und Status einer Antwort. |

## Datenbanken und Datenmodelle

| Begriff | Kurze Definition |
|---|---|
| **Datenbank** | Eine organisierte Sammlung von Daten. |
| **Datenbankserver** | Ein Server, der Datenbanken speichert und Abfragen verarbeitet. |
| **relationale Datenbank** | Eine Datenbank, die Daten in verknüpften Tabellen speichert. |
| **Tabelle** | Eine Struktur aus Zeilen und Spalten. |
| **Zeile / Datensatz** | Ein vollständiger Eintrag in einer Tabelle. |
| **Spalte** | Ein Feld mit einer bestimmten Eigenschaft der Datensätze. |
| **Datentyp** | Er bestimmt, welche Art von Wert ein Feld speichern darf. |
| **PostgreSQL** | Ein freies relationales Datenbanksystem. |
| **Postgres** | Eine gebräuchliche Kurzform für PostgreSQL. |
| **`psql`** | Ein Befehlszeilenprogramm für PostgreSQL. |
| **pgAdmin** | Eine grafische Oberfläche zur Verwaltung von PostgreSQL. |
| **MongoDB** | Eine NoSQL-Datenbank, die Daten als Dokumente speichert. |
| **MongoDB Atlas** | Ein Cloud-Service für MongoDB-Datenbanken. |
| **Dokument** | Ein Datensatz in einer dokumentenorientierten Datenbank. |
| **Collection** | Eine Sammlung ähnlicher Dokumente in MongoDB. |
| **Mongoose** | Eine Bibliothek für die Arbeit mit MongoDB in Node.js. |
| **Schema** | Eine Beschreibung der Struktur und Regeln von Daten. |
| **Model** | Eine programmierbare Darstellung von Daten auf Basis eines Schemas. |
| **Relation** | Eine Beziehung zwischen Tabellen oder Datensätzen. |
| **One-to-Many** | Eine Beziehung, in der ein Datensatz mit vielen Datensätzen verknüpft ist. |
| **Normalisierung** | Das Aufteilen von Daten, um Wiederholungen und Fehler zu vermeiden. |
| **Constraint** | Eine Regel, die die zulässigen Werte in der Datenbank begrenzt. |
| **`PRIMARY KEY`** | Ein Feld, das jeden Datensatz eindeutig identifiziert. |
| **`FOREIGN KEY`** | Ein Feld, das auf den Primärschlüssel einer anderen Tabelle verweist. |
| **`UNIQUE`** | Eine Regel, die doppelte Werte verhindert. |
| **`NOT NULL`** | Eine Regel, die einen leeren Wert verbietet. |
| **`CHECK`** | Eine Regel, die Werte anhand einer Bedingung prüft. |
| **`DEFAULT`** | Ein Standardwert, wenn kein anderer Wert angegeben wird. |
| **Index** | Eine zusätzliche Struktur, die die Suche in der Datenbank beschleunigt. |
| **SQL-Abfrage** | Structured Query Language Query – SQL-Befehl zum Lesen oder Ändern von Daten. |
| **`CREATE DATABASE`** | SQL-Befehl zum Erstellen einer Datenbank. |
| **`CREATE TABLE`** | Ein SQL-Befehl zum Erstellen einer Tabelle. |
| **`INSERT`** | SQL-Befehl zum Einfügen neuer Datensätze. |
| **`SELECT`** | SQL-Befehl zum Lesen von Daten. |
| **`WHERE`** | SQL-Klausel zum Filtern von Datensätzen. |
| **JOIN** | Verbindet Datensätze aus mehreren Tabellen. |
| **Transaktion** | Eine Gruppe von Operationen, die gemeinsam ausgeführt werden. |
| **Rollback** | Macht die Änderungen einer Transaktion rückgängig. |
| **JSONB** | JavaScript Object Notation Binary – ein PostgreSQL-Datentyp für effizient gespeicherte JSON-Daten. |
| **Prisma** | Ein Werkzeug für typsicheren Datenbankzugriff. |
| **Prisma Schema** | Eine Datei, die die Datenmodelle und die Verbindung zur Datenbank beschreibt. |
| **Prisma Client** | Automatisch generierter Code für Datenbankabfragen. |
| **Prisma Migrate** | Ein Werkzeug zum Verwalten von Änderungen am Datenbankschema. |
| **Query Builder** | Ein Werkzeug, das Datenbankabfragen mit Code aufbaut. |
| **Drizzle** | Ein TypeScript-ORM für SQL-Datenbanken. |

## Authentifizierung und Sessions

| Begriff | Kurze Definition |
|---|---|
| **Authentifizierung** | Die Prüfung, wer ein Benutzer ist. |
| **Autorisierung** | Die Prüfung, was ein Benutzer tun darf. |
| **Identität** | Informationen, die eine Person oder ein System eindeutig beschreiben. |
| **Passwort-Hash** | Ein nicht direkt umkehrbarer Prüfwert eines Passworts. |
| **Salt** | Ein zufälliger Zusatz, der vor dem Hashing zum Passwort kommt. |
| **Hashing** | Die Umwandlung von Daten in einen festen Prüfwert. |
| **Argon2id, scrypt, bcrypt** | Sichere Verfahren zum Hashen von Passwörtern. |
| **Brute Force** | Ein Angriff, der sehr viele mögliche Passwörter ausprobiert. |
| **Credential Stuffing** | Ein Angriff mit gestohlenen Zugangsdaten anderer Dienste. |
| **Phishing** | Der Versuch, Menschen dazu zu bringen, sensible Daten preiszugeben. |
| **Session** | Ein serverseitig verwalteter Anmeldezustand eines Benutzers. |
| **Session-ID** | Eine zufällige Kennung, die den Client mit der Sitzung verknüpft. |
| **Session-Store** | Ein Speicher für Sessions und ihre Daten. |
| **Cookie** | Eine kleine Information, die der Browser für eine Webseite speichert. |
| **Session-Cookie** | Ein Cookie, das die Sitzungs-ID enthält. |
| **`HttpOnly`** | Verhindert den Zugriff auf ein Cookie durch JavaScript. |
| **`Secure`** | Erlaubt das Senden eines Cookies nur über HTTPS. |
| **`SameSite`** | Bestimmt, wann ein Cookie bei fremden Webseiten mitgesendet wird. |
| **Session Fixation** | Angriff mit einer vordefinierten Sitzungs-ID. |
| **Session Hijacking** | Die unerlaubte Übernahme einer fremden Session. |
| **Session-Regeneration** | Das Erzeugen einer neuen Session-ID nach einer wichtigen Aktion. |
| **Session-Timeout** | Automatische Beendigung der Sitzung nach einer bestimmten Zeit. |
| **Sliding Expiration** | Verlängert die Session bei weiterer Aktivität. |
| **Bearer Token** | Ein Token, das seinem Besitzer Zugriff gewährt. |
| **Passkey** | Sichere Anmeldung mit kryptographischem Schlüsselpaar. |
| **WebAuthn** | Web-Standard für sichere Anmeldung mit Zugangsschlüsseln und Geräten. |
| **Clerk** | Ein Dienst zum Anmelden und Verwalten von Benutzern. |
| **Auth-as-a-Service** | Ein externer Dienst kümmert sich um die Authentifizierung und Benutzerverwaltung. |
| **Vendor Lock-in** | Starke Abhängigkeit von einem bestimmten Anbieter. |

## JWT und Token-Sicherheit

| Begriff | Kurze Definition |
|---|---|
| **JWT-Header** | JSON Web Token Header – der Teil eines JWT mit Informationen über Typ und Signaturverfahren. |
| **JWT-Payload** | JSON Web Token Payload – der Teil eines JWT, der Claims enthält. |
| **Claim** | Eine separate Aussage oder Information in einem Token. |
| **JWT-Signature** | JSON Web Token Signature – sie schützt ein JWT vor unbemerkten Veränderungen. |
| **Base64URL** | Base64 Uniform Resource Locator Encoding – eine URL-sichere Kodierung für binäre Daten. |
| **JWS** | JSON Web Signature – ein Standard für digital signierte Daten. |
| **`HS256`** | HMAC using SHA-256 – ein Signaturverfahren mit einem gemeinsamen geheimen Schlüssel. |
| **`RS256`** | RSA Signature with SHA-256 – ein Signaturverfahren mit einem privaten und einem öffentlichen Schlüssel. |
| **`sub`** | Claim, der die ID des Token-Inhabers angibt. |
| **`iss`** | Claim, der den Aussteller des Tokens angibt. |
| **`aud`** | Claim, der den vorgesehenen Empfänger des Tokens angibt. |
| **`exp`** | Claim, der die Ablaufzeit des Tokens angibt. |
| **`nbf`** | Claim, der den Zeitpunkt angibt, ab dem das Token gültig ist. |
| **`iat`** | Claim, der den Zeitpunkt der Token-Erstellung angibt. |
| **`jti`** | Eine eindeutige Kennung für ein JWT. |
| **`jsonwebtoken`** | Eine Node.js-Bibliothek zum Erstellen und Prüfen von JWTs. |
| **`jwt.sign()`** | Erstellt und signiert ein JWT. |
| **`jwt.verify()`** | Prüft Signatur und Gültigkeit eines JWT. |
| **`jwt.decode()`** | Liest ein JWT, ohne seine Signatur zu prüfen. |
| **Refresh Token** | Ein langlebiges Token zum Anfordern neuer Access Tokens. |
| **Token-Rotation** | Bei jeder Erneuerung wird ein neues Refresh Token ausgegeben. |
| **Token-Widerruf** | Das Token wird ungültig, bevor es abläuft. |

## API-Sicherheit und CORS

| Begriff | Kurze Definition |
|---|---|
| **Angriffsfläche** | Alle Stellen eines Systems, die angegriffen werden können. |
| **Input Validation** | Die Prüfung, ob Eingaben dem erwarteten Format entsprechen. |
| **Parsing** | Die Umwandlung von Textdaten in eine nutzbare Struktur. |
| **Normalisierung** | Eingaben werden in eine einheitliche Form gebracht. |
| **Positivliste / Whitelist** | Es gelten nur explizit erlaubte Werte oder Aktionen. |
| **Negativliste / Blacklist** | Bestimmte bekannte Werte oder Aktionen werden verboten. |
| **Injection** | Schädliche Eingaben verändern einen Befehl oder eine Abfrage. |
| **SQL Injection** | Schädlicher SQL-Code wird über Eingaben eingeschleust. |
| **NoSQL Injection** | Schädliche Eingaben verändern eine NoSQL-Abfrage. |
| **Command Injection** | Eingaben führen unerlaubte Befehle im Betriebssystem aus. |
| **Broken Object Level Authorization** | Ein Benutzer kann unerlaubt auf fremde Objekte zugreifen. |
| **Broken Object Property Level Authorization** | Der Benutzer kann einzelne Eigenschaften ohne Berechtigung lesen oder ändern. |
| **Mass Assignment** | Ungeprüfte Eingaben ändern auch nicht erlaubte Felder eines Objekts. |
| **Data Minimization** | Es werden nur wirklich notwendige Daten verarbeitet. |
| **Rate Limiting** | Die Anzahl der Anfragen wird pro Zeitraum begrenzt. |
| **Unrestricted Resource Consumption** | Fehlende Grenzen erlauben einen zu hohen Verbrauch von Ressourcen. |
| **Sicherheits-Fehlkonfiguration** | Unsichere Einstellungen machen ein System angreifbar. |
| **Same-Origin-Prinzip** | Browser begrenzen Zugriffe zwischen verschiedenen Origins. |
| **Origin** | Die Kombination aus Protokoll, Host und Port einer Adresse. |
| **Cross-Origin-Request** | Eine Anfrage an eine andere Origin. |
| **CORS-Header** | Cross-Origin Resource Sharing Header – HTTP-Header, die erlaubte Zugriffe zwischen Origins festlegen. |
| **Preflight** | Eine automatische OPTIONS-Anfrage zur Prüfung eines CORS-Zugriffs. |
| **`Access-Control-Allow-Origin`** | Legt fest, welche Origin auf eine Antwort zugreifen darf. |
| **`Access-Control-Allow-Methods`** | Gibt die zulässigen HTTP-Methoden für CORS-Anfragen an. |
| **`Access-Control-Allow-Headers`** | Legt die zulässigen Anfrage-Header für CORS-Anfragen fest. |
| **HTTPS/TLS** | Hypertext Transfer Protocol Secure / Transport Layer Security – verschlüsselt die Verbindung zwischen dem Client und dem Server. |
| **Logging** | Das systematische Speichern wichtiger Ereignisse. |
| **Monitoring** | Die laufende Überwachung von Zustand, Leistung und Fehlern. |
| **Deny by default** | Zugriff ist verboten, bis er ausdrücklich erlaubt wird. |
| **Never trust the client** | Alle Daten vom Client müssen auf dem Server geprüft werden. |
