import React, { Component } from "react";

import Checkout from "../components/checkout";

class Payment extends Component {
  constructor(props) {
    super();
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <h1>Payment Page</h1>
        <Checkout />
      </div>
    );
  }
}

export default Payment;
