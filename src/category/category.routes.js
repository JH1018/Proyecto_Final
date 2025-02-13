import { Router } from "express";
import { registerBrand , addProductToCategory , updateCategory , deleteCategory} from "./category.controller.js";
import { registerBrandValidator ,addProductToCategoryValidator , updateCategoryValidator, deleteCategoryValidator} from "../middlewares/category-validators.js";

const router = Router();

router.post(
    "/registerBrand/",
    registerBrandValidator,
    registerBrand
)

router.post(
    "/addProductToCategory/:uid",
    addProductToCategoryValidator,
    addProductToCategory
)

router.patch(
    "/updateCategory/:uid",
    updateCategoryValidator,
    updateCategory
)

router.patch(
    "/deleteCategory/:uid",
    deleteCategoryValidator,
    deleteCategory
)



export default router;