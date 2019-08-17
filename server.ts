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

app.use(express.static(path.join(__dirname, `client/${isDevelopment ? "public" : "build"}`)));
app.use(cors(corsOptions));
app.use(express.json({ type: "applications/json" }));

let products: mysql.Query;

app.get("/search", (req: Request, res: Response) => {
    fetchProductData("SELECT * FROM items");
    res.json(products);
});

app.get("/featured", (req: Request, res: Response) => {
    fetchProductData("SELECT * FROM fi");
    res.json(products);
});

app.post("/login", (req: Request, res: Response) => {
    const name = req.body.name;
    console.log(name);
    name && fetchProductData(`SELECT * FROM users WHERE email LIKE '%${name}%'`);
    // fetchProductData("SELECT * FROM users");
    res.json(products);
});

app.post("/register", (req: Request, res: Response) => {
    fetchProductData("SELECT * FROM users");
    res.json(products);
});

// app.post("/", (req: Request, res: Response) => {

//     res.json(products);
// });

const dbCredentials = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

function fetchProductData(query: string) {
    const connection = mysql.createConnection(dbCredentials);
    connection.query(query, (error: mysql.MysqlError, results: any) => {
        if (error) throw error;
        products = results;
    });
    connection.end();
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
