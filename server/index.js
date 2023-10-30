const admin = require("firebase-admin");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const serviceAccountKey = require("/etc/secrets/serviceAccountKey.json");
// const path = require("path");
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
// app.use(express.static("dist"));
// app.use("/*", (_req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist/index.html"), (err) => {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });
const productRoute = require("./routes/products");
// const webHooks = require("./routes/webHooks");
app.use("/api/products", productRoute);
app.get("/", (req, res) => {
  res.send("hello world it work for you");
});
// app.use("/api/products", webHooks);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});
const PORT = process.env.PORT || 8001;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
