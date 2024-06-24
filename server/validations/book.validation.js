const Joi = require("joi");

const createBook = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    author: Joi.string().required(),
    publisher: Joi.string().required(),
    publicationYear: Joi.number().required(),
    subject: Joi.string().required(),
  }),
};

const getBook = {
  params: Joi.object().keys({
    bookId: Joi.number().required(),
  }),
};

const updateBook = {
  params: Joi.object().keys({
    bookId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      author: Joi.string(),
      publisher: Joi.string(),
      publicationYear: Joi.number(),
      subject: Joi.string(),
    })
    .min(1),
};

const deleteBook = {
  params: Joi.object().keys({
    bookId: Joi.number().required(),
  }),
};

module.exports = {
  createBook,
  getBook,
  updateBook,
  deleteBook,
};
