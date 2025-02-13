import { body , param } from "express-validator";
import { validationsFields } from "./fields-validator.js";
import { productExist , categoryExist } from "../helpers/db-validators.js";

export const registerBrandValidator = [
    body("name").not().isEmpty().withMessage("Name is required"),
    validationsFields
];

export const addProductToCategoryValidator = [
    param("uid").not().isEmpty().withMessage("The ID is Required").isMongoId().withMessage("The Id isn't valid").custom(categoryExist),
    body("productUid").notEmpty().withMessage("The ID is Required").isMongoId().withMessage("The ID isn't valid").custom(productExist),

]