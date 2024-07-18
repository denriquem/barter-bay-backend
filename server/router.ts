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

const router = Router();

// items
router.get("/items", getAllItems);
router.get("/item:id", getItem);
router.post("/item", createItem);

// offers
router.get("/offers", getAllOffers),
router.get("/offers-received:userId", getOffersReceived);
router.post("/offers", makeAnOffer);
router.put("/accept-offer:id", acceptAnOffer);
router.put("/decline-offer:id", declineAnOffer);
router.delete("/offer:id", retractAnOffer);

export default router;
