import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json());

let users = [
  { id: 1, name: "Ada", email: "ada@example.com" },
  { id: 2, name: "Linus", email: "linus@example.com" },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: "Die Id muss eine Zahl sein",
    });
  }

  const foundUser = users.find((user) => user.id === id);
  if (!foundUser) {
    return res.status(404).json({
      error: `Kein User mit der ID ${id} gefunden`,
    });
  }
  res.status(200).json(foundUser);
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
