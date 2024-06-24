const catchAsync = require("../utils/catchAsync");
const bookService = require("../services/book.service");
const httpStatus = require("http-status");

const createBook = catchAsync(async (req, res) => {
  const book = await bookService.createBook(req.body);
  res.status(httpStatus.CREATED).send(book);
});

const getBooks = catchAsync(async (req, res) => {
  let page = parseInt(req.query.page) || 1; // get page number from query params or default to 1
  let limit = parseInt(req.query.limit) || 10; // get limit from query params or default to 10
  let searchTerm = req.query.search || "";
  let offset = (page - 1) * limit; // calculate offset

  const books = await bookService.getBooks({
    limit,
    offset,
    search: searchTerm,
  });

  const totalBooks = await bookService.getTotalBooks({ search: searchTerm });
  const totalPages = Math.ceil(totalBooks / limit);

  res.send({ books, totalPages });
});
const getBook = catchAsync(async (req, res) => {
  const book = await bookService.getBookById(req.params.bookId);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }
  res.send(book);
});

const updateBook = catchAsync(async (req, res) => {
  const book = await bookService.updateBookById(req.params.bookId, req.body);
  res.send(book);
});

const deleteBook = catchAsync(async (req, res) => {
  await bookService.deleteBookById(req.params.bookId);
  res
    .status(httpStatus.NO_CONTENT)
    .send({ message: "Book deleted successfully" });
});

module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};
