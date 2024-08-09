const mongoose = require("mongoose");
const { Schema } = mongoose;
const commentSchema = require('./comments');
const imageLimit = 5;
const textLimit = 1000;
const postSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Userauth', required: true },
    text: { type: String, required: true, maxlength: textLimit }, 
    images: {
        type: [String],
        validate: [arrayLimit, `{PATH} exceeds the limit of ${imageLimit}`] 
    },
    likes: [{
        author: { type: Schema.Types.ObjectId, ref: 'Userauth' },
        timestamp: { type: Date, default: Date.now }
    }],
    dislikes: [{
        author: { type: Schema.Types.ObjectId, ref: 'Userauth' },
        timestamp: { type: Date, default: Date.now }
    }],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment' }],
    timestamp: { type: Date, default: Date.now },
    updated: { type: Date }
});


postSchema.pre('validate', function(next) {
    if (this.text === 0 && this.images.length === 0) {
        next(new Error('Either content or images are required.'));
    } else {
        next();
    }
});


function arrayLimit(val) {
    return val.length <= imageLimit;
}

module.exports = mongoose.model("Post", postSchema);
