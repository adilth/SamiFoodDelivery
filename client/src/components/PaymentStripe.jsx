import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardShopping from "./CardShopping";
let publicKey =
  "pk_test_51MJJo0GqWZxJgjcmDRQmZs1luAgFWfJ3izrwMyOPATU3kkOI586T6xnwNo7a5YgPlPJjxxPemDyJn5YEQaqH1oES00d8WFUypv";
const stripePromise = loadStripe(publicKey);
const PaymentStripe = () => (
  <Elements stripe={stripePromise}>
    <CardShopping />
  </Elements>
);

export default PaymentStripe;
