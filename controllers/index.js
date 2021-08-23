const models = require('../models');
const web3 = require('../web3');

exports.getTransactions = async (req, res) => {
	try {
		let params = req.query;
		if (!params.address || !params.block)
			return res.status(500).json({ error: "Address and Block are required" });
		await updateTransactions(params);
		const transactions = await models.Transaction.find({ $or: [{ from: params.address.toLowerCase() }, { to: params.address.toLowerCase() }], block: { $gte: params.block } })
		return res.status(200).json({ transactions: transactions });
	} catch (e) {
		console.log(e)
		return res.status(500).json({ error: "Server error" });
	}
}

exports.getBlock = async (req, res) => {
	try {
		const block = await web3.getLatestBlock();
		return res.status(200).json({ block: block });
	} catch (e) {
		console.log(e)
		return res.status(500).json({ error: "Server error" });
	}
}

const updateTransactions = async (params) => {
	const addressExist = await models.Address.findOne({ address: params.address });
	if (!addressExist) {
		const address = await addAddress(params.address, params.block)
		const txs = await web3.getBlocksTransactions(params.address, params.block);
		await addTransactions(txs, address);
		await address.save();
	} else {
		let txs_min = [];
		if (addressExist.minblock > params.block) {
			console.log(addressExist.minblock, params.block)
			txs_min = await web3.getBlocksTransactions(params.address, params.block, addressExist.minblock - 1)
			await addTransactions(txs_min, addressExist);
			addressExist.minblock = params.block;
		}
		let max = addressExist.maxblock + 1;
		addressExist.maxblock = await web3.getLatestBlock();
		let txs_max = await web3.getBlocksTransactions(params.address, max);
		await addTransactions(txs_max, addressExist);
		await addressExist.save();
	}
}

const addAddress = async (address, block) => {
	const maxblock = await web3.getLatestBlock();
	const data = new models.Address({
		maxblock: maxblock,
		minblock: block,
		address: address
	});
	return await data.save();
}

const addTransactions = async (data, address) => {
	let transactions = [];
	data.forEach(async (tx) => {
		const txExist = await models.Transaction.findOne({ hash: tx.hash });
		if (!txExist) {
			const transaction = new models.Transaction({
				hash: tx.hash,
				from: tx.from.toLowerCase(),
				to: tx.to.toLowerCase(),
				timestamp: tx.timestamp,
				eth: tx.value.toString(10),
				block: tx.blockNumber
			});
			const txRes = await transaction.save();
			transactions.push(txRes);
			address.transactions.push(txRes._id);
		}
	})
	return transactions;
}