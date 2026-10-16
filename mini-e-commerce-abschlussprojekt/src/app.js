import express from "express";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import categoryRouter from "./routes/category.routes.js";
import productRouter from "./routes/product.routes.js";
import { clerkMiddleware } from "@clerk/express";
import authRouter from "./routes/auth.routes.js";
import orderRouter from "./routes/order.routes.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Zu viele Anfragen. Bitte später erneut versuchen.",
  },
});

app.use("/api", apiLimiter);
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);

app.use("/api/orders", orderRouter);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(notFound);
app.use(errorHandler);

export default app;
