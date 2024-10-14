import { Request, Response } from "express";
import prisma from "../apiServer";
import { validateSchema } from "../validation/validationMiddleware";
import { createCommentSchema } from "../validation/commentSchema";
import { generateId } from "../helpers/generateId";

export const addComment = async (req: Request, res: Response) => {
    try {
        validateSchema(createCommentSchema);

        const newComment = await prisma.comment.create({
            data: {
                id: generateId(),
                content: req.body.content,
                itemId: req.body.itemId,
                userId: req.body.userId,
            },
        });
        res.status(200).json({
            message: "succesfully added comment",
            newComment,
        });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ error: errorMessage });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    const commentId = req.params.id;
    try {
        await prisma.comment.delete({
            where: {
                id: commentId,
            },
        });
        res.status(200).json({
            message: `Comment: ${commentId}, succesfully deleted`,
        });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ error: errorMessage });
    }
};

export const getCommentsByItem = async (req: Request, res: Response) => {
    const itemId = req.params.itemId;
    try {
        const comments = await prisma.comment.findMany({
            where: {
                itemId,
            },
        });
        res.status(200).json(comments);
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ error: errorMessage });
    }
};
