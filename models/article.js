const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const ArticleSchema = Schema({
    url: { type: String, required: true, max: 140 },
    user: { type: String, required: true, max: 100 },
    user_id: { type: String, required: true, max: 100 },
    concepts: { type: Array, required: false, default: []},
    timestamp: { type: Date, default: Date.now }
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
