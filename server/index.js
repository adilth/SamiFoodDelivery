const admin = require("firebase-admin");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const serviceAccountKey = require("./serviceAccountKey.json");

const app = express();
app.use(
  express.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
  })
);
// CORS Middleware
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: "https://samifood-29fb5-default-rtdb.firebaseio.com",
});

const productRoute = require("./routes/products");
// const webHooks = require("./routes/webHooks");
app.use("/api/products", productRoute);
// app.use("/api/products", webHooks);

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
