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
app.get('/gun', (req, res) => {
    return res.send('Received a GET HTTP method');
});
