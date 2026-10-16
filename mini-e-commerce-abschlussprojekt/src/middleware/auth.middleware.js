import { getAuth } from "@clerk/express";

export const requireAuth = (req, res, next) => {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated || !userId) {
    return res.status(401).json({
      error: "Nicht autorisiert",
    });
  }
  req.clerkId = userId;
  next();
};
