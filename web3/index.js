const Web3 = require('web3');
require('dotenv').config();

const loadWeb3 = () => {
	return new Web3("https://mainnet.infura.io/v3/" + process.env.INFURA_TOKEN);
}

exports.getBlocksTransactions = async (address, block, max = 0) => {
	let transactions = [];
	const web3 = loadWeb3()
	const maxBlock = !max ? await web3.eth.getBlockNumber() : max;
	for (let i = maxBlock; i >= block; --i) {
		if (process.env.DEBUG)
			console.log("fetching block: ", i)
		try {
			let block = await web3.eth.getBlock(i, true);
			if (block && block.transactions) {
				block.transactions.forEach((e) => {
					e.timestamp = block.timestamp;
					if (
						e.to &&
						(address == e.from.toLowerCase() || address == e.to.toLowerCase())
					)
						transactions.push(e);
				});
			}
		} catch (e) {
			console.error("Error in block ", i, e);
		}
	}
	return transactions;
}

exports.getLatestBlock = async () => {
	const web3 = loadWeb3()
	return await web3.eth.getBlockNumber();
}