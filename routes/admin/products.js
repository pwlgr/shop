const express = require('express');
const { validationResult } = require('express-validator');
const multer = require('multer');

const productsRepo = require('../../repositories/products');
const prodcutsNewTemplate = require('../../views/admin/products/new');
const { requirePrice, requireTitle } = require('./validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', (req, res) => {});

router.get('/admin/products/new', (req, res) => {
	res.send(prodcutsNewTemplate({}));
});

router.post('/admin/products/new', upload.single('image'), [ requireTitle, requirePrice ], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.send(prodcutsNewTemplate({ errors }));
	}

	const image = req.file.buffer.toString('base64');
	const { title, price } = req.body;

	await productsRepo.create({ title, price, image });

	res.send('submitted');
});

module.exports = router;
