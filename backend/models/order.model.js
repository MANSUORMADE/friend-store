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
    required: false,
 },
 numberbay: {
    type: String,
    required: false,
 },
 whoToPay: {
    type: String,
    required: false,
 },
 totalPriceOrder: {
    type: Number,
    required: false,
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
 carts:   {
      type: Object,
      required: true,
 },
}, {
    timestamps: true
});
export default mongoose.model("Order", OrderSchema)