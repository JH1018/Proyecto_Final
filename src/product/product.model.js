import { Schema , model } from "mongoose"

const productSchema = new Schema({
    name:{
        type: String,
        required: [true, "Name is required"]
    },
    description:{
        type: String,
        required: [true, "Description is required"]
    },
    price:{
        type: Number,
        required: [true, "Price is required"]
    },
    stock:{
        type: Number,
        required: [true, "Stock is required]
     },
    description:{
        type: String,
        required: [true, "Description is required"]
    },
    price:{
        type: Number,
        required: [true, "Price is required"]
    },
    stock:{
        type: Number,
        required: [true, "Stock is required"]
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        default: null,
    },
    brand:{
        type: String,
        required: [true, "Brand is required"]
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
