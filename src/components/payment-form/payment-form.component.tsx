import { useState, FormEvent } from "react";
import { useSelector } from "react-redux";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";

import { FormContainer, PaymentFormContainer } from "./payment-form.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const ifValidCardElement = (card: StripeCardElement| null ) : card is StripeCardElement => !card===null;

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());
    
    
    const { paymentIntent: { client_secret }} = response;
    
    console.log(client_secret);
    const cardElement = elements.getElement(CardElement);

    if (!ifValidCardElement(cardElement)) return;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: currentUser ? currentUser.displayName : 'Guest',
          },
        },
      }).catch((error) => console.log(error));
    console.log(paymentResult);
    
    if (paymentResult) {
      if (paymentResult.error) {
          alert(paymentResult.error);
      } else {
          if (paymentResult.paymentIntent.status === 'succeeded') {
              alert("payment successful");
          }
      }
    }
    setIsProcessingPayment(false);
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <Button disabled={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}> Pay Now </Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
