Да, теперь через Postman можем показать почти весь backend. Лучше тестировать в таком порядке.

| Проверка                           | Endpoint                   | Ожидаемый ответ  |
| ---------------------------------- | -------------------------- | ---------------- |
| Создать товар                      | `POST /api/products`       | `201 Created`    |
| Получить товар                     | `GET /api/products/:id`    | `200 OK`         |
| Обновить товар                     | `PATCH /api/products/:id`  | `200 OK`         |
| Создать заказ                      | `POST /api/orders`         | `201 Created`    |
| Мои заказы                         | `GET /api/orders/my`       | `200 OK`         |
| Удалить тестовый товар без заказов | `DELETE /api/products/:id` | `204 No Content` |

Все запросы, кроме `GET` товаров, запускай под ADMIN с Bearer Token.

## 1. Создать товар

```text
POST {{base_url}}/api/products
```

Body → raw → JSON:

```json
{
  "name": "Postman Test Laptop",
  "description": "Ein Testprodukt aus Postman",
  "price": 499.99,
  "imageUrl": null,
  "categoryId": 1
}
```

Скопируй `id` созданного товара из ответа.

## 2. Получить один товар

```text
GET {{base_url}}/api/products/ID_ТОВАРА
```

## 3. Изменить товар

```text
PATCH {{base_url}}/api/products/ID_ТОВАРА
```

Body:

```json
{
  "price": 449.99,
  "description": "Preis wurde mit Postman geändert"
}
```

`PATCH` удобен: можно передать только поля, которые нужно изменить.

## 4. Создать заказ с этим товаром

```text
POST {{base_url}}/api/orders
```

Body:

```json
{
  "items": [
    {
      "productId": ID_ТОВАРА,
      "quantity": 2
    }
  ]
}
```

Ожидай:

```text
201 Created
status: PENDING
totalPrice: 899.98
```

Сервер возьмёт новую цену `449.99` из базы и сам посчитает сумму.

## 5. Посмотреть свои заказы

```text
GET {{base_url}}/api/orders/my
```

В ответе должен быть новый заказ с этим товаром.

## Важно про удаление товара

Товар, который уже добавлен в заказ, **не удаляй**. Это правильно запрещено связью в PostgreSQL: история заказа не должна сломаться.

Для проверки `DELETE` создай отдельный второй товар, но не создавай для него заказ. Затем:

```text
DELETE {{base_url}}/api/products/ID_ВТОРОГО_ТОВАРА
```

Ожидаемый результат:

```text
204 No Content
```

Начни с шага 1 — создания товара через Postman.

Сделай так:

1. Вернись в браузер на http://localhost:3000/order-test.html под пользователем ADMIN.
2. Открой F12 → Console и введи:

```js
copy(await Clerk.session.getToken());
```

``
Эта команда скопирует свежий токен в буфер, но не покажет его на экране.
