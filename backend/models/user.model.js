import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
   userid: {
      type: String,
      required: true,
   },
 username: {
    type: String,
    required: true,
 },
 email: {
    type: String,
    required: true,
    unique: true,
 },
 password: {
    type: String,
    required: true,
 },
 img: {
    type: String,
    required: false,
 },
 phone: {
    type: String,
    required: false,
 },
 money: {
    type: Number,
    default: 0,
 },
 admin: {
    type: Boolean,
   default: false
},
 testAdmin: {
    type: Boolean,
   default: false
},
isWorke: {
    type: Boolean,
    default: true
   },
isSeller: {
   type: Boolean,
   default: false
},
message: {
   type: Object,
   default: {message: "ok", falet: true}
},
}, {
    timestamps: true
});
export default mongoose.model("User", UserSchema)