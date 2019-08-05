import { Request, Response, NextFunction } from "express";
import { MysqlError, FieldInfo } from "mysql";

const mysql = require("mysql");
const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config();
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

let shoppingCart = [];
let products: any;

app.post("/", (req: Request, res: Response) => {
    // shoppingCart = req.body.cart;
    // console.log(shoppingCart);
    // res.json(shoppingCart);
    fetchProductData();
    res.json(products);
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

function fetchProductData() {
    var connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });
    connection.connect();
    const query = connection.query(
        "SELECT * FROM items",
        (error: MysqlError, results: any, fields: FieldInfo[]) => {
            if (error) throw error;
            console.log(results);
            products = results;
        }
    );
    connection.end();

    return query;
}
