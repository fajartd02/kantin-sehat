const ProductService = require('../../services/product_service.js');
const { errorInternal } = require('../../utils/error_message.js');

module.exports = {
	getProducts: async(req, res) => {
		try {
			const response = await ProductService.getProducts();
			res.json(response);
		} catch(err) {
			return res.send(errorInternal);
		}
	}

}