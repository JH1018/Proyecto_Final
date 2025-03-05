import { Router } from "express";
import { registerBuyCart, payCart, editCart, deleteCart } from "./buyCart.controller.js";
import { registerBuyCartValidator, payCartValidator, editCartValidator, deleteCartValidator } from "../middlewares/buyCartValidator.js";

const router = Router();

/**
 * @swagger
 * /registerBuyCart/:
 *   post:
 *     summary: Registrar un carrito de compras
 *     description: Crea un nuevo carrito de compras para un usuario.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - BuyCart
 *     responses:
 *       201:
 *         description: Carrito de compras registrado correctamente
 *       400:
 *         description: Datos de entrada inválidos
 */
router.post(
    "/registerBuyCart/",
    registerBuyCartValidator,
    registerBuyCart
);

/**
 * @swagger
 * /payCart/{uid}:
 *   patch:
 *     summary: Realizar pago del carrito de compras
 *     description: Permite realizar el pago de un carrito de compras usando su ID.
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del carrito de compras a pagar.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - BuyCart
 *     responses:
 *       200:
 *         description: Carrito de compras pagado correctamente
 *       404:
 *         description: Carrito de compras no encontrado
 */
router.patch(
    "/payCart/:uid",
    payCartValidator,
    payCart
);

/**
 * @swagger
 * /editCart/{uid}:
 *   patch:
 *     summary: Editar un carrito de compras
 *     description: Permite editar el contenido de un carrito de compras utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del carrito de compras a editar.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - BuyCart
 *     responses:
 *       200:
 *         description: Carrito de compras actualizado correctamente
 *       404:
 *         description: Carrito de compras no encontrado
 */
router.patch(
    "/editCart/:uid",
    editCartValidator,
    editCart
);

/**
 * @swagger
 * /deleteCart/{uid}:
 *   delete:
 *     summary: Eliminar un carrito de compras
 *     description: Elimina un carrito de compras utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del carrito de compras a eliminar.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - BuyCart
 *     responses:
 *       200:
 *         description: Carrito de compras eliminado correctamente
 *       404:
 *         description: Carrito de compras no encontrado
 */
router.delete(
    "/deleteCart/:uid",
    deleteCartValidator,
    deleteCart
);

export default router;
