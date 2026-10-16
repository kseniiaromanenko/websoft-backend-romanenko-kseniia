import prisma from "../prisma.js";
import {
  createOrderSchema,
  updateOrderStatusSchema,
} from "../schemas/order.schema.js";

export const createOrder = async (req, res, next) => {
  try {
    const result = createOrderSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: result.error.issues[0].message,
      });
    }

    const { items } = result.data;

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

    const productIds = items.map((item) => item.productId);

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    if (products.length !== productIds.length) {
      return res.status(404).json({
        error: "Ein oder mehrere Produkte wurden nicht gefunden",
      });
    }

    const orderItems = items.map((item) => {
      const product = products.find((product) => product.id === item.productId);
      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: product.price,
      };
    });

    const totalPrice = orderItems.reduce((total, item) => {
      return total + Number(item.unitPrice) * item.quantity;
    }, 0);

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalPrice: totalPrice.toFixed(2),
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    return res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
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

    const orders = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      include: { items: { include: { product: true } } },

      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "Ungültige Bestell-ID",
      });
    }

    const result = updateOrderStatusSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Ungültiger Bestellstatus",
      });
    }

    const updateOrder = await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        status: result.data.status,
      },
    });
    return res.status(200).json(updateOrder);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Bestellung nicht gefunden" });
    }
    next(error);
  }
};
