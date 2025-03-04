import BuyCart from "../buyCart/buyCart.model.js"
import { generateBill } from "../middlewares/generateBill.js"
import Product from "../product/product.model.js"
import User from "../user/user.model.js" 

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
    }catch(error){
            return res.status(500).json({
            message: "Buy cart creation failed",
            error: error.message
        })
    }
}

export const payCart = async(req,res) =>{
    try{
        const {uid} = req.params
        const cart = await BuyCart.findById(uid)

        for (let i = 0; i < cart.products.length; i++) {
            const restStock = await Product.findOne({code: cart.products[i]})
            await Product.findByIdAndUpdate(restStock.id,{$inc: {stock: -1}}, {new: true})
        }

        await BuyCart.findByIdAndUpdate(uid,{status: "PAYED"})
        await User.findByIdAndUpdate(cart.user, {$push: {history: uid}})

        await generateBill(cart.products, cart.total, cart.user);

        return res.status(201).json({
            message: "Thank you for your purchase, come back soon!",   
            cart
        })

    }catch(error){
        return res.status(500).json({
            message: "Pay cart failed",
            error: error.message
        })
    }
}

export const editCart = async (req, res) => {
    try {
        const { uid } = req.params;
        const { addProduct, deleteProduct } = req.body;

        const cart = await BuyCart.findById(uid);

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        if (addProduct) {
            cart.products.push(...(Array.isArray(addProduct) ? addProduct : [addProduct]));
        }

        if (deleteProduct) {
            const deleteArray = Array.isArray(deleteProduct) ? deleteProduct : [deleteProduct];

            for (const product of deleteArray) {
                const index = cart.products.indexOf(product);
                if (index !== -1) {
                    cart.products.splice(index, 1);
                }
            }
        }

        await cart.save();

        return res.status(201).json({
            message: "Buy cart updated successfully",
            cart
        });

    } catch (error) {
        return res.status(500).json({
            message: "Buy cart edition failed",
            error: error.message
        });
    }
};


export const deleteCart = async(req,res) => {
    try{
        const {uid} = req.params

        const cart = await BuyCart.findByIdAndDelete(uid)

        return res.status(201).json({
            message: "Buy cart deleted successfully"
        })

    }catch(error){
        return res.status(500).json({
            message: "Buy cart deletion failed",
            error: error.message
        })
    }
}
