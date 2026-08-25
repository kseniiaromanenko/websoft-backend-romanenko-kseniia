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
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
