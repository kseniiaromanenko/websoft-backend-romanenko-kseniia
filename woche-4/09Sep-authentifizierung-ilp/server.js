import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const users = [];
const tokens = new Map();

app.get("/", (req, res) => {
  res.json({
    message: "Authentication API funktioniert ",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.post("/register", async (req, res) => {
  // E-Mail und Passwort aus dem Request-Body lesen. / Получаем email и password из тела запроса.
  const { email, password } = req.body;

  // E-Mail normalisieren. / Нормализуем email.
  const normalizedEmail = email?.trim().toLowerCase();

  // Prüfen, ob alle Pflichtfelder vorhanden sind. / Проверяем наличие обязательных данных.
  if (!normalizedEmail || !password) {
    return res.status(400).json({
      message: "E-Mail und Passwort sind erforderlich",
    });
  }

  // Nach einem Benutzer mit derselben E-Mail suchen. / Ищем пользователя с таким же email.
  const existingUser = users.find((user) => user.email === normalizedEmail);

  // Eine doppelte Registrierung verhindern. / Предотвращаем повторную регистрацию.
  if (existingUser) {
    return res.status(409).json({
      message: "Ein Benutzer mit dieser E-Mail existiert bereits",
    });
  }

  // Einen sicheren Passwort-Hash erstellen. / Создаём безопасный хеш пароля.
  const passwordHash = await bcrypt.hash(password, 10);

  // Ein neues Benutzerobjekt erstellen. / Создаём объект нового пользователя.
  const newUser = {
    id: crypto.randomUUID(),
    email: normalizedEmail,
    passwordHash,
    role: "user",
  };

  // Den neuen Benutzer im In-Memory-Array speichern. / Добавляем пользователя в массив users.
  users.push(newUser);

  // Eine sichere Antwort ohne Passwort und Passwort-Hash senden. / Возвращаем безопасный ответ без пароля и его хеша.
  return res.status(201).json({
    message: "Registrierung erfolgreich",
    user: {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

app.post("/login", async (req, res) => {
  // E-Mail und Passwort aus dem Request-Body lesen. / Получаем email и password из тела запроса.
  const { email, password } = req.body;

  // E-Mail normalisieren. / Нормализуем email.
  const normalizedEmail = email?.trim().toLowerCase();

  // Prüfen, ob alle Pflichtfelder vorhanden sind. / Проверяем наличие обязательных данных.
  if (!normalizedEmail || !password) {
    return res.status(400).json({
      message: "E-Mail und Passwort sind erforderlich",
    });
  }

  // Den Benutzer anhand seiner E-Mail suchen. / Ищем пользователя по его email.
  const user = users.find((user) => user.email === normalizedEmail);

  // Eine allgemeine Fehlermeldung zurückgeben. / Возвращаем общее сообщение об ошибке.
  if (!user) {
    return res.status(401).json({
      message: "Ungültige Anmeldedaten",
    });
  }

  // Das eingegebene Passwort mit dem gespeicherten Hash vergleichen. / Сравниваем введённый пароль с сохранённым хешем.
  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  // Den Login bei einem falschen Passwort ablehnen. / Отклоняем вход при неправильном пароле.
  if (!passwordMatches) {
    return res.status(401).json({
      message: "Ungültige Anmeldedaten",
    });
  }

  // Ein zufälliges Login-Token erstellen. / Создаём случайный токен для входа.
  const token = crypto.randomUUID();

  // Das Token mit der Benutzer-ID verknüpfen. / Связываем токен с ID пользователя.
  tokens.set(token, user.id);

  // Das Token an den Client zurückgeben. / Возвращаем токен клиенту.
  return res.status(200).json({
    message: "Login erfolgreich",
    token,
  });
});

function requireLogin(req, res, next) {
  const authHeader = req.headers.authorization;

  // Das Bearer-Format prüfen. / Проверяем формат Bearer.
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Bearer-Token erforderlich" });
  }

  // Das Token aus dem Header extrahieren. / Извлекаем токен из заголовка.
  const token = authHeader.slice(7);

  // Die Benutzer-ID anhand des Tokens suchen. / Ищем ID пользователя по токену.
  const userId = tokens.get(token);

  // Den Benutzer anhand seiner ID suchen. / Ищем пользователя по его ID.
  const user = users.find((user) => user.id === userId);

  // Einen ungültigen Token ablehnen. / Отклоняем недействительный токен.
  if (!user) {
    return res.status(401).json({
      message: "Ungültiger Token",
    });
  }

  // Benutzer und Token am Request speichern. / Сохраняем пользователя и токен в объекте запроса.
  req.user = user;
  req.token = token;

  // Die Anfrage an den nächsten Handler weitergeben. / Передаём запрос следующему обработчику.
  next();
}

app.get("/me", requireLogin, (req, res) => {
  // Sichere Benutzerdaten zurückgeben. / Возвращаем безопасные данные пользователя.
  return res.status(200).json({
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
