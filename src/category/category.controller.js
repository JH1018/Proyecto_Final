import Category from "../category/category.model.js"
import Product from "../product/product.model.js"

export const registerBrand = async(req,res) =>{
    try{

        const data = req.body

        const category = await Category.create(data)

        return res.status(201).json({
            message: "Brand has been registred",
            name: category.name
        })
    }catch(error){
        return res.status(500).json({
            message: "Brand registration failed",
            error: error.message
        })
    }
}

export const addProductToCategory = async (req, res) => {
    try {
        const { uid } = req.params; 
        const { productUid } = req.body; 

        if (!productUid) {
            return res.status(400).json({ message: "El ID del producto es requerido" });
        }

        const category = await Category.findById(uid);
        if (!category) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        const product = await Product.findById(productUid); 

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        await Category.findByIdAndUpdate(uid,{ $addToSet: { products: productUid }},{ new: true });
        await Product.findByIdAndUpdate(productUid,{ category: uid },{ new: true });

        return res.status(201).json({
            message: "Producto agregado a la categoría correctamente",
            productUid
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al agregar el producto a la categoría",
            error: error.message
        });
    }
};



export const updateCategory = async(req,res) =>{
    try{
        const {uid} = req.params
        const data = req.body

        const category = await Category.findById(uid);

        if(!category){
            return res.status(404).json({
                message: "Category not found",
            })
        }

        const newInfo = await Category.findByIdAndUpdate(uid, data, {new: true});

        return res.status(201).json({
            message: "Category has been updated",
            newInfo
        })

    }catch(error){
        return res.status(500).json({
            message: "Update category failed",
            error: error.message
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { uid } = req.params;
        const category = await Category.findById(uid);
        const productIds = category.products;

        await Category.findByIdAndUpdate(uid, { status: false, products: [] }, { new: true });
        await Product.updateMany({ category: uid }, { category: null });

        return res.status(200).json({ message: "Category disabled and removed products" });

    } catch (error) {
        return res.status(500).json({
            message: "Delete category failed",
            error: error.message
        });
    }
};

export const deleteProductFromCategory = async (req, res) => {
    try {
        const { uid } = req.params;
        const { productUid } = req.body;

        const category = await Category.findById(uid);

        const product = await Product.findById(productUid);

        if (!category.inscribed.includes(productUid)) {
            return res.status(400).json({
                success: false,
                message: "The Product is not found in this category."
            });
        }

        await Category.findByIdAndUpdate(uid, { $pull: { products: productUid } });

        await Product.findByIdAndUpdate(productUid, { category: null });

        return res.status(200).json({
            success: true,
            message: "User removed from matter successfully."
        });

    }catch(err) {
        return res.status(500).json({
            success: false,
            message: "Failed to remove user from matter.",
            error: err.message
        });
    }    
};