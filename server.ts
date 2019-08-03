import { Request, Response, NextFunction } from "express";

const express = require("express");
const app = express();
const path = require("path");

const nodeEnv = app.get("env");
const isDevelopment = nodeEnv === "development";

app.use(
    express.static(
        path.join(__dirname, `client/${isDevelopment ? "public" : "build"}`)
    )
);

app.use(express.json({ type: "applications/json" }));

app.use((_: null, res: Response, next: NextFunction) => {
    res.append("Access-Control-Allow-Origin", "*");
    res.append("Access-Control-Allow-Headers", "POST");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    next();
});

let shoppingCart = [0];

app.post("/", (req: Request, res: Response) => {
    shoppingCart = req.body.cart;
    console.log(shoppingCart);
    res.json(shoppingCart);
});

const listener = app.listen(34567, () => {
    console.info("\x1b[33m", `${nodeEnv} server`);
    console.info(
        "\x1b[36m", //cyan font color
        "SERVER LISTENING ON PORT:",
        "\x1b[33m", //yellow font color
        listener.address().port
    );
});
