import mongoose from 'mongoose';
const { Schema } = mongoose;

const NewsSchema = new Schema({
 userid: {
    type: String,
    required: true,
 },
 username: {
    type: String,
    required: true,
 },
 userimg: {
    type: String,
    required: false,
 },
 title: {
    type: String,
    required: true,
 },
 img: {
    type: String,
    required: false,
 },
 placed: {
    type: String,
    required: true,
 },
link: {
   type: [String],
   required: false,
},
caption: {
    type: [{
      id: String,
      name: String,
      iscaption: String,
      img: String,
    }],
    required: false,
 },
}, {
    timestamps: true
});
export default mongoose.model("News", NewsSchema)