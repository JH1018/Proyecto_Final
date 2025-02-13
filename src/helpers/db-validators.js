import User from "../user/user.model.js";
import Product from "../product/product.model.js"
import Category from "../category/category.model.js"

export const emailExist = async(email = "") =>{
    const exist = await User.findOne({email});
    if(exist){
        throw new Error(`The email ${email} is already registered`);
    }

};

export const userNameExist = async(userName = "") =>{
    const exist = await User.findOne({userName});
    if(exist){
        throw new Error(`The userName ${userName} is already registered`);
    }

}

export const uidExist = async(uid = "") =>{
    const exist = await User.findById(uid);
    if(!exist){
        throw new Error("No exixte el ID proporcionado");
    }
};

export const uidMatterExist = async(uid = "") =>{
    const exist = await Matter.findById(uid);
    if(!exist){
        throw new Error("No existe el ID proporcionado");
    };
};

export const productExist = async(uid = " ") =>{
    const exist = await Product.findById(uid);
    if(!exist){
        throw new Error("No existe el ID proporcionado");
    }
}

export const categoryExist = async(uid = "") =>{
    const exist = await Category.findById(uid);
    if(!exist){
        throw new Error("No existe el ID proporcionado");
    }
}