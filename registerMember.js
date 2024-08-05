require("dotenv").config();
const axios = require("axios");

const locale = "en-us";
const baseUrl = `https://reward-loyalty-demo.nowsquare.com/api/${locale}/v1`;
const memberEmail = "new_member@example.com"; // Reemplaza con el email del nuevo miembro
const memberName = "New Member"; // Reemplaza con el nombre del nuevo miembro
const memberPassword = "password123"; // Opcional, se puede generar automáticamente

async function registerMember() {
  try {
    const response = await axios.post(`${baseUrl}/member/register`, null, {
      params: {
        email: memberEmail,
        name: memberName,
        password: memberPassword, // Opcional
        time_zone: "America/New_York", // Opcional
        locale: "en_US", // Opcional
        currency: "USD", // Opcional
        accepts_emails: 1, // Opcional
        send_mail: 1, // Opcional
      },
    });
    console.log("Member registered successfully:", response.data);
  } catch (error) {
    console.error(
      "Error registering member:",
      error.response ? error.response.data : error.message
    );
  }
}

registerMember();
