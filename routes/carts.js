const express = require('express');

const router = express.Router();

router.post('/cart/products', async (req, res) => {
	console.log(req.body.productId);
});

module.exports = router;
