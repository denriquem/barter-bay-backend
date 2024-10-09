import { ObjectId } from "mongodb";

export const generateId = () => new ObjectId().toString();
