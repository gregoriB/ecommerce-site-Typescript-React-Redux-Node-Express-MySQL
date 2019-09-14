import express = require("express");
import path = require("path");
import cors = require("cors");
import { Application, Request, Response } from "express";
import crypto = require("crypto");

const { Client } = require("pg");

require("dotenv").config({ path: __dirname + "/envs/postgres/.env" });

const app: Application = express(),
    nodeEnv = app.get("env"),
    isDevelopment = nodeEnv !== "production",
    corsOptions = {
        origin: "*",
        optionsSuccessStatus: 200
    };

//used alongside Postgres password encryption
const CRYPTO_PASS = process.env.CRYPTO_PASS;
const secret: string = typeof CRYPTO_PASS === "string" ? CRYPTO_PASS : JSON.stringify(CRYPTO_PASS);
const hash = crypto.createHmac("sha256", secret).digest("hex");

app.use(express.static(path.join(__dirname, `client/${isDevelopment ? "public" : "build"}`)));
app.use(cors(corsOptions));
app.use(express.json({ type: "applications/json" }));

interface IReqProps {
    [key: string]: string;
}

app.get("/products", (req: Request, res: Response) => {
    queryDatabase("SELECT * FROM item_categories_view", [], (results: any) => {
        res.json(results);
    });
});

app.get("/products/:search", (req: Request, res: Response) => {
    const { search }: IReqProps = req.params;
    const params = search === "null" ? "" : search;
    queryDatabase(
        `SELECT * FROM item_categories_view WHERE "itemName" like $1`,
        [`%${params}%`],
        (results: any) => {
            res.json(results);
        }
    );
});

app.get("/home", (req: Request, res: Response) => {
    queryDatabase("SELECT * FROM featured_items_view", [], (results: any) => {
        res.json(results);
    });
});

app.post("/login", (req: Request, res: Response) => {
    const { username, password }: IReqProps = req.body;
    if (!username || !password) return;
    if (req.body) {
        const query =
            'SELECT user_name AS "username", user_email AS "email" FROM users WHERE user_name = $1 AND user_password = crypt($2, $3)';
        queryDatabase(query, [username, password, hash], (results: any) => {
            res.json(results);
        });
    }
});

app.post("/user", (req: Request, res: Response) => {
    const { username, email, password }: IReqProps = req.body;
    const values = "($1, $2, crypt($3, $4))";
    queryDatabase(
        `INSERT INTO users (user_email, user_name, user_password) VALUES ${values}`,
        [email, username, password, hash],
        (results: any) => {
            res.json(results);
        }
    );
});

app.put("/user/:email", (req: Request, res: Response) => {
    const { oldEmail, newEmail }: IReqProps = req.body;
    const query = "UPDATE users SET user_email = $1 WHERE user_email = $2";
    queryDatabase(query, [newEmail, oldEmail], (results: any) => {
        res.json(results);
    });
});

app.delete("/user/:email", (req: Request, res: Response) => {
    const email: string = req.params.email;
    if (email) {
        queryDatabase("DELETE FROM users WHERE user_email = $1", [email], (results: any) => {
            res.json(results);
        });
    }
});

const dbCredentials = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

function queryDatabase(query: string, arr: string[], callback: Function) {
    const client = new Client({ ...dbCredentials });
    client.connect();
    client.query(query, arr, (err: any, res: any) => {
        if (err) throw err;
        callback(res);
        client.end();
    });
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
