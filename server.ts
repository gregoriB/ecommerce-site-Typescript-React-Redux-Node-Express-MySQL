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

app.get("/search", (req: Request, res: Response) => {
    queryDatabase(`SELECT * FROM item_categories_view`, (results: mysql.Query) => {
        res.json(results);
    });
});

app.get("/search/:search", (req: Request, res: Response) => {
    const { search } = req.params;
    const params = search === "null" ? "" : search;
    queryDatabase(
        `SELECT * FROM item_categories_view WHERE name LIKE '%${params}%'`,
        (results: mysql.Query) => {
            res.json(results);
        }
    );
});

app.get("/featured", (req: Request, res: Response) => {
    queryDatabase("SELECT * FROM featured_items_view", (results: mysql.Query) => {
        res.json(results);
    });
});

app.get("/login/:username", (req: Request, res: Response) => {
    const username = req.params.username;
    if (username) {
        queryDatabase(
            `SELECT user_name AS 'name', user_email AS 'email' FROM users WHERE user_name='${username}'`,
            (results: mysql.Query) => {
                res.json(results);
            }
        );
    }
});

app.post("/register", (req: Request, res: Response) => {
    // queryDatabase("SELECT * FROM users");
    res.json("register");
});

app.delete("/delete/:email", (req: Request, res: Response) => {
    console.log("delete");
    const email = req.params.email;
    if (email) {
        queryDatabase(`DELETE FROM users WHERE user_email='${email}'`, (results: mysql.Query) => {
            console.log(`user ${email} removed from database`);
            console.log(results);
            res.json(results);
        });
    }
});

const dbCredentials = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

function queryDatabase(query: string, callback: Function) {
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
