import { Schema , model } from "mongoose"

export const buyCart = new Schema({
    products:[{
        type: Number,
        required: true
    }],
    user:{
        type: Schema.Types.ObjectId,
        required: [true, "The user is required"],
        ref: "User"
    },
    total:{
    type: Number
    },
    status:{
        type: String,
        enum: ["PENDING", "PAYED"],
        default: "PENDING"
    }
})

buyCart.methods.toJSON = function(){
    const { __v, status, _id, ...buyCart } = this.toObject();
    buyCart.uid = _id;
    return buyCart;
};

export default model("BuyCart", buyCart);