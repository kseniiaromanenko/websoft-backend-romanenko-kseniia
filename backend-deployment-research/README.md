# Backend-Deployment: Recherche (Teil 1–3)

## Weitere Dokumente

- [Deployment-Blueprint](deployment-blueprint.md) – Schritt-für-Schritt-Anleitung für Render und MongoDB Atlas.
- [Pre-Deployment-Checkliste](pre-deployment-checklist.md) – Sicherheits-, Datenbank- und Production-Prüfungen vor dem Deployment.
- [Kurze Zusammenfassung](deployment-summary-de.md) – die wichtigsten Schritte und Punkte auf einen Blick.

# Teil 1: Deployment-Konzepte und Grundlagen

## 1. Was ist Deployment?

Deployment bedeutet, dass eine fertige Anwendung aus der lokalen Entwicklungsumgebung auf einen öffentlich erreichbaren Server übertragen und dort gestartet wird.

Bei einem Backend werden zum Beispiel der Express-Server, die benötigten Pakete und die Konfiguration auf einer Hosting-Plattform bereitgestellt. Die Datenbank kann auf einem eigenen Datenbankdienst laufen.

Deployment ist für eine Anwendung in der Produktion wichtig, weil:

- andere Personen die API über das Internet erreichen können;
- der Server dauerhaft und zuverlässig laufen soll;
- Updates kontrolliert veröffentlicht werden können;
- Fehler, Logs und die Auslastung überwacht werden können;
- Geheimnisse wie Datenbankzugänge sicher als Umgebungsvariablen gespeichert werden können.

Kurz gesagt: Beim Entwickeln läuft die Anwendung nur bei mir. Nach dem Deployment kann sie von echten Nutzerinnen und Nutzern verwendet werden.

## 2. Was passiert während des Deployment-Prozesses?

Der Prozess kann je nach Plattform etwas unterschiedlich sein. Typischerweise passiert Folgendes:

1. Ich pushe meinen aktuellen Code in ein GitHub-Repository.
2. Die Hosting-Plattform erkennt den neuen Push, weil sie mit dem Repository verbunden ist.
3. Die Plattform lädt den Code aus GitHub herunter.
4. Sie installiert die benötigten Pakete, zum Beispiel mit `npm install`.
5. Falls nötig, führt sie einen Build aus, generiert den Prisma Client und wendet Datenbankmigrationen an.
6. Die Plattform liest die dort sicher gespeicherten Umgebungsvariablen, zum Beispiel `DATABASE_URL`.
7. Sie startet die Anwendung, zum Beispiel mit `npm start`.
8. Die Plattform stellt eine öffentliche URL und HTTPS zur Verfügung.
9. Eine Anfrage an diese URL wird an den Express-Server weitergeleitet.
10. Der Server verarbeitet die Anfrage, greift bei Bedarf auf die Datenbank zu und sendet eine Antwort zurück.

Wenn ein Schritt fehlschlägt, wird das Deployment normalerweise abgebrochen. In den Logs kann ich dann sehen, wo der Fehler aufgetreten ist.

## 3. Warum ist localhost nicht für echte Nutzer geeignet?

`localhost` bezeichnet immer den Computer, auf dem eine Anwendung gerade geöffnet wird. Wenn ich meine API unter `localhost:3000` starte, ist sie normalerweise nur auf meinem eigenen Computer erreichbar. Auf dem Computer einer anderen Person würde `localhost:3000` auf deren eigenen Computer zeigen und nicht auf meinen Server.

Auch den eigenen Computer rund um die Uhr als Server laufen zu lassen, ist keine gute Lösung:

- Bei einem Neustart, Strom- oder Internetausfall ist die Anwendung nicht erreichbar.
- Die private Internetverbindung und der Computer sind nicht für viele gleichzeitige Anfragen ausgelegt.
- Eine sichere öffentliche Erreichbarkeit mit Domain, HTTPS, Firewall und festen Netzwerkeinstellungen ist aufwendiger.
- Der Computer müsste ständig eingeschaltet bleiben und würde Strom verbrauchen.
- Wartung, Backups, Überwachung und automatische Neustarts müssten selbst eingerichtet werden.
- Ein öffentlich erreichbarer privater Computer kann zusätzliche Sicherheitsrisiken verursachen.

