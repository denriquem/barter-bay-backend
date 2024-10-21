import { Router } from "express";
import { createItem, getAllItems, getItem } from "./handlers/items";
import {
    acceptAnOffer,
    declineAnOffer,
    getAllOffers,
    getOffersReceived,
    makeAnOffer,
    retractAnOffer,
} from "./handlers/offers";
import {
    addComment,
    deleteComment,
    getCommentsByItem,
} from "./handlers/comments";
import {
    addReaction,
    getReactionsByComment,
    removeReaction,
} from "./handlers/reactions";
import { validateSchema } from "./validation/validationMiddleware";
import { createOfferSchema } from "./validation/offerSchema";
import { createItemSchema } from "./validation/itemSchema";
import { createCommentSchema } from "./validation/commentSchema";
import { createReactionSchema } from "./validation/reactionSchema";

const router = Router();

// items
router.get("/items", getAllItems);
router.get("/item/:id", getItem);
router.post("/item", validateSchema(createItemSchema), createItem);

// offers
router.get("/offers", getAllOffers);
router.get("/offers-received/:userId", getOffersReceived);
router.post("/offers", validateSchema(createOfferSchema), makeAnOffer);
router.put("/accept-offer/:offerId", acceptAnOffer);
router.put("/decline-offer/:offerId", declineAnOffer);
router.delete("/offers/:offerId", retractAnOffer);

// comments
router.post("/comment", validateSchema(createCommentSchema), addComment);
router.delete("/comment/:commentId", deleteComment);
router.get("/comments/:itemId", getCommentsByItem);

//reactions
router.post("/reactions", validateSchema(createReactionSchema), addReaction);
router.get("/reactions/:commentId", getReactionsByComment);
router.delete("/reactions/:reactionId", removeReaction);

export default router;
