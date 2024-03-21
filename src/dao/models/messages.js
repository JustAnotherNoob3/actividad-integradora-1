import mongoose from "mongoose";

const { Schema } = mongoose;

const collection = "Messages";

const schema = new Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const msgsModel = mongoose.model(collection, schema);
export { msgsModel };