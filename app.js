const express = require("express");
const QRCode = require("qrcode");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post("/", (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ message: "Cannot find url" });
  }

  QRCode.toString(url, { type: "terminal" }, (err, qr) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

  QRCode.toFile("./qrcode.png", url, (err) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    res.status(201).json({ message: "QR Code saved" });
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
