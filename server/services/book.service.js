const Book = require("../models/book.model");
const logger = require("../config/logger");
const { Op } = require("sequelize");

const createBook = async (bookBody) => {
  try {
    return Book.create(bookBody);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getBooks = async ({ limit, offset, search }) => {
  return await Book.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          author: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          subject: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
    limit,
    offset,
  });
};

const getTotalBooks = async ({ search }) => {
  return await Book.count({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          author: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          subject: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
  });
};

const getBookById = async (bookId) => {
  try {
    return Book.findOne({ where: { id: bookId } });
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const updateBookById = async (bookId, updateBody) => {
  try {
    const book = await getBookById(bookId);
    if (!book) {
      throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
    }
    Object.assign(book, updateBody);
    await book.save();
    return book;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const deleteBookById = async (bookId) => {
  try {
    const book = await getBookById(bookId);
    if (!book) {
      throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
    }
    await book.destroy();
    return book;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBookById,
  deleteBookById,
  getTotalBooks,
};
