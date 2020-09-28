import React from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51HTh7RFQWZ4b9rzzeYb5fRY8FhPNy4oz1IBmomq1CqjQGpMDRcBz2e19Po0miaBDjhfnOJ11PJZD1BW8yrCrFfKK00goSQF9Pm"
);

const { createApolloFetch } = require("apollo-fetch");

const fetch = createApolloFetch({
  uri: "http://localhost:4000/graphql"
});

const paymentMutation = `
mutation ($unit_amount: Int!, $quantity: Int!){
  postPayment(unit_amount: $unit_amount, quantity: $quantity){
    id
  }
}
`;

export default function Checkout() {
  const handleClick = async event => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // You can also easily pass variables for dynamic arguments
    fetch({
      query: paymentMutation,
      variables: { unit_amount: 5, quantity: 5 }
    })
      .then(res => {
        console.log(res.data);
        // const session = res.json();
        console.log(res.data.postPayment.id);
        // When the customer clicks on the button, redirect them to Checkout.
        stripe
          .redirectToCheckout({
            sessionId: res.data.postPayment.id
          })
          .then(res => {
            console.log("succesful redirect");
          })
          .catch(err => console.log("Error on stripe redirect: %s", err));
      })
      .catch(err => console.log("Error on checkout API call: %s", err));
  };

  return (
    <button role="link" onClick={handleClick}>
      Checkout
    </button>
  );
}

ReactDOM.render(<Checkout />, document.getElementById("root"));
