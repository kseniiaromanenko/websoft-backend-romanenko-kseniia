# Aktuelle API-Endpunkte

http://localhost:3000/api/auth/me
http://localhost:3000/auth.html
http://localhost:3000/api/orders
http://localhost:3000/order-test.html
http://localhost:3000/admin-orders.html
http://localhost:3000/admin-products.html
http://localhost:3000/my-orders.html
http://localhost:3000/index.html
http://localhost:3000/api/gibt-es-nicht

## Health Check

- **GET `/api/health`**  
  Prüft, ob der Express-Server läuft.  
  Antwort: `{ "status": "ok" }`

## Authentifizierung

- **GET `/api/auth/me`** 🔒  
  Gibt den aktuellen angemeldeten Benutzer zurück.  
  Erstellt oder aktualisiert auch das lokale User-Profil in PostgreSQL.

## Kategorien

- **GET `/api/categories`**  
  Gibt alle Kategorien zurück.

- **POST `/api/categories`** 🔒 ADMIN  
  Erstellt eine neue Kategorie.

- **PATCH `/api/categories/:id`** 🔒 ADMIN  
  Ändert den Namen einer Kategorie.

- **DELETE `/api/categories/:id`** 🔒 ADMIN  
  Löscht eine Kategorie, wenn sie keine Produkte enthält.

## Produkte

- **GET `/api/products`**  
  Gibt alle Produkte mit ihrer Kategorie zurück.

- **GET `/api/products?categoryId=1`**  
  Gibt nur Produkte einer bestimmten Kategorie zurück.

- **GET `/api/products/:id`**  
  Gibt ein einzelnes Produkt mit seiner Kategorie zurück.

- **POST `/api/products`** 🔒 ADMIN  
  Erstellt ein neues Produkt.

- **PATCH `/api/products/:id`** 🔒 ADMIN  
  Ändert ein Produkt.

- **DELETE `/api/products/:id`** 🔒 ADMIN  
  Löscht ein Produkt.

## Bestellungen

- **POST `/api/orders`** 🔒  
  Erstellt eine Bestellung für den aktuellen angemeldeten Benutzer.  
  Das Backend prüft Warenkorb, Produkt-ID und Menge.  
  Der Preis wird aus PostgreSQL gelesen und der Gesamtpreis wird im Backend berechnet.

- **GET `/api/orders/my`** 🔒  
  Gibt nur die Bestellungen des aktuellen angemeldeten Benutzers zurück.

## Bedeutung der Symbole

- **🔒** = Der Benutzer muss bei Clerk angemeldet sein.
- **ADMIN** = Nur `ADMIN` und `SUPER_ADMIN` dürfen diesen Endpoint benutzen.
- Ohne Anmeldung gibt das Backend **401 Nicht autorisiert** zurück.
- Ohne passende Rolle gibt das Backend **403 Keine Berechtigung** zurück.
