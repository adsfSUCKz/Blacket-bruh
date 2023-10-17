await import("dotenv/config");
import crypto from "crypto";

export default async (req, _, next) => {
    req.session = {};

    if (!req.headers.authorization) return next();

    // decode authorization header from .env SESSION_SECRET
    const decoded = crypto.createDecipheriv("aes-256-cbc", process.env.SESSION_SECRET, process.env.SESSION_SECRET);
    console.log(decoded);

    const session = await database.query(`SELECT * FROM sessions WHERE token = ?`, {
        replacements: [req.headers.authorization],
        type: database.QueryTypes.SELECT
    });

    if (session.length == 0) return next();

    req.session = session[0];
}