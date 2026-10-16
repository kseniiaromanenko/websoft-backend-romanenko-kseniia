export const notFound = (req, res) => {
  return res.status(404).json({ error: "Endpoint nicht gefunden" });
};
export const errorHandler = (error, req, res, next) => {
  console.error(error);
  return res.status(500).json({ error: "Interner Serverfehler" });
};
