const express = require("express");
const bookController = require("../../controllers/book.controller");
const validate = require("../../middlewares/validate");
const bookValidation = require("../../validations/book.validation");

const router = express.Router();

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Created book data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
router
  .route("/")
  .post(validate(bookValidation.createBook), bookController.createBook)

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Fetch all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
  .get(bookController.getBooks);

router
  .route("/:bookId")
  .get(validate(bookValidation.getBook), bookController.getBook)
  .put(validate(bookValidation.updateBook), bookController.updateBook)
  .delete(validate(bookValidation.deleteBook), bookController.deleteBook);

module.exports = router;