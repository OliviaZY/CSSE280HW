const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    stars: String,
    review: String,
    author: String,
    when:  Date,
});
const bookSchema = new mongoose.Schema({
    isbn: [mongoose.Schema.Types.Mixed],
    title: String,
    author: [String],
    coverImage: String,
    printType:String,
    pageCount: Number,
    publisher: String,
    publishedDate: Date,
    webReaderLink: String,
    reviews: [reviewSchema]
});

module.exports = mongoose.model('Book', bookSchema);