Eine Hosting-Plattform stellt dafür eine stabilere und sicherere Infrastruktur bereit.

## 4. Warum werden Server und Datenbank getrennt gehostet?

In der Produktion werden der Express-Server und die Datenbank häufig auf getrennten verwalteten Diensten betrieben. Dadurch hat jeder Dienst eine klare Aufgabe: Der Anwendungsserver bearbeitet HTTP-Anfragen, während der Datenbankdienst Daten sicher speichert und verwaltet.

Die Trennung hat mehrere Vorteile:

- **Unabhängige Skalierung:** Wenn die API viele Anfragen erhält, können weitere App-Instanzen gestartet werden, ohne die Datenbank umzuziehen.
- **Mehr Sicherheit:** Die Datenbank muss nicht direkt öffentlich erreichbar sein. Nur die Anwendung erhält über einen geschützten Verbindungsstring Zugriff.
- **Backups und Updates:** Ein verwalteter Datenbankdienst kann automatische Backups, Sicherheitsupdates und Wiederherstellungsmöglichkeiten anbieten.
- **Bessere Stabilität:** Ein Absturz oder ein neues Deployment des Express-Servers beendet nicht automatisch auch die Datenbank.
- **Einfachere Wartung:** Hosting-Anbieter überwachen ihre jeweiligen Dienste und stellen passende Werkzeuge und Logs bereit.
- **Flexible Auswahl:** Für Anwendung und Datenbank kann jeweils ein Dienst gewählt werden, der am besten zu den Anforderungen passt.

Wenn Server und Datenbank auf derselben Maschine laufen, teilen sie sich CPU, RAM und Speicherplatz. Verbraucht ein Teil zu viele Ressourcen oder fällt die Maschine aus, sind beide Teile gleichzeitig betroffen. Für kleine lokale Projekte ist eine gemeinsame Umgebung praktisch, in der Produktion ist die Trennung jedoch meistens zuverlässiger.

## Der vollständige Weg zur Production-Anwendung

Für Einsteiger lässt sich Deployment in sieben Phasen einteilen:

1. **Anwendung vorbereiten:** Die App startet mit einem eindeutigen Befehl, verwendet `process.env.PORT` und liest Konfiguration aus Umgebungsvariablen.
2. **Qualität prüfen:** Tests, Linter und ein lokaler Production-Start werden ausgeführt. Die Node.js-Version wird festgelegt.
3. **Production-Ressourcen erstellen:** Eine entfernte Datenbank, ein eingeschränkter Datenbankbenutzer und sichere Zugangsdaten werden eingerichtet.
4. **Code bereitstellen:** Geprüfter Code wird nach GitHub gepusht. Secrets und `node_modules` werden nicht hochgeladen.
5. **Build und Release:** Die Plattform installiert Abhängigkeiten, baut die App, führt nötige Migrationen aus und startet eine neue Instanz.
6. **Freigabe prüfen:** Ein Health Check bestätigt, dass Server und wichtige Abhängigkeiten funktionieren. Erst dann erhält die neue Version Traffic.
7. **Betrieb:** HTTPS, API, Datenbank, Logs, Limits, Backups und Kosten werden überwacht. Bei Fehlern erfolgt Rollback oder Wiederherstellung.

Deployment ist nicht nur „Code auf einen Server kopieren“, sondern ein wiederholbarer Prozess vom geprüften Code bis zum überwachten und wiederherstellbaren Betrieb.

---

# Teil 2: Plattformüberblick und Optionen für Lernende

> **Stand: 29. September 2026.** Preise und Limits können sich ändern. Vor dem Deployment sollte die aktuelle Preisseite geprüft werden.

## 1. Plattformen für Backend-Anwendungen

### Render

Render baut eine Node.js-/Express-App direkt aus GitHub und kann sie nach jedem Push automatisch neu deployen.

Der kostenlose Web Service bietet:

- 0,1 CPU und 512 MB RAM;
- 750 Instanzstunden pro Workspace und Monat;
- eine öffentliche HTTPS-URL und Auto-Deploy aus GitHub;
- Sleep-Modus nach 15 Minuten ohne Request;
- 5 GB ausgehenden Datentransfer im Hobby-Workspace.

