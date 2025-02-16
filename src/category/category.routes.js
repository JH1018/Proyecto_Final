import { Router } from "express";
import { registerCategory , addProductsToBrands ,deleteCategory , updateCategory} from "./category.controller.js";
import { registerBrandValidator ,addProductToCategoryValidator , deleteCategoryValidator, updateCategoryValidator} from "../middlewares/category-validators.js";

const router = Router();

router.post(
    "/registerCategory/",
    registerBrandValidator,
    registerCategory
)

router.post(
    "/addProductToCategory/:uid",
    addProductToCategoryValidator,
    addProductsToBrands
)

router.patch(
    "/deleteCategory/:uid",
    deleteCategoryValidator,
    deleteCategory
)

router.patch(
    "/updateCategory/:uid",
    updateCategoryValidator,
    updateCategory
)

export default router;