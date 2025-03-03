import { Router } from "express";
import { registerBuyCart } from "./buyCart.controller.js";
import { registerBuyCartValidator } from "../middlewares/buyCartValidator.js";

const router = Router();

router.post(
    "/registerBuyCart/",
    registerBuyCartValidator,
    registerBuyCart
)

export default router;