Nach der Ruhephase dauert der erste Request wegen des Cold Starts länger. Sind die 750 Stunden verbraucht, werden kostenlose Web Services bis zum nächsten Monat angehalten.

Der kleinste kostenpflichtige Web Service mit 512 MB RAM kostet aktuell **7 US-Dollar pro Monat**. Zusätzlicher öffentlicher Traffic kostet **0,15 US-Dollar pro GB**.

Offizielle Quellen:

- [Render: kostenlose Dienste und Limits](https://render.com/docs/free)
- [Render: Compute Plans](https://render.com/docs/compute-plans)
- [Render: Preise](https://render.com/pricing)
- [Render: ausgehender Datentransfer](https://render.com/docs/outbound-bandwidth)
- [Render: Express-App aus GitHub deployen](https://render.com/docs/deploy-node-express-app) – GitHub verbinden, Build- und Startbefehl festlegen und Auto-Deploy verwenden.
- [Render: Web Services und PORT](https://render.com/docs/web-services) – öffentliche URL, HTTPS und Bindung an `process.env.PORT`.

### Koyeb

Koyeb stellt Node.js-Anwendungen aus GitHub oder einem Docker-Image bereit.

Die kostenlose Instanz bietet:

- 0,1 vCPU, 512 MB RAM und 2 GB SSD;
- eine kostenlose Instanz pro Organisation;
- eine begrenzte Auswahl von Regionen;
- Scale-to-zero nach einer Stunde ohne Traffic.

Sie ist für Tests und Hobbyprojekte gedacht. Worker Services, Volumes und eigene Skalierung sind damit nicht möglich.

Die bezahlte Instanz `nano` kostet etwa **2,68 US-Dollar pro Monat**, `micro` mit 512 MB RAM etwa **5,36 US-Dollar pro Monat**. Die Abrechnung erfolgt sekundengenau. Der Starter-Plan verlangt eine gültige Zahlungsmethode. Der kleinste Billing Alert liegt bei 5 US-Dollar.

Offizielle Quellen:

- [Koyeb: Instanzen, Ressourcen und Preise](https://www.koyeb.com/docs/reference/instances)
- [Koyeb: Tarife und Billing Alerts](https://www.koyeb.com/docs/reference/organizations)
- [Koyeb: Express-App deployen](https://www.koyeb.com/docs/deploy/express) – vollständige Anleitung für GitHub, Buildpack oder Docker und die öffentliche URL.

## 2. Database-as-a-Service-Anbieter

### MongoDB Atlas mit Mongoose

Der kostenlose M0-Cluster bietet:

- dauerhaft 0 US-Dollar;
- 512 MB Speicher für Daten und Indizes;
- gemeinsam genutzte CPU und RAM;
- bis zu 100 Operationen pro Sekunde;
- einen kostenlosen Cluster pro Projekt;
- keine produktionsgerechte Backup-Funktion.

Der Flex-Tarif beginnt aktuell bei **0,011 US-Dollar pro Stunde** und ist auf **30 US-Dollar pro Monat** begrenzt. Er bietet bis zu 5 GB Speicher. Ein Dedicated Cluster beginnt bei ungefähr **56,94 US-Dollar pro Monat**. Region, Speicher, Backups und Traffic beeinflussen den Endpreis.

Offizielle Quellen:

- [MongoDB Atlas: Preise](https://www.mongodb.com/pricing)
- [MongoDB Atlas: Vergleich der Cluster-Tarife](https://www.mongodb.com/docs/atlas/manage-clusters/)
- [MongoDB Atlas: kostenlosen Cluster erstellen](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/)
- [MongoDB Atlas: Cluster mit einer Anwendung verbinden](https://www.mongodb.com/docs/atlas/connect-to-database-deployment/) – Database User, IP Access List und Verbindungs-URI.
- [MongoDB: JavaScript, Node.js und Mongoose](https://www.mongodb.com/docs/languages/javascript/) – offizielle Übersicht der JavaScript-Treiber und Mongoose-Integration.

### Neon Postgres mit Prisma

Neon ist ein verwalteter PostgreSQL-Dienst. Der Free-Plan bietet pro Projekt:

- 0,5 GB Speicher;
- 50 CU-Stunden Rechenzeit pro Monat;
- 5 GB ausgehenden Datentransfer;
- bis zu 10 Projekte und 10 Branches pro Projekt;
- Autoscaling bis 2 CU;
- Scale-to-zero nach fünf Minuten Inaktivität.

Der Launch-Tarif wird ohne feste monatliche Mindestgebühr nach Nutzung berechnet. Compute-Zeit, Speicher und zusätzliche Branch-Zeit werden getrennt abgerechnet. Vor einem Upgrade sollte ich die aktuelle Preisseite prüfen und ein Ausgabenlimit einrichten.

Offizielle Quellen:

- [Neon: Preise](https://neon.com/pricing)
- [Neon: nutzungsbasiertes Preismodell](https://neon.com/blog/new-usage-based-pricing)
- [Neon: Compute, Scale-to-zero und Verbindungen](https://neon.com/docs/manage/endpoints/)
- [Neon: Prisma mit einer gepoolten Verbindung](https://neon.com/blog/better-postgres-with-prisma-experience) – `DATABASE_URL`, Prisma und PgBouncer-Verbindung.
- [Prisma: Datenbankverbindungen richtig verwalten](https://docs.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections) – Wiederverwendung von `PrismaClient` und Connection Pooling.

## 3. Kostenvergleich und sichere Auswahl

| Dienst        | Kostenlos geeignet für          | Danach                                                | Kostenrisiko                                                              |
| ------------- | ------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------- |
| Render        | kleine Express-API              | Stopp nach Gratisstunden; Paid Compute ab 7 USD/Monat | niedrig ohne Zahlungsmethode; mit Karte kann Mehrnutzung berechnet werden |
| Koyeb         | eine kleine Express-API         | sekundengenau bezahlte Instanzen                      | höher, weil eine Zahlungsmethode verlangt wird                            |
| MongoDB Atlas | kleine MongoDB mit Mongoose     | bewusstes Upgrade auf Flex oder Dedicated             | niedrig, solange nur M0 verwendet wird                                    |
| Neon          | kleine PostgreSQL-DB mit Prisma | nutzungsbasierter Paid-Plan                           | niedrig im Free-Plan; nach Upgrade Nutzung überwachen                     |

Für Lernende ist **Render Free mit MongoDB Atlas M0** eine sichere und verständliche Kombination. Ohne Zahlungsmethode hält Render Dienste an, bevor kostenpflichtige Mehrnutzung entsteht. Atlas M0 bleibt kostenlos, solange kein bezahlter Cluster gewählt wird. Für PostgreSQL ist **Render Free mit Neon Free** eine gute Alternative.

So vermeide ich unerwartete Kosten:

- keine Kreditkarte hinterlegen, wenn sie nicht erforderlich ist;
- nur Ressourcen mit der Kennzeichnung **Free** oder **M0** erstellen;
- kein kostenpflichtiges Auto-Scaling aktivieren;
- Billing Alerts und ein niedriges Ausgabenlimit einrichten;
- das Billing-Dashboard regelmäßig kontrollieren;
- ungenutzte kostenpflichtige Ressourcen löschen;
- vor jedem Upgrade die aktuelle Preisseite lesen.

---

# Teil 3: Limits kostenloser Tarife einfach erklärt

## 1. RAM- und Speicherlimits

RAM ist der schnelle Arbeitsspeicher der laufenden App. Darin liegen Code, Datenbankergebnisse und gerade bearbeitete Requests.

Bei 512 MB müssen alle Prozesse zusammen in diesen Speicher passen. Braucht die App mehr RAM, wird sie langsam oder beendet. Nutzer sehen dann lange Antwortzeiten, Fehler oder eine nicht erreichbare API. Ich spare RAM, indem ich Daten seitenweise lade, keine großen Dateien im Speicher halte und unnötige Pakete vermeide.

## 2. Cold Starts, Ruhephasen und Inaktivitäts-Timeouts

Kostenlose Dienste werden bei Inaktivität oft angehalten: Render nach 15 Minuten, Koyeb nach einer Stunde und Neon-Compute nach fünf Minuten.

Bei der nächsten Anfrage startet der Dienst neu. Das ist ein **Cold Start**. Der erste Request dauert länger oder läuft bei einem kurzen Timeout in einen Fehler. Danach ist der Dienst wieder schneller. Für Lernprojekte ist das meist akzeptabel, für eine produktive API oft nicht.

## 3. Rechenstunden und CPU-Kontingente

Rechenstunden messen, wie lange ein Dienst aktiv ist. 750 Stunden reichen ungefähr für eine Instanz während eines Monats. Zwei gleichzeitig laufende Instanzen verbrauchen sie etwa doppelt so schnell.

CPU bestimmt, wie schnell Berechnungen laufen. Eine kleine geteilte CPU reicht für einfache Projekte, wird aber bei vielen Requests langsam.

Ist das Kontingent verbraucht, stoppt der Anbieter den Free Service bis zum nächsten Monat oder berechnet bei einem bezahlten Konto die weitere Nutzung. Nutzer erhalten dann langsame Antworten oder erreichen die App nicht.

## 4. Datenbankspeicher und aktive Verbindungen

### Speicherplatz

Datenbankspeicher enthält Daten und Indizes. Atlas M0 erlaubt insgesamt 512 MB, Neon Free 0,5 GB pro Projekt.

Bei einem harten Limit schlagen neue Datensätze oder Änderungen fehl. Die API kann einen Serverfehler liefern. Dann muss ich Daten löschen, Indizes optimieren oder den Tarif wechseln. Siehe [MongoDB-Dokumentation zum Speicherlimit](https://www.mongodb.com/docs/atlas/reference/faq/storage/).

### Aktive Verbindungen

Eine Datenbankverbindung ist ein offener Kanal zwischen App und Datenbank. Jede Verbindung braucht Ressourcen, deshalb gibt es ein Maximum.

ORMs und ODMs verwenden einen **Connection Pool**: Verbindungen werden wiederverwendet, statt für jeden Request neu aufgebaut zu werden.

- **Mongoose:** Eine Verbindung besitzt einen Pool; `maxPoolSize` ist standardmäßig 100. Bei einem kleinen Cluster sollte der Pool bei Bedarf kleiner eingestellt und dieselbe Verbindung wiederverwendet werden. [Mongoose-Dokumentation](https://mongoosejs.com/docs/api.html#mongoose_Mongoose-createConnection)
- **Prisma:** Jede `PrismaClient`-Instanz kann einen eigenen Pool haben. Viele Clients oder Serverless-Instanzen können das DB-Limit schnell ausschöpfen. Deshalb sollte `PrismaClient` einmal erstellt und wiederverwendet werden. Für Serverless hilft ein Pooler wie PgBouncer beziehungsweise die gepoolte Neon-URL. [Prisma-Dokumentation](https://docs.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections)

Beim Erreichen des Limits warten neue Anfragen oder erhalten „too many connections“. Die API wird langsam oder unerreichbar.

## 5. Ausgehender Datentransfer und Bandbreite

Ausgehender Datentransfer sind Daten, die ein Dienst sendet, zum Beispiel JSON-Antworten, Bilder und Downloads.

Bei 5 GB im Monat werden alle gesendeten Daten addiert. Große Antworten und viele Requests verbrauchen das Volumen schnell. Danach kann der Anbieter:

- den Dienst ohne Zahlungsmethode bis zum nächsten Monat anhalten;
- mit hinterlegter Zahlungsmethode zusätzlichen Traffic berechnen;
- die weitere Nutzung einschränken.

Render enthält aktuell 5 GB im Hobby-Workspace; zusätzlicher öffentlicher Traffic kostet 0,15 US-Dollar pro GB. Pagination, kleine JSON-Antworten, Komprimierung und Objektspeicher für große Dateien sparen Bandbreite.

## Zusammenfassung

Kostenlose Tarife eignen sich gut zum Lernen, haben aber kleine Ressourcen und Ruhephasen. Werden Limits erreicht, wird die App langsam, liefert Fehler oder wird angehalten. Deshalb sollte ich die Nutzung beobachten, Datenbankverbindungen wiederverwenden und vor dem Hinterlegen einer Zahlungsmethode prüfen, welche Mehrnutzung automatisch berechnet wird.
