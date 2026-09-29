# Deployment-Blueprint: Express und MongoDB

## Gewählter Stack

- **Anwendungshost:** Render
- **Datenbankhost:** MongoDB Atlas
- **Backend:** Node.js mit Express
- **Datenbankzugriff:** Mongoose
- **Code-Repository:** GitHub

In diesem Beispiel wird die Express-Anwendung auf Render ausgeführt. Die MongoDB-Datenbank läuft getrennt davon bei MongoDB Atlas.

## Dokumentation der gewählten Hosting-Dienste

### Render – Hosting des Backends

- [Node.js- und Express-App auf Render deployen](https://render.com/docs/deploy-node-express-app) – vollständiges Render-Tutorial vom GitHub-Repository bis zur öffentlichen URL.
- [Web Services auf Render](https://render.com/docs/web-services) – allgemeine Einrichtung eines Web Service, HTTPS, öffentliche URL und Verwendung von `process.env.PORT`.
- [Deployments und Auto-Deploy](https://render.com/docs/deploys) – automatische Deployments nach einem Push und Verwaltung der Deployments.
- [Umgebungsvariablen und Secrets](https://render.com/docs/configure-environment-variables) – sichere Einrichtung von `MONGODB_URI`, `JWT_SECRET` und anderen geheimen Werten.

### MongoDB Atlas – Hosting der Datenbank

- [Kostenlosen Atlas-Cluster erstellen](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/) – Schritt-für-Schritt-Anleitung zum Erstellen einer kostenlosen Datenbank.
- [Cluster erstellen und verbinden](https://www.mongodb.com/docs/atlas/create-connect-deployments/) – Übersicht über den vollständigen Ablauf von der Erstellung bis zur Verbindung.
- [Datenbankbenutzer konfigurieren](https://www.mongodb.com/docs/atlas/security-add-mongodb-users/) – Benutzer, Passwort und Zugriffsrechte einrichten.
- [IP Access List konfigurieren](https://www.mongodb.com/docs/atlas/security/add-ip-address-to-list/) – Netzwerkzugriff für die Anwendung erlauben.
- [Anwendung mit einem Atlas-Cluster verbinden](https://www.mongodb.com/docs/atlas/driver-connection/) – Verbindungs-URI für Node.js abrufen und verwenden.

Die folgenden Schritte fassen diese offiziellen Anleitungen für den gewählten Express-/Mongoose-Stack zusammen.

## Voraussetzungen

Vor dem Deployment benötige ich:

- ein Konto bei GitHub, Render und MongoDB Atlas;
- ein Node.js-Projekt mit einer `package.json`;
- ein GitHub-Repository mit meinem Projekt;
- eine `.gitignore`, in der mindestens `.env` und `node_modules/` stehen;
- ein Startskript in der `package.json`.

Beispiel für das Startskript:

```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

`server.js` muss durch den tatsächlichen Namen der Startdatei ersetzt werden.

Die Anwendung darf nicht nur einen festen lokalen Port verwenden. Render stellt den Port über die Umgebungsvariable `PORT` bereit:

```js
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
```

Auch die Datenbankverbindung muss aus einer Umgebungsvariable gelesen werden:

```js
import mongoose from "mongoose";

await mongoose.connect(process.env.MONGODB_URI);
```

Die geheime URI darf nicht direkt im Code stehen.

### Node.js-Version festlegen

Damit lokal und auf Render dieselbe Laufzeit verwendet wird, lege ich eine getestete Node.js-Version mit oberer Grenze fest:

```json
{
  "engines": {
    "node": ">=22 <23"
  }
}
```

[Render: Node.js-Version festlegen](https://render.com/docs/node-version)

### Umgebungen trennen

Ich verwende getrennte Konfigurationen für **development**, **test** und **production**. Production nutzt eine eigene Datenbank und eigene Secrets. Tests dürfen niemals Production-Daten verändern.

## Schritt 1: MongoDB-Datenbank in Atlas erstellen

1. Ich melde mich bei [MongoDB Atlas](https://www.mongodb.com/atlas) an.
2. Ich erstelle ein neues Projekt oder öffne ein vorhandenes Projekt.
3. Unter **Database** erstelle ich einen neuen Cluster und wähle für ein Lernprojekt die kostenlose Option, falls sie angeboten wird.
4. Ich wähle eine Cloud-Region, die möglichst nahe bei der Region meines Render-Dienstes liegt.
5. Ich warte, bis der Cluster vollständig erstellt wurde.

## Schritt 2: Datenbankbenutzer anlegen

1. In Atlas öffne ich **Security → Database Access**.
2. Ich klicke auf **Add New Database User**.
3. Ich vergebe einen eigenen Benutzernamen und ein starkes, zufälliges Passwort.
4. Der Benutzer erhält nur die Rechte, die meine Anwendung wirklich benötigt. Für ein einfaches Lernprojekt sind Lese- und Schreibrechte für die Anwendungsdatenbank ausreichend.
5. Ich speichere das Passwort sicher. Es wird später Bestandteil der Verbindungs-URI.

Der Atlas-Datenbankbenutzer ist nicht dasselbe wie mein normales Atlas-Konto.

## Schritt 3: Netzwerkzugriff erlauben

Atlas akzeptiert nur Verbindungen aus seiner **IP Access List**.

1. Ich öffne **Security → Network Access**.
2. Wenn mein Hosting-Tarif feste ausgehende IP-Adressen bereitstellt, trage ich nur diese Adressen ein.
3. Falls für den verwendeten Render-Dienst keine feste Adresse zur Verfügung steht, kann für ein Lernprojekt vorübergehend `0.0.0.0/0` verwendet werden. Das erlaubt Verbindungen aus allen Netzen.
4. In diesem Fall schütze ich die Datenbank unbedingt mit einem starken Passwort und möglichst kleinen Benutzerrechten.

`0.0.0.0/0` macht die Datenbank nicht ohne Passwort zugänglich, erweitert aber die möglichen Verbindungsquellen. Für eine echte Produktionsanwendung ist eine möglichst enge Zugriffsliste sicherer.

## Schritt 4: Sichere Verbindungs-URI kopieren

1. Ich öffne meinen Cluster und klicke auf **Connect**.
2. Ich wähle **Drivers** und danach den Node.js-Treiber.
3. Atlas zeigt eine URI mit diesem Aufbau:

```text
mongodb+srv://<username>:<password>@<cluster-address>/<database-name>?retryWrites=true&w=majority
```

4. Ich ersetze `<username>`, `<password>` und `<database-name>` durch meine Werte.
5. Enthält das Passwort Sonderzeichen wie `@`, `:`, `/` oder `#`, müssen diese URL-codiert werden. Alternativ erzeuge ich ein starkes Passwort ohne problematische URI-Zeichen.
6. Ich speichere die fertige URI nicht in GitHub und veröffentliche sie auch nicht in Screenshots oder Logs.

Lokal kann sie in einer nicht eingecheckten `.env`-Datei stehen:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER/meine_datenbank?retryWrites=true&w=majority
```

## Schritt 5: Projekt für GitHub vorbereiten

Ich prüfe, dass `.gitignore` mindestens Folgendes enthält:

```gitignore
node_modules/
.env
.env.*
```

Danach committe und pushe ich das Projekt:

```bash
git add .
git commit -m "Prepare application for deployment"
git push origin main
```

Vor dem Push kontrolliere ich mit `git status`, dass `.env` nicht im Commit enthalten ist. Wurde ein echtes Geheimnis schon einmal veröffentlicht, reicht das spätere Löschen aus der Datei nicht aus: Das Passwort oder der Schlüssel muss ersetzt werden.

## Schritt 6: Web Service auf Render erstellen

1. Ich melde mich bei [Render](https://render.com/) an.
2. Im Dashboard wähle ich **New → Web Service**.
3. Ich verbinde mein GitHub-Konto mit Render.
4. Ich wähle das Repository und den Branch `main` aus.
5. Ich konfiguriere den Dienst:

   - **Language/Runtime:** Node
   - **Region:** möglichst nahe bei der Atlas-Region
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

6. Wenn sich das Backend in einem Unterordner des Repositorys befindet, trage ich diesen Ordner als **Root Directory** ein.
7. Ich wähle den für das Projekt passenden Tarif und prüfe vor der Bestätigung mögliche Kosten und Limits.

Wenn das Projekt TypeScript oder einen anderen Build-Schritt verwendet, kann der Build-Befehl zum Beispiel `npm ci && npm run build` lauten. Der Startbefehl muss dann die erstellte JavaScript-Datei ausführen. Die konkreten Befehle müssen zu den Skripten in der eigenen `package.json` passen.

## Schritt 7: Umgebungsvariablen sicher einrichten

Im Render-Dienst öffne ich **Environment** und füge die benötigten Werte hinzu:

```text
MONGODB_URI = vollständige Atlas-Verbindungs-URI
NODE_ENV    = production
```

Weitere Geheimnisse, zum Beispiel `JWT_SECRET`, werden auf dieselbe Weise eingetragen. Ich speichere die Änderungen und starte damit ein neues Deployment.

Eine eigene Variable `PORT` muss normalerweise nicht gesetzt werden, weil Render sie bereitstellt. Die Anwendung muss aber `process.env.PORT` verwenden.

## Schritt 8: Erstes Deployment prüfen

Render lädt nun den Code, installiert die Pakete und führt `npm start` aus. Unter **Logs** kontrolliere ich:

- ob die Abhängigkeiten ohne Fehler installiert wurden;
- ob der Express-Server gestartet wurde;
- ob die Verbindung zu MongoDB erfolgreich ist;
- ob keine Geheimnisse vollständig ausgegeben werden.

Nach einem erfolgreichen Deployment zeigt Render eine öffentliche HTTPS-URL, zum Beispiel:

```text
https://mein-backend.onrender.com
```

## Öffentliche URL, eigene Domain und HTTPS

Für diese Aufgabe reicht die kostenlose `onrender.com`-Adresse aus. Eine eigene Domain ist optional und muss nicht gekauft werden.

Wenn ich später eine eigene Domain wie `api.meine-domain.de` verwenden möchte:

1. Ich kaufe die Domain bei einem Domain-Anbieter.
2. Unter **Render → Settings → Custom Domains** füge ich die Domain hinzu.
3. Render zeigt mir, welchen DNS-Eintrag ich beim Domain-Anbieter setzen muss.
4. Ich warte auf die DNS-Übernahme und die Verifizierung bei Render.
5. Ich teste `https://api.meine-domain.de` im Browser oder mit `curl`.
6. Ich aktualisiere die API-URL im Frontend und die erlaubte Frontend-Origin in CORS.

Render stellt für `onrender.com` und verifizierte eigene Domains automatisch ein kostenloses TLS-Zertifikat bereit und erneuert es. HTTP-Anfragen werden automatisch zu HTTPS weitergeleitet. HTTPS schützt Daten während der Übertragung, ersetzt aber nicht Anmeldung, Rechteprüfung oder sichere Secrets.

Offizielle Dokumentation:

- [Render: Web Services und öffentliche URLs](https://render.com/docs/web-services)
- [Render: verwaltete TLS-Zertifikate und HTTPS](https://render.com/docs/tls)

## Weitere wichtige Punkte für den Betrieb

- **Health Check:** Ich stelle `GET /health` bereit und trage `/health` unter **Settings → Health Check Path** ein. [Render: Health Checks](https://render.com/docs/health-checks)
- **Rollback:** Unter **Deploys** kann ich zu einem früheren erfolgreichen Deployment zurückkehren. Ein Code-Rollback ersetzt kein Datenbank-Backup. [Render: Rollbacks](https://render.com/docs/rollbacks)
- **Datenbank-Backup:** Vor riskanten Schema- oder Datenänderungen sichere ich die Daten und teste die Wiederherstellung.
- **Keine dauerhaften Dateien lokal speichern:** Das Dateisystem eines kostenlosen Render Web Service ist flüchtig. Uploads oder SQLite-Daten können nach Sleep, Neustart oder Deployment verschwinden. Dauerhafte Dateien gehören in einen Objektspeicher. [Render: Free-Tarif](https://render.com/docs/free)
- **Monitoring:** Nach dem Deployment prüfe ich Logs sowie RAM-, CPU-, Traffic- und Datenbanklimits.
- **Secrets wechseln:** Veröffentlichte oder nicht mehr benötigte Passwörter und Tokens werden widerrufen und ersetzt.

## Schritt 9: Lesen und Schreiben testen

Zuerst teste ich einen einfachen Endpunkt:

```bash
curl https://mein-backend.onrender.com/health
```

Danach teste ich einen schreibenden Endpunkt. Das genaue JSON hängt von meiner API ab:

```bash
curl -X POST https://mein-backend.onrender.com/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Deployment-Test"}'
```

Anschließend prüfe ich mit einem GET-Request, ob der gespeicherte Datensatz gelesen werden kann:

```bash
curl https://mein-backend.onrender.com/api/items
```

Der Test ist erfolgreich, wenn:

- der POST-Request einen passenden Erfolgsstatus wie `201 Created` liefert;
- der neue Datensatz in Atlas unter **Browse Collections** sichtbar ist;
- der GET-Request denselben Datensatz zurückgibt;
- in den Render-Logs keine Datenbank- oder Serverfehler erscheinen.

Damit wurde geprüft, dass die öffentliche Anwendung sowohl in die entfernte Datenbank schreiben als auch daraus lesen kann.

## Schritt 10: Automatische Deployments testen

Render aktiviert für einen verbundenen Git-Branch normalerweise automatische Deployments.

1. Unter **Settings → Auto-Deploy** prüfe ich, dass **On Commit** aktiviert ist.
2. Ich ändere zum Testen eine kleine, ungefährliche Stelle im Projekt.
3. Ich committe und pushe die Änderung nach `main`.
4. Unter **Deploys** kontrolliere ich, ob Render automatisch ein neues Deployment startet.
5. Nach dem erfolgreichen Deployment teste ich die öffentliche URL erneut.

Wenn ein Build fehlschlägt, lese ich die Build- und Runtime-Logs. Die vorher erfolgreich bereitgestellte Version soll erreichbar bleiben, bis ein neues Deployment erfolgreich ist.

### Tests vor dem automatischen Deployment

Für ein Lernprojekt reicht **On Commit**. Sicherer ist **After CI Checks Pass**: GitHub Actions führt zuerst Tests und Linting aus; Render deployt nur nach erfolgreichen Checks.

- [Render: Auto-Deploy und CI Checks](https://render.com/docs/deploys)
- [GitHub: Node.js mit GitHub Actions testen](https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs)

### Graceful Shutdown

Beim Austausch einer Instanz sendet Render `SIGTERM`. Die App sollte neue Requests stoppen, laufende Requests beenden und die Datenbankverbindung schließen:

```js
const server = app.listen(PORT, "0.0.0.0");

process.on("SIGTERM", () => {
  server.close(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
});
```

[Render: Graceful Shutdown](https://render.com/docs/deploys#graceful-shutdown)

## Kurze Abschluss-Checkliste

- [ ] `.env` und `node_modules/` stehen in `.gitignore`.
- [ ] Der Code verwendet `process.env.PORT`.
- [ ] Der Code verwendet `process.env.MONGODB_URI`.
- [ ] Ein Atlas-Datenbankbenutzer mit begrenzten Rechten wurde angelegt.
- [ ] Die Atlas IP Access List ist konfiguriert.
- [ ] `MONGODB_URI` und andere Geheimnisse sind nur bei Render gespeichert.
- [ ] Build- und Startbefehl passen zur `package.json`.
- [ ] Die getestete Node.js-Version ist festgelegt.
- [ ] Development, Test und Production verwenden getrennte Konfigurationen und Datenbanken.
- [ ] Das GitHub-Repository und der richtige Branch sind verbunden.
- [ ] Auto-Deploy ist aktiviert.
- [ ] GET- und POST-Anfragen funktionieren über die öffentliche URL.
- [ ] Der Datensatz ist in Atlas sichtbar.
- [ ] Die Render-Logs enthalten keine Fehler und keine ausgegebenen Geheimnisse.
- [ ] Die öffentliche URL verwendet HTTPS; eine eigene Domain ist nur bei Bedarf konfiguriert.
- [ ] CORS enthält die echte Frontend-Origin.
- [ ] `/health` ist als Health Check Path eingerichtet.
- [ ] Der Ablauf für Rollback und Datenbank-Wiederherstellung ist bekannt.
- [ ] Dauerhafte Daten werden nicht im flüchtigen lokalen Dateisystem gespeichert.
- [ ] Tests laufen vor dem Deployment; bei CI ist **After CI Checks Pass** aktiviert.
- [ ] Die Anwendung behandelt `SIGTERM` und schließt Server und Datenbank sauber.

