const { Product } = require('../models');

class ProductService {
	async getProducts() {
		const products = await Product.findAll();
		if (!products) {
			return productNotExist;
		}
		return productResponse(products, "Sucessfuly get all products");
	}

	async getProduct(id) {
		const product = await Product.findOne({ where: { id } });

		if (!product) {
			return productNotExist;
		}

		return productResponse(product, "Sucessfully get specific product");
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
			message_developer: "Successfully deleted product",
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
			message_developer: "Successfully added product",
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

const productResponse = (product, message) => {
	return {
		meta: {
			message_developer: message,
			status_code: 400
		},
		response: {
			product
		}
	}
}

module.exports = new ProductService();