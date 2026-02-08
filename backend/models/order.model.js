import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrderSchema = new Schema({

 works: {
    type: Boolean,
    default: true,
 },
 discount: {
    type: Boolean,
    default: false,
 },
 codeDiscount: {
    type: String,
    required: false,
 },
 annul: {
    type: Boolean,
    default: true,
 },
 sortOrder: {
    type: Object,
    default: false,
 },
 theBayMony: {
    type: String,
    required: true,
 },
 numberbay: {
    type: String,
    required: true,
 },
 whoToPay: {
    type: String,
    required: true,
 },
 totalPriceOrder: {
    type: Number,
    required: true,
 },
 account:    {
      type: Object,
      required: true,
 },
 idOrder:    {
      type: String,
      required: true,
 },
 time:    {
      type: Object,
      required: true,
 },
 carts: [
     {
      id: Number,
      item: String,
      price: String,
      sort: String,
      pay: String,
      amount: String,
      title: String,
      skills: Object,
      items: Object,
    } ],
}, {
    timestamps: true
});
export default mongoose.model("Order", OrderSchema)