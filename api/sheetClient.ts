import { google } from "googleapis";

// import key from "../secrets.json" assert { type: "json" };

const client = new google.auth.JWT(process.env.client_email, '', process.env.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

const sheets = google.sheets({ version: 'v4', auth: client})

export default sheets