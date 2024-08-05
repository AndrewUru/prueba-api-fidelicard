require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${req.headers.origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/cancel.html`,
  });

  res.json({ id: session.id });
});

app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const event = req.body;
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const customerEmail = session.customer_details.email;
      await registerMember(customerEmail);

      res.status(200).end();
    }
  }
);

async function registerMember(email) {
  try {
    const response = await axios.post(
      `https://reward-loyalty-demo.nowsquare.com/api/en-us/v1/member/register`,
      null,
      {
        params: {
          email: email,
          name: "New Member",
          password: "password123", // Opcional, puede ser generado automáticamente
          time_zone: "America/New_York",
          locale: "en_US",
          currency: "USD",
          accepts_emails: 1,
          send_mail: 1,
        },
      }
    );
    console.log("Member registered successfully:", response.data);
  } catch (error) {
    console.error(
      "Error registering member:",
      error.response ? error.response.data : error.message
    );
  }
}

app.listen(3000, () => console.log("Server is running on port 3000"));
