import { Router } from "express";
import { createItem, getAllItems, getItem } from "./handlers/items";

const router = Router();
router.get("/items", getAllItems);
router.get("/item:id", getItem)
router.post('/item', createItem)

export default router
