// building basic api
//const express = require("express");

import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";



import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";


const app = express();
const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

//app.use(express.json()); // req.body parsing
app.use(express.json({ limit: "50mb" })); // chatgpt
app.use(express.urlencoded({ limit: "50mb", extended: true })); // chatgpt


app.use(cors({ origin: ENV.CLIENT_URL, credentials: true })); // enable CORS for the frontend origin
app.use(cookieParser()); // for parsing cookies

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployment
if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});
}

app.listen(PORT, () => {
     console.log("Server is running on port: " + PORT)
    connectDB();
    });