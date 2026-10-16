import { clerkClient } from "@clerk/express";
import prisma from "../prisma.js";

export const getCurrentUser = async (req, res, next) => {
  try {
    const { clerkId } = req;
    const clerkUser = await clerkClient.users.getUser(clerkId);
    const email = clerkUser.primaryEmailAddress?.emailAddress;

    if (!email) {
      return res.status(400).json({
        error: "Keine primäre E-Mail-Adresse gefunden",
      });
    }
    const user = await prisma.user.upsert({
      where: {
        clerkId,
      },
      update: {
        email,
      },
      create: {
        clerkId,
        email,
      },
    });

    return res.status(200).json({
      id: user.id,
      clerkId: user.clerkId,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};
