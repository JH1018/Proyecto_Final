import { Router } from "express";
import { registerBrand , addProductsToBrands } from "./category.controller.js";
import { registerBrandValidator ,addProductToCategoryValidator} from "../middlewares/category-validators.js";

const router = Router();

router.post(
    "/registerBrand/",
    registerBrandValidator,
    registerBrand
)

router.post(
    "/addProductToCategory/:uid",
    addProductToCategoryValidator,
    addProductsToBrands
)

export default router;