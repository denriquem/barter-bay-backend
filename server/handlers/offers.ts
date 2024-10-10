import { Request, Response } from "express";
import prisma from "../apiServer";
import { validateSchema } from "../validation/validationMiddleware";
import { createOfferSchema } from "../validation/offerSchema";
import { generateId } from "../helpers/generateId";

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
            where: { requestedFromId: userId },
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
        validateSchema(createOfferSchema);

        const createdOffer = await prisma.offer.create({
            data: {
                id: generateId(),
                itemOfferedId: req.body.itemOfferedId,
                itemRequestedId: req.body.itemRequestedId,
                offeredById: req.body.offeredById,
                requestedFromId: req.body.requestedFromId,
                status: "Pending",
            },
        });
        res.status(200).json({ message: "Offer created", createdOffer });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ error: errorMessage });
    }
};

export const acceptAnOffer = async (req: Request, res: Response) => {
    const offerId = req.params.offerId;
    try {
        const updatedOffer = await prisma.offer.update({
            where: {
                id: offerId,
            },
            data: {
                status: "Accepted",
            },
        });

        res.status(200).json({
            message: `Offer: ${offerId} has been accepted`,
            updatedOffer,
        });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ error: errorMessage });
    }
};

export const declineAnOffer = async (req: Request, res: Response) => {
    const offerId = req.params.offerId;
    try {
        const updatedOffer = await prisma.offer.update({
            where: {
                id: offerId,
            },
            data: {
                status: "Declined",
            },
        });
        res.status(200).json({
            message: `Offer: ${offerId}, has been declined`,
            updatedOffer,
        });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ error: errorMessage });
    }
};

export const retractAnOffer = async (req: Request, res: Response) => {
    const offerId = req.params.offerId;
    try {
        prisma.offer.delete({
            where: {
                id: offerId,
            },
        });

        res.status(200).json({ message: "offer has been retracted" });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ error: errorMessage });
    }
};
