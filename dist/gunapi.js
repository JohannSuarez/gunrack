"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const journal_js_1 = __importDefault(require("./journal.js"));
require('dotenv').config();
const app = (0, express_1.default)();
const port_number = process.env.EXPRESSPORT || 44000;
const journal_user = process.env.JOURNALUSER;
const journ = new journal_js_1.default(journal_user);
app.use(express_1.default.json()); // Middleware to parse JSON data
app.use(express_1.default.urlencoded({ extended: true })); // You really need to look this up.
app.get('/gun', (req, res) => {
    let gun_reply = "";
    journ.viewEntries().then(entries => {
        return res.send(entries);
    });
    //return res.send('GUNAPI received a GET HTTP method');
});
app.post('/gun', (req, res) => {
    //console.log(req.body.text);
    journ.insertEntry(req.body.text);
    return res.send("POSTED!");
});
app.listen(port_number, () => {
    console.log(`Example app listening on port ${port_number}!`);
});
