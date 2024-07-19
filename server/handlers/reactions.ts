import { Request, Response } from "express";
import prisma from "..";

export const addReaction = async (req: Request, res: Response) => {
    try {
        await prisma.reaction.create({
            data: {
                userId: req.body.userId,
                itemId: req.body.itemId,
                emoji: req.body.emoji,
                commentId: req.body.commentId,
            },
        });
    } catch (error) {}
};
