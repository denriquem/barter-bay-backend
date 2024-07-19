import { Request, Response } from "express";
import prisma from "..";
import { validateSchema } from "../validation/validationMiddleware";
import { createReactionSchema } from "../validation/reactionSchema";

export const addReaction = async (req: Request, res: Response) => {
    try {
        validateSchema(createReactionSchema);
        await prisma.reaction.create({
            data: {
                userId: req.body.userId,
                itemId: req.body.itemId,
                emoji: req.body.emoji,
                commentId: req.body.commentId,
            },
        });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ error: errorMessage });
    }
};
