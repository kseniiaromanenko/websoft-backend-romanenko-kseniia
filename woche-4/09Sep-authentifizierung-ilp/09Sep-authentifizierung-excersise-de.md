# Individuelle Learning Phase: Sicheres Login-Backend mit Node.js

## Dein Ziel

Du baust ein kleines Backend mit Node.js und Express, das eine sichere Benutzerregistrierung und einen Login ermöglicht. Dabei setzt du zentrale Grundlagen der Authentifizierung praktisch um: Passwort-Hashing, Login-Prüfung, geschützte Routen und eine einfache Rollenprüfung zur Abgrenzung von Authentifizierung und Autorisierung.

## Das brauchst du

- Node.js und npm
- einen Code-Editor
- ein Terminal
- ein API-Test-Tool wie Postman, Insomnia oder Thunder Client
- ein neues Projektverzeichnis
- diese npm-Pakete:
  - `express`
  - `bcryptjs`
  - optional: `dotenv`

## Zeitplanung

- **10 Minuten:** Projekt anlegen und Grundstruktur vorbereiten
- **25 Minuten:** Registrierungsroute mit sicherer Passwortspeicherung umsetzen
- **25 Minuten:** Login mit Passwortprüfung und Token/Sitzung umsetzen
- **25 Minuten:** Geschützte Route und Rollenprüfung ergänzen
- **20 Minuten:** Sicherheitsaspekte verbessern und testen
- **15 Minuten:** Erweiterung oder kurze Reflexion/Dokumentation

## Basis-Aufgaben

### Aufgabe 1:

Backend-Grundgerüst erstellen  
**Ziel:** Du richtest ein lauffähiges Express-Backend mit klarer Struktur für Authentifizierung ein.  

**Arbeitsauftrag:**  
- Lege ein neues Node.js-Projekt an.
- Installiere die benötigten Pakete.
- Erstelle einen einfachen Express-Server.
- Richte mindestens diese Dateien oder Bereiche ein:
  - `server.js` oder `app.js`
  - Bereich für Benutzerdaten
  - Bereich für Sitzungen oder Tokens
  - Bereich für Middleware
- Lege folgende Test-Routen an:
  - `GET /` → einfache Statusmeldung
  - `GET /health` → JSON-Antwort mit z. B. `{ status: "ok" }`
- Starte den Server und prüfe, ob die Routen erreichbar sind.

**Erwartetes Ergebnis / Soll-Zustand:**  
Dein Server läuft lokal fehlerfrei, reagiert auf Test-Routen und ist so vorbereitet, dass du Registrierungs-, Login- und Schutzlogik ergänzen kannst.

### Aufgabe 2:

Registrierung mit Passwort-Hashing  
**Ziel:** Du speicherst Passwörter nicht im Klartext, sondern sicher gehasht.  

**Arbeitsauftrag:**  
- Erstelle eine Route `POST /register`.
- Verarbeite mindestens diese Eingaben:
  - `email`
  - `password`
  - optional `role` mit Standardwert `user`
- Prüfe, ob ein Benutzer mit derselben E-Mail bereits existiert.
- Hashe das Passwort mit `bcryptjs`, bevor du den Benutzer speicherst.
- Speichere Benutzer zunächst in einer einfachen In-Memory-Struktur, z. B. einem Array.
- Achte darauf, dass du im gespeicherten Benutzerobjekt **kein Klartextpasswort** ablegst.
- Gib bei erfolgreicher Registrierung eine sinnvolle JSON-Antwort zurück.

**Erwartetes Ergebnis / Soll-Zustand:**  
Du kannst einen neuen Benutzer registrieren. In deiner Datenstruktur ist nur ein Passwort-Hash gespeichert, kein Klartextpasswort.

### Aufgabe 3:

Login mit Passwortprüfung  
**Ziel:** Du prüfst Benutzeranmeldungen korrekt und sicher gegen den gespeicherten Hash.  

**Arbeitsauftrag:**  
- Erstelle eine Route `POST /login`.
- Verarbeite `email` und `password`.
- Suche den Benutzer über die E-Mail.
- Vergleiche das eingegebene Passwort mit dem gespeicherten Hash über `bcryptjs.compare`.
- Erzeuge bei erfolgreichem Login eine einfache Sitzung oder ein Token, z. B. mit `crypto.randomUUID()` oder einer ähnlichen Methode.
- Speichere die Zuordnung von Token zu Benutzer in einer In-Memory-Struktur.
- Gib das Token in der JSON-Antwort zurück.
- Verwende bei fehlgeschlagenem Login eine allgemeine Fehlermeldung, damit du nicht unnötig preisgibst, ob E-Mail oder Passwort falsch war.

**Erwartetes Ergebnis / Soll-Zustand:**  
Du kannst dich mit einem registrierten Benutzer einloggen. Bei korrekten Daten erhältst du ein Token, bei falschen Daten eine kontrollierte Fehlermeldung.

### Aufgabe 4:

Geschützte Route für authentifizierte Benutzer  
**Ziel:** Du setzt eine einfache Authentifizierungsprüfung für geschützte API-Endpunkte um.  

