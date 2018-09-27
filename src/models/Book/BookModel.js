import mongoose, { Schema } from "mongoose";

const BookSchema = new mongoose.Schema({
    title:{
        type: String
    },
    author:{
        type: String
    },
    publisher:{
        type: String
    },
    publishedDate:{
        type: Number
    },
    pageCount: {
        type: Number
    },
    images:{
        type: String
    },
    maturityRating:{
        type: Number
    }
});

const Book = mongoose.model("Book", BookSchema);

export default Book;
