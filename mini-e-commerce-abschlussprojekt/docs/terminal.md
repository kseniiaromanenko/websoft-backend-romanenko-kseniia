Да. Открой второй терминал: сервер должен продолжать работать в первом.

Сначала получи свежий токен в браузере через Console:

```js
copy(await Clerk.session.getToken());
```

В терминале введи этот блок. Токен вводится скрыто и не попадёт в историю терминала:

```bash
API_URL="http://localhost:3000"
read -rsp "Clerk token einfügen: " CLERK_TOKEN
echo
```

Теперь можно проверять защищённые endpoints.

### 1. Текущий авторизованный пользователь

```bash
curl -i "$API_URL/api/auth/me" \
  -H "Authorization: Bearer $CLERK_TOKEN"
```

Ожидается:

```text
HTTP/1.1 200 OK
```

### 2. Только мои заказы

```bash
curl -i "$API_URL/api/orders/my" \
  -H "Authorization: Bearer $CLERK_TOKEN"
```

Ожидается `200 OK` и массив заказов именно текущего пользователя.

### 3. Создать заказ

Каждый запуск этой команды создаёт настоящий новый тестовый заказ:

```bash
curl -i -X POST "$API_URL/api/orders" \
  -H "Authorization: Bearer $CLERK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"items":[{"productId":2,"quantity":1}]}'
```

Ожидается:

```text
HTTP/1.1 201 Created
```

### 4. Создать категорию как ADMIN

Работает только с токеном пользователя ADMIN:

```bash
curl -i -X POST "$API_URL/api/categories" \
  -H "Authorization: Bearer $CLERK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Curl Test Kategorie"}'
```

Ожидается:

```text
HTTP/1.1 201 Created
```

### 5. Проверить защиту без токена

```bash
curl -i "$API_URL/api/orders/my"
```

Ожидается:

```text
HTTP/1.1 401 Unauthorized
```

### 6. Проверить USER без прав ADMIN

Войди вторым пользователем USER, получи его свежий токен таким же способом и повтори команду создания категории:

```bash
curl -i -X POST "$API_URL/api/categories" \
  -H "Authorization: Bearer $CLERK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Dieser Name darf nicht erstellt werden"}'
```

Ожидается:

```text
HTTP/1.1 403 Forbidden
{"error":"Keine Berechtigung"}
```

После работы удали токен из памяти текущего терминала:

```bash
unset CLERK_TOKEN
```

Так ты можешь показать учителю три важные ситуации: `200/201` для авторизованного пользователя, `401` без входа и `403` без нужной роли.

---

Сначала токен не вводится в `curl`. Его нужно один раз сохранить в переменную терминала.

1. В браузере на `order-test.html` открой Console и выполни:

```js
copy(await Clerk.session.getToken());
```

Токен уже скопирован, но не показан.

2. В новом терминале сначала введи:

```bash
API_URL="http://localhost:3000"
```

Нажми Enter.

3. Затем введи:

```bash
read -rsp "Clerk token einfügen: " CLERK_TOKEN
```

Нажми Enter.

4. Теперь терминал покажет:

```text
Clerk token einfügen:
```

В этот момент вставь токен через `Ctrl + Shift + V` и нажми Enter.

Символы токена не будут видны — это нормально, потому что `-s` означает «скрытый ввод».

5. Введи:

```bash
echo
```

Теперь можно запускать `curl`, например:

```bash
curl -i "$API_URL/api/auth/me" \
  -H "Authorization: Bearer $CLERK_TOKEN"
```

Токен уже находится в переменной `CLERK_TOKEN`, поэтому его больше не нужно вставлять в каждую команду.
