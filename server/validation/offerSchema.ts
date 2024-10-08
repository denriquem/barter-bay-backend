import * as yup from "yup";

export const createOfferSchema = yup.object().shape({
    itemOfferedId: yup.number(),
    itemRequestedId: yup.number(),
    offeredById: yup.string(),
    requestedFromId: yup.string(),
});
