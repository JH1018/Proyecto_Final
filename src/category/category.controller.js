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

export const addProductsToBrands = async(req,res) =>{
    try{

        const { uid } = req.params
        const productUid = req.body

        const category = await Category.findById(uid)
        const product = await Product.findById(productUid);

        const addProduct = await Category.findByIdAndUpdate(category, {$push: {products: product}}, {new: true})        
        await Product.findByIdAndUpdate(product, {$push: {category: category}}, {new: true})

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