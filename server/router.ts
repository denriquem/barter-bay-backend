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
import { addReaction } from "./handlers/reactions";

const router = Router();

// items
router.get("/items", getAllItems);
router.get("/item/:id", getItem);
router.post("/item", createItem);

// offers
router.get("/offers", getAllOffers);
router.get("/offers-received/:userId", getOffersReceived);
router.post("/offers", makeAnOffer);
router.put("/accept-offer/:offerId", acceptAnOffer);
router.put("/decline-offer/:offerId", declineAnOffer);
router.delete("/offer/:id", retractAnOffer);

// comments
router.post("/comment", addComment);
router.delete("/comment", deleteComment);
router.get("/comments/:itemId", getCommentsByItem);

//reactions
router.post("/reactions", addReaction);

export default router;
