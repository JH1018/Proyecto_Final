import { body } from "express-validator";
import { emailExist, userNameExist } from "../helpers/db-validators.js";
import { validationsFields } from "./fields-validator.js";

export const registerValidator = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("userName").not().isEmpty().withMessage("userName is required").custom(userNameExist),
    body("email").not().isEmpty().withMessage("Email is required").isEmail().withMessage("Invalid Email").custom(emailExist),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("The password must be more strong"),
    validationsFields
];

export const loginValidator = [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min: 8}).withMessage("The password need have 8 characteres"),
    validationsFields
];