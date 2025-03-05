import Category from "../category/category.model.js"
import Product from "../product/product.model.js"

export const registerCategory = async(req,res) =>{
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

export const addProductsToBrands = async(req,res) =>{
    try{

        const { uid } = req.params
        const {productUid} = req.body

        const category = await Category.findById(uid)
        const product = await Product.findById(productUid);

        const addProduct = await Category.findByIdAndUpdate(uid,{$addToSet: {products: productUid}},{ new: true });

        await Product.findByIdAndUpdate(productUid,{ category: uid },{ new: true });

        return res.status(201).json({
            message: "Brand has been registred",
            addProduct
        })
    }catch(error){
        return res.status(500).json({
            message: "Brand registration failed",
            error: error.message
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {

        const { uid } = req.params;
        const category = await Category.findById(uid);
        const productIds = category.products;

        if (!category) {
            return res.status(404).json({
                message: "Category not found" 
            });
        }

        const categoryDefault = await Category.findOne({name: "Default"})

        await Category.findByIdAndUpdate(uid, { status: false, products: [] }, { new: true });
        await Product.updateMany({ category: uid },{ category: categoryDefault._id });
        await Category.findByIdAndUpdate(categoryDefault._id,{$push: {products: {$each: productIds}}}, { new: true });



        return res.status(200).json({ 
            message: "Category disabled and removed from products" 
        });

    } catch (error) {
        return res.status(500).json({
            message: "Delete category failed",
            error: error.message
        });
    }
};


export const updateCategory = async(req,res) => {
    try{
        const { uid } = req.params;
        const data = req.body

        const category = await Category.findById(uid)

        if(!category){
            return res.status(404).json({
                message: "The category non exist",
                error: error.message
            }); 
        }

        const updatedCategory = await Category.findByIdAndUpdate(uid, data, {new: true})
        
        return res.status(200).json({ 
            message: "Category updated",
            updatedCategory
        });

    }catch(error){
        return res.status(500).json({
            message: "Update category failed",
            error: error.message
        });
    }
}