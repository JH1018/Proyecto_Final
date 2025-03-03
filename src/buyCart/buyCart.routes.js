import { Router } from "express";
import { registerBuyCart, payCart, editCart, deleteCart} from "./buyCart.controller.js";
import { registerBuyCartValidator, payCartValidator,editCartValidator,deleteCartValidator } from "../middlewares/buyCartValidator.js";

const router = Router();

router.post(
    "/registerBuyCart/",
    registerBuyCartValidator,
    registerBuyCart
)

router.patch(
    "/payCart/:uid",
    payCartValidator,
    payCart
)

router.patch(
    "/editCart/:uid",
    editCartValidator,
    editCart
)

router.delete(
    "/deleteCart/:uid",
    deleteCartValidator,
    deleteCart
)

export default router;