import mongoose from "mongoose";

const { Schema } = mongoose;

const collection = "Carts";

const schema = new Schema({
    products: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
        },
    }]
});

const cartsModel = mongoose.model(collection, schema);
export { cartsModel };