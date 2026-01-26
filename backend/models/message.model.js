import mongoose from 'mongoose';
const { Schema } = mongoose;

const MessageSchema = new Schema({
 about: {
    type: [String],
    required: true,
 },
 mess: {
    type: Array,
    default: [],
 },
 
}, {
    timestamps: true
});
export default mongoose.model("Message", MessageSchema)