**Arbeitsauftrag:**  
- Erstelle eine Middleware, die das Token aus dem `Authorization`-Header liest, z. B. als Bearer-Token.
- Prüfe, ob das Token in deiner Sitzungs-/Token-Struktur existiert.
- Hänge den passenden Benutzer an das Request-Objekt an.
- Erstelle eine geschützte Route `GET /me`.
- Gib dort nur dann Benutzerdaten zurück, wenn ein gültiges Token vorhanden ist.
- Teste die Route:
  - ohne Token
  - mit ungültigem Token
  - mit gültigem Token

**Erwartetes Ergebnis / Soll-Zustand:**  
`GET /me` ist nur mit gültiger Anmeldung erreichbar. Ohne gültiges Token wird der Zugriff abgelehnt.

### Aufgabe 5:

Autorisierung über Rollen ergänzen  
**Ziel:** Du unterscheidest praktisch zwischen Authentifizierung und Autorisierung.  

**Arbeitsauftrag:**  
- Ergänze mindestens eine Route `GET /admin`.
- Erlaube den Zugriff nur, wenn der Benutzer:
  - authentifiziert ist und
  - die Rolle `admin` besitzt
- Verwende für Tests mindestens zwei Benutzer:
  - einen Benutzer mit Rolle `user`
  - einen Benutzer mit Rolle `admin`
- Dokumentiere in einer kurzen Datei `notes.md` oder `README.md` in 4–6 Sätzen:
  - was in deinem Projekt **Authentifizierung** ist
  - was in deinem Projekt **Autorisierung** ist

**Erwartetes Ergebnis / Soll-Zustand:**  
Du kannst praktisch zeigen: Ein gültiger Login reicht nicht automatisch für jeden Zugriff. Die Route `/admin` ist nur für Benutzer mit passender Rolle erreichbar.

## Erweiterungsaufgaben

### Erweiterungsaufgabe 1: Logout-Funktion

**Ziel:** Du beendest aktive Sitzungen sauber.  

**Arbeitsauftrag:**  
- Erstelle eine Route `POST /logout`.
- Erlaube den Zugriff nur für eingeloggte Benutzer.
- Entferne das aktuelle Token aus deiner Sitzungs-/Token-Struktur.
- Teste anschließend, ob das zuvor gültige Token keinen Zugriff auf `GET /me` mehr erlaubt.

**Erwartetes Ergebnis / Soll-Zustand:**  
Nach dem Logout ist das Token ungültig und geschützte Routen sind damit nicht mehr erreichbar.

### Erweiterungsaufgabe 2: Einfacher Schutz gegen Brute-Force-Loginversuche

**Ziel:** Du reduzierst das Risiko wiederholter Loginversuche.  

**Arbeitsauftrag:**  
- Ergänze für `POST /login` einen einfachen In-Memory-Zähler für fehlgeschlagene Versuche pro E-Mail oder IP.
- Blockiere weitere Versuche für kurze Zeit, wenn ein Grenzwert überschritten wird, z. B. nach 5 Fehlversuchen.
- Gib bei Blockierung eine passende HTTP-Antwort zurück.
- Teste das Verhalten mit mehreren absichtlich falschen Logins.

**Erwartetes Ergebnis / Soll-Zustand:**  
Dein Login-Endpunkt reagiert auf wiederholte Fehlversuche und blockiert weitere Anfragen vorübergehend.

### Erweiterungsaufgabe 3: Eingabevalidierung und Passwortregeln

**Ziel:** Du verbesserst die Qualität und Sicherheit der Eingaben.  

**Arbeitsauftrag:**  
- Prüfe bei `POST /register`, ob:
  - `email` vorhanden ist und ein sinnvolles Format hat
  - `password` eine Mindestlänge erfüllt
- Ergänze mindestens zwei weitere Passwortregeln, z. B. Großbuchstabe, Zahl oder Sonderzeichen.
- Gib bei ungültigen Eingaben klare Fehlermeldungen zurück.
- Teste mehrere gültige und ungültige Fälle.

**Erwartetes Ergebnis / Soll-Zustand:**  
Deine API akzeptiert nur saubere Registrierungsdaten und weist unsichere oder unvollständige Eingaben kontrolliert zurück.

## Wichtige Hinweise

- Speichere Passwörter niemals im Klartext.
- Nutze für die Passwortprüfung immer den Vergleich über den Hash, nicht über direkte String-Vergleiche.
- Verwende für diese Übungsphase bewusst einfache In-Memory-Datenstrukturen. Ein Server-Neustart darf die Daten zurücksetzen.
- Teste jeden Endpunkt direkt nach dem Umsetzen.
- Achte auf sinnvolle HTTP-Statuscodes.
- Halte deine JSON-Antworten konsistent.
- Wenn du schneller fertig bist, bearbeite zuerst die Erweiterungsaufgaben.

## Reflexionsfragen

- Woran erkennst du in deinem Projekt den Unterschied zwischen Authentifizierung und Autorisierung?
- Welche Risiken entstehen, wenn du Passwörter im Klartext speicherst?
- Warum ist ein Hash für Passwörter sinnvoll, auch wenn deine Benutzerdatenbank gestohlen wird?
- An welcher Stelle in deinem Backend schützt du den Zugriff auf geschützte Informationen?
- Welche Schwachstelle bleibt bestehen, wenn du zwar Hashing nutzt, aber keine Begrenzung für Loginversuche einbaust?

---