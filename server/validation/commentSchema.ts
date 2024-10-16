import * as yup from "yup";

export const createCommentSchema = yup.object().shape({
    content: yup.string().required("Content is required"),
    itemId: yup.number().required("item Id is required"),
    userId: yup.string().required("userId is required"),
});
