import * as yup from "yup";

export const createReactionSchema = yup.object().shape({
    emoji: yup.string().required("Emoji is required"),
    itemId: yup.number(),
    commentId: yup.number(),
    userId: yup.string().required("userId is required"),
});
