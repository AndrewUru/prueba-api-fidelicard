require("dotenv").config();
const axios = require("axios");

const locale = "en-us";
const baseUrl = `https://reward-loyalty-demo.nowsquare.com/api/${locale}/v1`;
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

async function authenticateAdmin() {
  try {
    const response = await axios.post(`${baseUrl}/admin/login`, null, {
      params: {
        email: email,
        password: password,
      },
    });
    console.log("Authentication successful:", response.data);
    return response.data.token;
  } catch (error) {
    console.error(
      "Error authenticating admin:",
      error.response ? error.response.data : error.message
    );
  }
}

async function getAdminData(token) {
  try {
    const response = await axios.get(`${baseUrl}/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Admin data:", response.data);
  } catch (error) {
    console.error(
      "Error getting admin data:",
      error.response ? error.response.data : error.message
    );
  }
}

async function main() {
  const token = await authenticateAdmin();
  if (token) {
    await getAdminData(token);
  }
}

main();
