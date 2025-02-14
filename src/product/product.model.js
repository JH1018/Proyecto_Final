import { Schema , model } from "mongoose"

const productSchema = new Schema({
    name:{
        type: String,
        required: [true, "Name is reqired"]
    },
    description:{
        type: String,
        required: [true, "Description is reqired"]
    },
    price:{
        type: Number,
        required: [true, "Price is reqired"]
    },
    stock:{
        type: Number,
        required: [true, "Stock is reqired"]
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        default: null
    },
    brand:{
        type: String,
        required: [true, "Brand is reqired"]
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