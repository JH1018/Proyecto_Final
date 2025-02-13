import { Router } from "express";
import { registerProduct } from "./product.controller.js";
import { registerProductValidator } from "../middlewares/product-validator.js";

const router = Router();

router.post(
    "/registerProduct/",
    registerProductValidator,
    registerProduct
)

export default router;