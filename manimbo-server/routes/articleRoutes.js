const express = require('express');
const {
  getArticles,
  getArticleByName,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');

const router = express.Router();

router.route('/').get(getArticles).post(createArticle);
router.get('/name/:name', getArticleByName);
router.route('/:id').put(updateArticle).delete(deleteArticle);

module.exports = router;
