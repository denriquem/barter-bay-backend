import { Request, Response } from "express";
import prisma from "..";

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.item.findMany();
    res.status(200).json(items);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const item = await prisma.item.findUnique({
      where: {
        id: id,
      },
    });
    res.json(item);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    await prisma.item.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        ownerId: req.body.userId,
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
};
