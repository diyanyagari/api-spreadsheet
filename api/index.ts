import express from "express";
import z, { ZodError } from "zod";
import sheets from "./sheetClient";

const app = express();

const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  message: z.string().min(1, { message: "Message is required" }),
});

app.use(express.json());

app.post("/send-message", async (req: any, res: any) => {
    try {
      const body = contactFormSchema.parse(req.body);
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SHEET_ID,
        range: "Sheet1!A2:C",
        insertDataOption: "INSERT_ROWS",
        valueInputOption: "RAW",
        requestBody: {
          values: [
            ["hehe", "hehe", "hehe"],
            ["hehe", "hehe", "hehe"],
          ],
        },
      });
      res.json({ message: "Data added successfully" });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.message });
      } else {
        console.log(error)
        res.status(400).json({ error });
      }
    }
  });

app.get("/", (req: any, res: any) => res.send("Express on Vercel"));

app.listen(4000, () => console.log("Server ready on port 4000."));

module.exports = app;