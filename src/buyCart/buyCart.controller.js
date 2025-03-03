import BuyCart from "../buyCart/buyCart.model.js"
import Product from "../product/product.model.js"

export const registerBuyCart = async(req,res) =>{
    try{

        const data = req.body
        let total = 0
        const {products} = req.body
        for (let i = 0; i < products.length; i++) {
            let value = await Product.findOne({code: products[i]})
            total += value.price
        }

        data.total = total; 

        const buyCart = await BuyCart.create(data)

        return res.status(201).json({
            message: "Buy Cart has been created",   
            buyCart
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: "Buy cart creation failed",
            error: err
        })
    }
}