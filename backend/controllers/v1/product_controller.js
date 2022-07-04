const { addProduct } = require('../../services/product_service.js');
const ProductService = require('../../services/product_service.js');
const { errorInternal } = require('../../utils/error_message.js');

module.exports = {
	getProducts: async (req, res) => {
		try {
			const response = await ProductService.getProducts();
			res.json(response);
		} catch (err) {
			return res.send(errorInternal);
		}
	},

	getProduct: async (req, res) => {
		try {
			const { id } = req.params;
			const response = await ProductService.getProduct(id);
			res.json(response);
		} catch (err) {
			return res.send(errorInternal);
		}
	},

	addProduct: async (req, res) => {
		try {
			const body = req.body;
			const response = await ProductService.addProduct(body);
			res.json(response);
		} catch (err) {
			return res.send(errorInternal);
		}
	},

	buyProduct: async (req, res) => {
		try {
			const params = req.params;
			const response = await ProductService.buyProduct(params);
			res.json(response);
		} catch (err) {
			return res.send(errorInternal);
		}
	}
}