import React, { Component } from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useApolloClient } from "@apollo/client";
import { gql } from "@apollo/client";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const mutation = gql`
  mutation postPayment($unit_amount: Int!, $quantity: Int!) {
    postPayment(unit_amount: $unit_amount, quantity: $quantity) {
      id
    }
  }
`;

function Checkout() {
  const client = useApolloClient();

  const handleClick = async () => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    client
      .mutate({
        variables: { unit_amount: 5, quantity: 5 },
        mutation
      })
      .then(res => {
        // When the customer clicks on the button, redirect them to Checkout.
        stripe
          .redirectToCheckout({
            sessionId: res.data.postPayment.id
          })
          .then(res => {
            console.log("Succesful redirect");
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

export default Checkout;
