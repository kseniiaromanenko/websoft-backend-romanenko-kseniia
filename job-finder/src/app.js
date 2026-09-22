import express from "express";
import jobsRouter from "./routes/jobs.routes.js";
import savedJobsRouter from "./routes/savedJobs.routes.js";

import helmet from "helmet";
import cors from "cors";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { clerkMiddleware } from "@clerk/express";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(clerkMiddleware());
const clerkFrontendApi = "https://thankful-bobcat-932.clerk.accounts.dev";

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: [
          "'self'",
          clerkFrontendApi,
          "https://challenges.cloudflare.com",
          "https://*.protect.clerk.com",
        ],
        connectSrc: [
          "'self'",
          clerkFrontendApi,
          "https://*.protect.clerk.com:*",
        ],
        imgSrc: ["'self'", "data:", "https://img.clerk.com"],
        workerSrc: ["'self'", "blob:"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        frameSrc: [
          "'self'",
          "https://challenges.cloudflare.com",
          "https://*.protect.clerk.com",
        ],
      },
    },
  }),
);

app.use(cors());
app.use(express.json());
app.use(express.static("src/public"));
app.use("/api", apiLimiter);
app.use("/api/auth", authRouter);

app.use("/api/jobs", jobsRouter);
app.use("/api/saved-jobs", savedJobsRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Mini Job Finder API is running" });
});

app.use(errorHandler);

export default app;
