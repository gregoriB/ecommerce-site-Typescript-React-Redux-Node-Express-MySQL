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

app.post("/search", (req: Request, res: Response) => {
    const body = req.body.query;
    fetchProductData(
        `SELECT * FROM item_categories_view WHERE name LIKE '%${body}%'`,
        (results: mysql.Query) => {
            res.json(results);
        }
    );
});

app.post("/featured", (req: Request, res: Response) => {
    fetchProductData("SELECT * FROM featured_items_view", (results: mysql.Query) => {
        res.json(results);
    });
});

app.post("/login", (req: Request, res: Response) => {
    const name = req.body.name;
    if (name) {
        fetchProductData(
            `SELECT user_email AS 'email' FROM users WHERE user_email LIKE '%${name}%'`,
            (results: mysql.Query) => {
                res.json(results);
            }
        );
    }
});

app.post("/register", (req: Request, res: Response) => {
    // fetchProductData("SELECT * FROM users");
    res.json("register");
});

const dbCredentials = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

function fetchProductData(query: string, callback: Function) {
    const connection = mysql.createConnection(dbCredentials);
    connection.query(query, (error: mysql.MysqlError, results: mysql.Query) => {
        if (error) throw error;
        callback(results);
    });
    connection.end();
}

const listener = app.listen(34567, () => {
    console.info("\x1b[33m", `${nodeEnv} server`);
    console.info(
        "\x1b[36m", //cyan font color
        "SERVER LISTENING:",
        "\x1b[33m", //yellow font color
        listener.address()
    );
});
