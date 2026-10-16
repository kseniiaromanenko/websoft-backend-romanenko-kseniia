import prisma from "../prisma.js";

export const requireAdmin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: req.clerkId,
      },
    });

    if (!user) {
      return res.status(403).json({
        error: "Benutzerprofil nicht gefunden",
      });
    }

    if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
      return res.status(403).json({
        error: "Keine Berechtigung",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
export const requireSuperAdmin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: req.clerkId,
      },
    });

    if (!user) {
      return res.status(403).json({
        error: "Benutzerprofil nicht gefunden",
      });
    }

    if (user.role !== "SUPER_ADMIN") {
      return res.status(403).json({
        error: "Keine Berechtigung",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
