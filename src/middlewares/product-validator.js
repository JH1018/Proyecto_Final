import { body, param } from "express-validator";
import { validationsFields } from "./fields-validator.js";
import { validateJWT } from "./validate-token.js";
import { hasRoles } from "./validate-role.js";
import { catchErrors } from "./catch-errors.js";
import { productExist } from "../helpers/db-validators.js";

export const registerProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").not().isEmpty().withMessage("Name is required"),
    body("description").not().isEmpty().withMessage("userName is required"),
    body("price").not().isEmpty().withMessage("Email is required").isNumeric().withMessage("The price must be number"),
    body("stock").notEmpty().withMessage("Invalid Email").isNumeric().withMessage("The Stock must be number"),
    body("brand").notEmpty().withMessage("Te product must be have a brand"),
    validationsFields,
    catchErrors
];

export const findProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("Name is required"),
    validationsFields,
    catchErrors
]

export const updateProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("UID is'nt valid").notEmpty().withMessage("UID is required").custom(productExist),
    validationsFields,
    catchErrors
]

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("UID is'nt valid").notEmpty().withMessage("UID is required").custom(productExist),
    validationsFields,
    catchErrors
]

