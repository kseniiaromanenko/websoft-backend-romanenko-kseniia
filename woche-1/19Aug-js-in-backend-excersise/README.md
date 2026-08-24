# Bestellstatus-Checker

## Aufgabe 1: Node-Skript fuer einen Bestellstatus-Check

In dieser Aufgabe wurde ein erstes Node.js-Skript erstellt.

### Was wurde gemacht?

- Es wurden zwei Dateien angelegt:
  - `app.js`
  - `data.js`
- In `data.js` wurde ein Array `orders` mit 4 Bestellungen erstellt.
- Jede Bestellung hat diese Eigenschaften:
  - `id`
  - `customerName`
  - `status`
  - `total`
- Die Bestelldaten wurden mit `module.exports` aus `data.js` exportiert.
- In `app.js` wurden die Daten mit `require("./data")` importiert.
- Beim Start des Skripts wird eine kurze Meldung ausgegeben.
- Danach werden alle Bestellungen im Terminal angezeigt.

### Start des Skripts

```bash
node app.js
```

### Was habe ich gelernt?

Ich habe gelernt, dass Node.js JavaScript-Dateien direkt im Terminal ausfuehren kann.
Außerdem habe ich verstanden, dass Dateien in Node.js eigene Module sind.
Damit app.js Daten aus data.js nutzen kann, muss data.js die Daten mit module.exports exportieren.
In app.js kann ich diese Daten dann mit require("./data") importieren.

## Aufgabe 2: Logik in Module aufteilen

In dieser Aufgabe wurde die Programmlogik auf mehrere Dateien verteilt.

### Was wurde gemacht?

- Es wurden zwei neue Dateien angelegt:
  - `orderService.js`
  - `formatter.js`
- In `orderService.js` wurde die Funktion `findOrderById` erstellt.
- Diese Funktion bekommt eine Bestell-ID und sucht die passende Bestellung im Array.
- Wenn eine Bestellung gefunden wird, gibt die Funktion diese Bestellung zurück.
- Wenn keine Bestellung gefunden wird, gibt die Funktion `undefined` zurück.
- In `formatter.js` wurde die Funktion `formatOrder` erstellt.
- Diese Funktion bekommt eine Bestellung und formatiert sie als gut lesbaren Text.
- In `app.js` wurden beide Module mit `require(...)` importiert.
- In `app.js` wird eine konkrete Bestellung über ihre ID gesucht.
- Wenn die Bestellung gefunden wird, wird sie formatiert im Terminal ausgegeben.
- Wenn keine Bestellung gefunden wird, erscheint eine passende Meldung.

### Was habe ich gelernt?

Ich habe gelernt, dass man Code in Node.js auf mehrere Module aufteilen kann.
`orderService.js` ist für die Suchlogik zuständig.
`formatter.js` ist für die Darstellung der Bestellung zuständig.
`app.js` verbindet die Module und steuert den Ablauf des Programms.
Dadurch bleibt der Code übersichtlicher und leichter wartbar.

### Debug-Notizen Aufgabe 3

Hilfreiche Logs:

1. "Gesuchte ID" zeigt, welche Bestell-ID gesucht wird.
2. "Ergebnis aus orderService" zeigt, was die Suchfunktion zurueckgibt.
3. "Bestellung wird formatiert" zeigt, wann die Ausgabe vorbereitet wird.

Beobachtung mit gueltiger ID:

Wenn die ID existiert, gibt orderService ein Bestellobjekt zurueck.
Danach wird die Bestellung mit formatOrder formatiert und im Terminal angezeigt.

Beobachtung mit ungueltiger ID:

Wenn die ID nicht existiert, gibt orderService undefined zurueck.
Dann wird keine Bestellung formatiert.
Stattdessen erscheint die Meldung, dass keine Bestellung mit dieser ID gefunden wurde.

Verwendeter Node-Befehl:

node --check app.js

Ergebnis:

Die Syntax von app.js wurde geprueft.
Wenn keine Ausgabe erscheint, bedeutet das, dass keine Syntaxfehler gefunden wurden.
