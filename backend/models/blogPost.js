const mongoose = require('mongoose');
const user= require("./userModel")

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
     type: mongoose.Schema.Types.Mixed, 
     required: true
     }, 
    
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user'
   },
   banner: { 
    type: String, 
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  draft: {
    type: Boolean,
    default: false, 
  },
  tags:{
    type: [String]
  },
  description:{
    type:String
  },
  activity:{
    totalLikes:{
      type: Number,
      default:0
    } ,
    totalComments:{
        type: Number,
        default:0
    },
    totalReads:{
        type:Number,
        default:0
    },
}
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
