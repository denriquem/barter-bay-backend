import { Request, Response } from "express";
import prisma from "..";

export const getAllOffers = async (req: Request, res: Response) => {
  try {
    const items = await prisma.offer.findMany();
    res.status(200).json(items);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
};

export const getOffersReceived = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const items = await prisma.offer.findMany({
      where: { offeredById: userId },
    });
    res.status(200).json(items);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
};

export const makeAnOffer = async (req: Request, res: Response) => {
  try {
    const formData = req.body.data;
    await prisma.offer.create({
      data: {
        itemOfferedId: formData.id,
        itemRequestedId: formData.itemRequestedIdid,
        offeredById: formData.offeredById,
        requestedFromId: formData.requestedFromId.id,
        status: "Pending",
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
};

export const acceptAnOffer = async (req: Request, res: Response) => {
  const offerId = Number(req.params.offerId);
  try {
    prisma.offer.update({
      where: {
        id: offerId,
      },
      data: {
        status: "Accepted",
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
};

export const declineAnOffer = async (req: Request, res: Response) => {
  const offerId = Number(req.params.offerId);
  try {
    prisma.offer.update({
      where: {
        id: offerId,
      },
      data: {
        status: "Declined",
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
};

export const retractAnOffer = async (req: Request, res: Response) => {
  const offerId = Number(req.params.offerId);
  try {
    prisma.offer.delete({
      where: {
        id: offerId,
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
};
