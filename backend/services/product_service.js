const { Product } = require('../models');

class ProductService {
	async getProducts() {
		const products = await Product.findAll();
		if(!products) {
			return productNotExist;
		}
		return {
			meta: {
				message_developer: "OK!",
				status_code: 200
			},
			response: {
				products
			}
		}
	}
}

const productNotExist = {
	meta: {
		message_developer: "Product not found!",
		status_code: 404
	},
	response: null
}

module.exports = new ProductService();