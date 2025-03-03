import { body, param } from "express-validator";
import { validationsFields } from "./fields-validator.js";
import { validateJWT } from "./validate-token.js";
import { hasRoles } from "./validate-role.js";
import { catchErrors } from "./catch-errors.js";
import { uidExist } from "../helpers/db-validators.js";

export const registerBuyCartValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("user").not().isEmpty().withMessage("User is required"),
    validationsFields,
    catchErrors
];

