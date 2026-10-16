# Projektstruktur – Mini E-Commerce

```text
mini-e-commerce/
├── prisma/
│   └── schema.prisma
├── public/
│   ├── index.html
│   ├── admin.html
│   ├── css/
│   └── js/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── category.controller.js
│   │   ├── product.controller.js
│   │   └── order.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── authorize.middleware.js
│   │   ├── error.middleware.js
│   │   └── validate.middleware.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── category.routes.js
│   │   ├── product.routes.js
│   │   └── order.routes.js
│   ├── schemas/
│   │   ├── auth.schema.js
│   │   ├── category.schema.js
│   │   ├── product.schema.js
│   │   └── order.schema.js
│   ├── app.js
│   ├── prisma.js
│   └── server.js
├── tests/
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

Verantwortlichkeiten

- routes verbinden HTTP-Methoden und Endpoints mit Middleware und Controllern.
- middleware prüft Authentication, Authorization, Validation und behandelt Fehler.
- controllers enthalten die Request-Logik, Business Logic und Prisma-Aufrufe.
- schemas enthalten die Zod-Validierung.
- prisma/schema.prisma beschreibt die Datenbankmodelle und Beziehungen.
- prisma.js stellt den Prisma Client bereit.
- app.js konfiguriert Express, Middleware und Routes.
- server.js startet den Server.
- public enthält das einfache Frontend und die Admin-Oberfläche.
- tests enthält die automatisierten API-Tests.
