import { Schema , model } from "mongoose"

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }

});

productSchema.methods.toJSON = function(){
    const { __v, status, _id, ...product } = this.toObject();
    product.uid = _id;
    return product;
};


export default model("Product", productSchema);