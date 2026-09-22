export const devAuth = (req, res, next) => {
  req.currentUserId = "test-user-1";

  next();
};
