Für die echte Anwendung solltest du den normalen Session-Token **nicht verlängern**. Die 60 Sekunden sind eine wichtige Sicherheitsmaßnahme; Clerk erneuert ihn im Browser automatisch.

Für **Postman-Tests** kannst du aber einen separaten, länger gültigen Test-Token erstellen.

1. Öffne im Clerk Dashboard:

```text
JWT templates
→ New template
→ Blank template
```

2. Name:

```text
postman-testing
```

3. Bei **Token Lifetime** kannst du zum Beispiel eingeben:

```text
3600
```

Das bedeutet **1 Stunde**.

4. Speichern.

5. Öffne danach deine Seite `order-test.html`, melde dich als ADMIN an und führe in der Browser-Konsole aus:

```js
copy(
  await Clerk.session.getToken({
    template: "postman-testing",
  }),
);
```

6. Füge diesen Token in Postman bei **Bearer Token** ein.

Dieser lange Token ist nur für Postman und Entwicklung gedacht. Im echten Frontend benutzen wir weiterhin:

```js
await Clerk.session.getToken();
```

Der normale Session-Token bleibt kurz gültig und wird automatisch erneuert. Clerk empfiehlt für Postman genau einen separaten JWT-Template-Token. [Clerk: Testing with Postman](https://clerk.com/docs/guides/development/testing/postman-or-insomnia)

Wenn du die gesamte Login-Session verlängern möchtest, ist das eine andere Einstellung:

```text
Clerk Dashboard
→ Sessions
→ Maximum lifetime
```

Das verlängert die Session, aber nicht den bereits kopierten Postman-Token.
