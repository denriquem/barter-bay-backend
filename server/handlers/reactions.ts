import { Request, Response } from "express";
import prisma from "../apiServer";
import { validateSchema } from "../validation/validationMiddleware";
import { createReactionSchema } from "../validation/reactionSchema";
import { generateId } from "../helpers/generateId";

export const addReaction = async (req: Request, res: Response) => {
    try {
        validateSchema(createReactionSchema);
        await prisma.reaction.create({
            data: {
                id: generateId(),
                userId: req.body.userId,
                itemId: req.body.itemId,
                emoji: req.body.emoji,
                commentId: req.body.commentId,
            },
        });
        res.status(200).json({ message: "succesfully created reaction" });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ error: errorMessage });
    }
};

export const getReactionsByComment = async (req: Request, res: Response) => {
    const commentId = req.params.commentId;
    try {
        const reactions = await prisma.reaction.findMany({
            where: {
                commentId,
            },
        });
        res.status(200).json(reactions);
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ error: errorMessage });
    }
};

export const removeReaction = async (req: Request, res: Response) => {
    const reactionId = req.params.reactionId;
    try {
        await prisma.reaction.delete({
            where: {
                id: reactionId,
            },
        });
        res.status(200).json({ message: `reaction ${reactionId} removed` });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ error: errorMessage });
    }
};
