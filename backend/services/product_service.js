const { Product } = require('../models');

class ProductService {
	async getProducts() {
		const products = await Product.findAll();
		if (!products) {
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

	async addProduct(params) {
		const {
			student_id,
			product_name,
			product_image,
			description,
			price
		} = params;

		await Product.create({
			student_id,
			product_name,
			product_image,
			description,
			price
		});

		return successfullyAddedProduct(student_id, product_name, product_image, description, price);
		
	}
}

const productNotExist = {
	meta: {
		message_developer: "Product not found!",
		status_code: 404
	},
	response: null
}

const successfullyAddedProduct = (student_id, product_name, product_image, description, price) => {
	return {
		meta: {
			message_developer: "Successfully added account",
			status_code: 400
		},
		response: {
			student_id,
			product_name,
			product_image,
			description,
			price
		}
	}
}

module.exports = new ProductService();