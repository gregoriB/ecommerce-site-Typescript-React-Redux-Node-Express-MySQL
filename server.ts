import express = require("express");
import mysql = require("mysql");
import path = require("path");
import cors = require("cors");
import { Application, Request, Response } from "express";
import crypto = require("crypto");

require("dotenv").config();

const app: Application = express(),
    nodeEnv = app.get("env"),
    isDevelopment = nodeEnv !== "production",
    corsOptions = {
        origin: "*",
        optionsSuccessStatus: 200
    };

//used alongside MySQL password encryption
const CRYPTO_PASS = process.env.CRYPTO_PASS;
const secret: string = typeof CRYPTO_PASS === "string" ? CRYPTO_PASS : JSON.stringify(CRYPTO_PASS);
const hash = crypto.createHmac("sha256", secret).digest("hex");

app.use(express.static(path.join(__dirname, `client/${isDevelopment ? "public" : "build"}`)));
app.use(cors(corsOptions));
app.use(express.json({ type: "applications/json" }));

app.get("/products", (req: Request, res: Response) => {
    queryDatabase(`SELECT * FROM item_categories_view`, (results: mysql.Query) => {
        res.json(results);
    });
});

app.get("/products/:search", (req: Request, res: Response) => {
    const { search } = req.params;
    const params = search === "null" ? "" : search;
    queryDatabase(
        `SELECT * FROM item_categories_view WHERE itemName LIKE '%${params}%'`,
        (results: mysql.Query) => {
            res.json(results);
        }
    );
});

app.get("/home", (req: Request, res: Response) => {
    queryDatabase("SELECT * FROM featured_items_view", (results: mysql.Query) => {
        res.json(results);
    });
});

app.post("/login", (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) return;
    if (req.body) {
        const query = `SELECT user_name AS 'username', user_email AS 'email' FROM users WHERE user_name='${username}' AND user_password=AES_ENCRYPT('${hash}', '${password}')`;
        queryDatabase(query, (results: mysql.Query) => {
            res.json(results);
        });
    }
});

app.post("/user", (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const values = `('${email}', '${username}', AES_ENCRYPT('${hash}', '${password}'))`;
    queryDatabase(
        `INSERT INTO users (user_email, user_name, user_password) VALUES ${values}`,
        (results: mysql.Query) => {
            res.json(results);
        }
    );
});

app.put("/user/:email", (req: Request, res: Response) => {
    const { oldEmail, newEmail } = req.body;
    const query = `UPDATE users SET user_email='${newEmail}' WHERE user_email='${oldEmail}'`;
    queryDatabase(query, (results: mysql.Query) => {
        res.json(results);
    });
});

app.delete("/user/:email", (req: Request, res: Response) => {
    const email = req.params.email;
    if (email) {
        queryDatabase(`DELETE FROM users WHERE user_email='${email}'`, (results: mysql.Query) => {
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
