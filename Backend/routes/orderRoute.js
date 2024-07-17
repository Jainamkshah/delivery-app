import { listOrders, placeorder, updatestatus, userorders, verifyOrder } from "../controllers/ordercontroller.js";
import express from "express";
import authmiddleware from "../middleware/auth.js"

const orderRouter = express.Router();

orderRouter.post("/place",authmiddleware,placeorder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authmiddleware,userorders);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updatestatus);

export default orderRouter;