const Repository = require('./repository');

class ProdcutsRepository extends Repository {}

module.exports = new ProdcutsRepository('products.json');
