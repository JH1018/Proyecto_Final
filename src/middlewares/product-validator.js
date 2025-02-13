import { body  } from "express-validator";
import { validationsFields } from "./fields-validator.js";

export const registerProductValidator = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("description").not().isEmpty().withMessage("userName is required"),
    body("price").not().isEmpty().withMessage("Email is required").isNumeric().withMessage("The price must be number"),
    body("stock").notEmpty().withMessage("Invalid Email").isNumeric().withMessage("The Stock must be number"),
    body("brand").notEmpty().withMessage("Te product must be have a brand"),
    validationsFields
];
