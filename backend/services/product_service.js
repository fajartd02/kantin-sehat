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

	async addProduct(body) {
		const {
			student_id,
			product_name,
			product_image,
			description,
			price
		} = body;

		await Product.create({
			student_id,
			product_name,
			product_image,
			description,
			price
		});

		return successfullyAddedProduct(student_id, product_name, product_image, description, price);
	}

	async buyProduct(params) {
		const { id } = params;
		const product = await Product.findOne({ where: { id } });

		if (!product) {
			return productNotExist;
		}

		await Product.destroy({ where: { id } });
		return successfullyDeletedProduct(product);
	}
}

const productNotExist = {
	meta: {
		message_developer: "Product not found!",
		status_code: 404
	},
	response: null
}

const successfullyDeletedProduct = ({ id, product_name, product_image, description, price }) => {
	return {
		meta: {
			message_developer: "Successfully deleted account",
			status_code: 400
		},
		response: {
			id,
			product_name,
			product_image,
			description,
			price
		}
	}
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