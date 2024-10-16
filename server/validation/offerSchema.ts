import * as yup from "yup";

export const createOfferSchema = yup.object().shape({
    itemOfferedId: yup.number().required(),
    itemRequestedId: yup.number().required(),
    offeredById: yup.string().required(),
    requestedFromId: yup.string().required(),
});
