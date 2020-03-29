const express = require('express');
const multer = require('multer');

const productsRepo = require('../../repositories/products');
const prodcutsNewTemplate = require('../../views/admin/products/new');
const productsIndexTemplate = require('../../views/admin/products/index');
const productsEditTemplate = require('../../views/admin/products/edit');
const { requirePrice, requireTitle } = require('./validators');
const { handleErrors, requireAuth } = require('./middlewares');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', requireAuth, async (req, res) => {
	const products = await productsRepo.getAll();
	res.send(productsIndexTemplate({ products }));
});

router.get('/admin/products/new', requireAuth, (req, res) => {
	res.send(prodcutsNewTemplate({}));
});

router.post(
	'/admin/products/new',
	requireAuth,
	upload.single('image'),
	[ requireTitle, requirePrice ],
	handleErrors(prodcutsNewTemplate),
	async (req, res) => {
		if (!req.session.userId) {
			return res.redirect('/signin');
		}
		const image = req.file.buffer.toString('base64');
		const { title, price } = req.body;
		await productsRepo.create({ title, price, image });

		res.redirect('/admin/products');
	}
);

router.get('/admin/products/:id/edit', requireAuth, async (req, res) => {
	const product = await productsRepo.getOne(req.params.id);
	if (!product) {
		return res.send('not found.');
	}

	res.send(productsEditTemplate({ product }));
});

router.post('/admin/products/:id/edit', requireAuth, async (req, res) => {});

module.exports = router;
