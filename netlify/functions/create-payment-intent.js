require("dotenv").config();

//const stripe = require("stripe")('sk_test_51LIDwNBROydUccJJC3YQwlIhXesMRAWNETJhgmMSdSmLtpTWGwmtbUxr6Zyn1Idx9gIzTJu3zo0yJ1BQZM8T2h040039hud7UW');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    try {
        const { amount } = JSON.parse(event.body);
        console.log(amount);
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'cad',
            payment_method_types: ['card'],
        });

        return {
            statusCode: 200,
            body: JSON.stringify({paymentIntent}),
        }
    } catch (error) {
        console.log(error);
        return {
            statusCode: 400,
            body: JSON.stringify({error}),
        }
    }
}