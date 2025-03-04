import { Router } from "express";
import { registerProduct , listProduct, updateProduct, deleteProduct, findProduct} from "./product.controller.js";
import { registerProductValidator, updateProductValidator,deleteProductValidator , findProductValidator} from "../middlewares/product-validator.js";
import { hasRoles } from "../middlewares/validate-role.js";

const router = Router();

router.post(
    "/registerProduct/",
    registerProductValidator,
    registerProduct
)

router.get(
    "/listProduct/",
    listProduct
)

router.patch(
    "/updateProduct/:uid",
    updateProductValidator,
    updateProduct
)

router.patch(
    "/deleteProduct/:uid",
    deleteProductValidator,
    deleteProduct
)

router.get(
    "/findProduct/:uid",
    findProductValidator,
    findProduct
)


export default router;