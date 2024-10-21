import * as yup from "yup";

export const createReactionSchema = yup.object().shape({
    emoji: yup.string().required("Emoji is required"),
    itemId: yup.string().optional().nullable(),
    commentId: yup.string().optional().nullable(),
    userId: yup.string().required("userId is required"),
});
