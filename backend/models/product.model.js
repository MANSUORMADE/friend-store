import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
 title: {
    type: String,
    required: true,
 },
 img: {
    type: String,
    required: false,
 },
 paragraphs: {
    type: [String],
    required: true,
 },
 items: [
   {
      titleProduce: String,
      sort: String,
      cart: [
         {
            font: Boolean,
            item: String,
            price: Number,
         }
      ],
   }
 ],
}, {
    timestamps: true
});
export default mongoose.model("Product", productSchema)