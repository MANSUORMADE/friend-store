import mongoose from 'mongoose';
const { Schema } = mongoose;

const DiscountSchema = new Schema({
 code: {
    type: String,
    required: true,
 },
 counter: {
    type: Number,
    default: 0,
 },
 rate: {
    type: Number,
    default: 0.3,
 },
 work: {
    type: Number,
    default: true,
 },
 subscribers: [
   {
      time: String,
      name: String,
      id: String,
      code: String,
   }
 ],
}, {
    timestamps: true
});
export default mongoose.model("Discount", DiscountSchema)