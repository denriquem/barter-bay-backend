import * as yup from "yup";

export const createItemSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    userId: yup.string().required("User ID is required"),
});
