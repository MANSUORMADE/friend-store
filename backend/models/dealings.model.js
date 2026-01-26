import mongoose from 'mongoose';
const { Schema } = mongoose;

const DealingsSchema = new Schema({
 title: {
    type: String,
    required: false,
 },
 caption: {
    type: String,
    required: false,
 },
 money: {
    type: Number,
    required: false,
 },
 userPay: {
   username: String,
   userid: String,
 },
 userGet: {
   username: String,
   userid: String,
 },
}, {
    timestamps: true
});
export default mongoose.model("Dealings", DealingsSchema)