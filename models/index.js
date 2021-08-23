const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const addressSchema = new Schema({
	address: {
		type: String,
		required: true,
	},
	minblock: {
		type: Number,
		required: true,
	},
	maxblock: {
		type: Number,
		required: true,
	},
	transactions: [{
		type: Schema.Types.ObjectId,
		ref: 'Transaction'
	}]
});

const transactionSchema = new Schema({
	hash: {
		type: String,
		required: true,
	},
	from: {
		type: String,
		required: true,
	},
	to: {
		type: String,
		required: true,
	},
	timestamp: {
		type: Number,
		required: true,
	},
	eth: {
		type: Number,
	},
	block: {
		type: Number,
		required: true,
	}
});

exports.Address = mongoose.model("Address", addressSchema);
exports.Transaction = mongoose.model("Transaction", transactionSchema);