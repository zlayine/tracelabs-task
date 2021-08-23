import { Component } from "react";
import axios from "axios";
import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import Transaction from "./Transaction";

fontawesome.library.add(faCircleNotch);

class Transactions extends Component {
	constructor(props) {
		super(props);

		this.state = {
			address: "0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f",
			block: "",
			date: "",
			transactions: [],
			loading: false,
			error: null,
		};
	}

	handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value.toLowerCase(),
			error: null,
		});
	};

	changeBlock = (action) => {
		this.setState({
			...this.state,
			block: this.state.block + action,
		});
	};

	async componentDidMount() {
		await this.loadBlock();
	}

	validateInput = () => {
		if (this.state.address) {
			const adr_rgx = /^0x[a-fA-F0-9]{40}$/i;
			const res = this.state.address.match(adr_rgx);
			if (!res) {
				this.setState({
					...this.state,
					error:
						"Ethereum address is required! It starts with 0x and 40 letters long.",
				});
				return 0;
			}
		} else if (!this.state.address || !this.state.block) {
			this.setState({
				...this.state,
				error: "Address and block are required!",
			});
			return 0;
		}
		return 1;
	};

	getTransactions = async () => {
		if (!this.validateInput()) {
			return;
		}
		this.setState({
			...this.state,
			loading: true,
			error: null,
		});
		let transactions = [];
		try {
			const res = await axios.get(
				process.env.REACT_APP_API +
				`/transactions?address=${this.state.address}&block=${this.state.block}`
			);
			transactions = res.data.transactions;
		} catch (err) {
			this.setState({
				...this.state,
				error: err.response.data.error,
			});
		}
		this.setState({
			...this.state,
			loading: false,
			transactions: transactions,
		});
	};

	async loadBlock() {
		const res = await axios.get(process.env.REACT_APP_API + "/block");
		this.setState({
			...this.state,
			block: res.data.block,
		});
	}

	render() {
		const transactions = this.state.transactions.length ? (
			this.state.transactions.map((t, index) => (
				<Transaction key={index} tx={t} />
			))
		) : this.state.loading ? (
			""
		) : (
			<div className="text-center text-3xl text-white mt-32 transition-all">
				No transactions found in this block range
			</div>
		);

		return (
			<div className="flex flex-col mb-32 w-full">
				<div className=" w-2/4 mt-8 flex-col justify-center mx-auto">
					{this.state.error ? (
						<div className="text-xl text-red-500 text-center font-semibold transition-all">
							{this.state.error}
						</div>
					) : (
						""
					)}

					<div className="flex justify-center gap-3 mt-8">
						<input
							type="text"
							onChange={this.handleChange}
							name="address"
							value={this.state.address}
							className="p-3 rounded-sm w-1/2 outline-none focus:outline-none"
							placeholder="address"
						/>
						<div className="flex w-auto">
							<button
								className="text-3xl rounded-l-sm h-full bg-white px-5 py-1 mr-1 cursor-pointer outline-none focus:outline-none"
								onClick={() => this.changeBlock(-1)}
							>
								-
							</button>
							<input
								type="text"
								className="p-3 outline-none focus:outline-none text-center"
								name="block"
								onChange={this.handleChange}
								value={this.state.block}
							/>
							<button
								className="text-3xl rounded-l-sm h-full bg-white px-5 py-1 ml-1 cursor-pointer"
								onClick={() => this.changeBlock(1)}
							>
								+
							</button>
						</div>
						<button
							onClick={this.getTransactions}
							type="button"
							className="bg-green-500 px-5 py-3 text-white font-bold rounded-sm"
						>
							Search
						</button>
					</div>
				</div>
				<div className="w-full sm:container mx-auto flex flex-col gap-3 mt-10 transition-all">
					<div className="w-full grid grid-cols-7 p-3 mx-auto text-2xl uppercase text-white font-semibold">
						<div className="truncate col-span-2">From:</div>
						<div className="truncate col-span-2">To:</div>
						<div className="truncate ">Block:</div>
						<div className="truncate">ETH Amount:</div>
						<div className="truncate">Date:</div>
					</div>
					{this.state.loading ? (
						<div className="text-5xl mx-auto mt-20 text-white transition-all">
							<FontAwesomeIcon className=" animate-spin" icon="circle-notch" />
						</div>
					) : (
						transactions
					)}
				</div>
			</div>
		);
	}
}

export default Transactions;
