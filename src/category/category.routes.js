import { Router } from "express";
import { registerCategory , addProductsToBrands , deleteCategory , updateCategory } from "./category.controller.js";
import { registerBrandValidator , addProductToCategoryValidator , deleteCategoryValidator, updateCategoryValidator } from "../middlewares/category-validators.js";

const router = Router();

/**
 * @swagger
 * /registerCategory/:
 *   post:
 *     summary: Registrar una nueva categoría
 *     description: Registra una nueva categoría en la base de datos.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Category
 *     responses:
 *       201:
 *         description: Categoría registrada correctamente
 *       400:
 *         description: Datos de entrada inválidos
 */
router.post(
    "/registerCategory/",
    registerBrandValidator,
    registerCategory
);

/**
 * @swagger
 * /addProductToCategory/{uid}:
 *   post:
 *     summary: Agregar un producto a una categoría
 *     description: Agrega un producto existente a una categoría utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID de la categoría a la que agregar el producto.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: Producto agregado correctamente
 *       404:
 *         description: Categoría o producto no encontrado
 */
router.post(
    "/addProductToCategory/:uid",
    addProductToCategoryValidator,
    addProductsToBrands
);

/**
 * @swagger
 * /deleteCategory/{uid}:
 *   patch:
 *     summary: Eliminar una categoría
 *     description: Elimina una categoría utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID de la categoría a eliminar.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: Categoría eliminada correctamente
 *       404:
 *         description: Categoría no encontrada
 */
router.patch(
    "/deleteCategory/:uid",
    deleteCategoryValidator,
    deleteCategory
);

/**
 * @swagger
 * /updateCategory/{uid}:
 *   patch:
 *     summary: Actualizar información de una categoría
 *     description: Actualiza los detalles de una categoría existente utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID de la categoría a actualizar.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: Categoría actualizada correctamente
 *       404:
 *         description: Categoría no encontrada
 */
router.patch(
    "/updateCategory/:uid",
    updateCategoryValidator,
    updateCategory
);

export default router;
