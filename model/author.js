const mongoose = require("mongoose");
const Book = require("./book");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

authorSchema.pre("findOneAndDelete", async function (next) {
  try {
    const authorId = this.getQuery()._id;
    const books = await Book.find({ author: authorId });
    console.log("Books: ", books);
    if (books.length > 0) {
      next(new Error("This author has books still"));
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Author", authorSchema);
