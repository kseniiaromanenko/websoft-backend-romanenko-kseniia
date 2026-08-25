import express from "express";
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Support API is running",
  });
});

app.get("/support/info", (req, res) => {
  res.json({
    method: req.method,
    path: req.path,
    query: req.query,
    userAgent: req.get("user-agent"),
    customHeader: req.get("x-student-name"),
  });
});

const tickets = [
  {
    id: 1,
    title: "Login problem",
    message: "User cannot log in",
    email: "user1@example.com",
  },
  {
    id: 2,
    title: "Payment issue",
    message: "Payment was declined",
    email: "user2@example.com",
  },
];

app.get("/support/ticket/:id", (req, res) => {
  const id = Number(req.params.id);
  const ticket = tickets.find((ticket) => ticket.id === id);

  if (!ticket) {
    return res.status(404).json({
      error: "Ticket nicht gefunden",
    });
  }
  res.json(ticket);
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
