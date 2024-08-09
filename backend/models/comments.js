const mongoose = require("mongoose");
const { Schema } = mongoose;
const imageLimit = 1;
const textLimit = 500;

const commentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Userauth', required: true },
    text: { type: String, required: true, maxlength: textLimit },
    images: {
        type: [String],
        validate: [arrayLimit, `\${PATH} exceeds the limit of ${imageLimit}`] // Corrected template literal
    },
    likes: [{
        author: { type: Schema.Types.ObjectId, ref: 'Userauth' },
        timestamp: { type: Date, default: Date.now }
    }],
    dislikes: [{
        author: { type: Schema.Types.ObjectId, ref: 'Userauth' },
        timestamp: { type: Date, default: Date.now }
    }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    timestamp: { type: Date, default: Date.now },
    updated: { type: Date } // Corrected field name
});

commentSchema.pre('validate', function (next) {
    if (this.text.length === 0 && this.images.length === 0) { // Corrected length check
        next(new Error('Either text or images are required.'));
    } else {
        next();
    }
});

function arrayLimit(val) {
    return val.length <= imageLimit;
}

module.exports = mongoose.model("Comment", commentSchema);
