import express = require("express");
import mysql = require("mysql");
import path = require("path");
import cors = require("cors");
import { Application, Request, Response } from "express";

require("dotenv").config();

const app: Application = express(),
    nodeEnv = app.get("env"),
    isDevelopment = nodeEnv !== "production",
    corsOptions = {
        origin: "*",
        optionsSuccessStatus: 200
    };

app.use(
    express.static(
        path.join(__dirname, `client/${isDevelopment ? "public" : "build"}`)
    )
);
app.use(cors(corsOptions));
app.use(express.json({ type: "applications/json" }));

let products: mysql.Query;

app.get("/products", (req: Request, res: Response) => {
    fetchProductData();
    res.json(products);
});

const dbCredentials = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

function fetchProductData() {
    const connection = mysql.createConnection(dbCredentials);
    const query = "SELECT * FROM items";
    connection.query(query, (error: mysql.MysqlError, results: any) => {
        if (error) throw error;
        products = results;
    });
}

const listener: any = app.listen(34567, () => {
    console.info("\x1b[33m", `${nodeEnv} server`);
    console.info(
        "\x1b[36m", //cyan font color
        "SERVER LISTENING ON PORT:",
        "\x1b[33m", //yellow font color
        listener.address().port
    );
});
