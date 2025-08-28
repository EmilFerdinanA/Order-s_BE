import { PrismaClient } from "@prisma/client";
import express, { type Request, type Response } from "express";
import QRCode from "qrcode";
import path from "path";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.post("/create-table", async (req: Request, res: Response) => {
  const { tableId } = req.body;

  if (!tableId || isNaN(Number(tableId))) {
    return res.status(400).json({ error: "Invalid tableId" });
  }

  const orderUrl = `https://milo.com=${tableId}`;

  // Path untuk simpan QR ke folder Downloads
  const downloadPath = path.join(
    process.env.HOME || ".",
    "Downloads",
    `qr_table_${tableId}.png`
  );

  await QRCode.toFile(downloadPath, orderUrl, { width: 300 });

  console.log(`QR Table ${tableId} berhasil disimpan di: ${downloadPath}`);
  res.json({ success: true });
});

app.get("/", (_, res: Response) => {
  res.send("Hello World! Emil");
});

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
