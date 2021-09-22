import { Component } from "react";
class Transaction extends Component {

	dateToFormat = (date) => {
		var d = new Date(date * 1000),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear(),
			hours = d.getHours() >= 10 ? d.getHours() : `0${d.getHours()}`,
			minutes = d.getMinutes() >= 10 ? d.getMinutes() : `0${d.getMinutes()}`;

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;
		const str = `${year}-${month}-${day} ${hours}:${minutes}`;
		return str;
	};
	
	render() {
		const t = this.props.tx;
		return (
			<div
				className="w-full grid grid-cols-7 mx-auto bg-white p-3 transition-all"
			>
				<div className="truncate col-span-2 text-sm">{t.from}</div>
				<div className="truncate col-span-2 text-sm">{t.to}</div>
				<div className="truncate text-sm">{t.block}</div>
				<div className="truncate text-sm">{t.eth} ETH</div>
				<div className="text-sm">{this.dateToFormat(t.timestamp)}</div>
			</div>
		)
	}
}

export default Transaction;