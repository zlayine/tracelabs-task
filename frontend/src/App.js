import { Component } from "react";
import Transactions from "./components/Transactions";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="w-full h-full min-h-screen bg-gray-600">
        <div className="w-full mx-auto flex justify-center flex-col">
          <h1 className="text-center text-white text-4xl font-bold mt-20">
            Transaction Crawler
          </h1>
					<Transactions />
        </div>
      </div>
    );
  }
}

export default App;
