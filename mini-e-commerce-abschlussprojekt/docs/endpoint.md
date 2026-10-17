# API-Endpunkte und Beispiele

## Base URLs

Lokal:

```text
http://localhost:3000
```

Live:

```text
https://websoft-backend-romanenko-kseniia-1.onrender.com
```

## Authentication und Rollen

Öffentliche Endpunkte benötigen keinen Login.

Geschützte Endpunkte benötigen eine gültige Clerk-Session beziehungsweise
einen Bearer-Token:

```http
Authorization: Bearer <Clerk-JWT>
```

ADMIN-Endpunkte dürfen nur von Benutzer:innen mit der Rolle `ADMIN` oder
`SUPER_ADMIN` verwendet werden.

## Endpunktübersicht

| Methode | Endpoint | Zugriff | Zweck |
| ------- | -------- | ------- | ----- |
| GET | `/api/health` | öffentlich | Serverstatus prüfen |
| GET | `/api/auth/me` | angemeldet | Aktuelles lokales Benutzerprofil abrufen |
| GET | `/api/categories` | öffentlich | Kategorien abrufen |
| POST | `/api/categories` | ADMIN | Kategorie erstellen |
| PATCH | `/api/categories/:id` | ADMIN | Kategorie ändern |
| DELETE | `/api/categories/:id` | ADMIN | Kategorie löschen |
| GET | `/api/products` | öffentlich | Produkte abrufen |
| GET | `/api/products?categoryId=1` | öffentlich | Produkte nach Kategorie filtern |
| GET | `/api/products/:id` | öffentlich | Einzelnes Produkt abrufen |
| POST | `/api/products` | ADMIN | Produkt erstellen |
| PATCH | `/api/products/:id` | ADMIN | Produkt ändern |
| DELETE | `/api/products/:id` | ADMIN | Produkt löschen |
| POST | `/api/orders` | angemeldet | Bestellung erstellen |
| GET | `/api/orders/my` | angemeldet | Eigene Bestellungen abrufen |
| GET | `/api/orders` | ADMIN | Alle Bestellungen abrufen |
| PATCH | `/api/orders/:id/status` | ADMIN | Bestellstatus ändern |

## Beispiele

### Serverstatus — `200 OK`

```http
GET /api/health
```

```json
{
  "status": "ok"
}
```

### Produktliste — `200 OK`

```http
GET /api/products
```

```json
[
  {
    "id": 1,
    "name": "Beispielprodukt",
    "description": "Produktbeschreibung",
    "price": "19.99",
    "imageUrl": null,
    "categoryId": 1,
    "category": {
      "id": 1,
      "name": "Beispielkategorie"
    }
  }
]
```

### Bestellung erstellen — `201 Created`

```http
POST /api/orders
Authorization: Bearer <Clerk-JWT>
Content-Type: application/json
```

```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ]
}
```

Der Preis wird nicht im Request gesendet. Das Backend liest den aktuellen
Produktpreis aus PostgreSQL und berechnet den Gesamtpreis selbst.

```json
{
  "id": 15,
  "userId": 2,
  "status": "PENDING",
  "totalPrice": "39.98",
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "unitPrice": "19.99"
    }
  ]
}
```

### Ungültiger Kategorie-Filter — `400 Bad Request`

```http
GET /api/products?categoryId=abc
```

```json
{
  "error": "Ungültige Kategorie-ID"
}
```

### Fehlende Anmeldung — `401 Unauthorized`

```http
POST /api/orders
Content-Type: application/json
```

```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 1
    }
  ]
}
```

```json
{
  "error": "Nicht autorisiert"
}
```

### Fehlende ADMIN-Rolle — `403 Forbidden`

Ein angemeldeter USER ohne ADMIN-Rolle versucht, eine Kategorie zu erstellen:

```http
POST /api/categories
Authorization: Bearer <Clerk-JWT>
Content-Type: application/json
```

```json
{
  "name": "Neue Kategorie"
}
```

```json
{
  "error": "Keine Berechtigung"
}
```

### Produkt nicht gefunden — `404 Not Found`

```http
GET /api/products/999999
```

```json
{
  "error": "Produkt nicht gefunden"
}
```

### Kategorie mit Produkten löschen — `409 Conflict`

```http
DELETE /api/categories/1
Authorization: Bearer <Clerk-JWT>
```

```json
{
  "error": "Kategorie kann nicht gelöscht werden, solange sie Produkte enthält"
}
```
