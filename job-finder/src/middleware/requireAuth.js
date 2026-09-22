import { getAuth } from "@clerk/express";

export const requireAuth = (req, res, next) => {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  req.currentUserId = userId;

  next();
};
