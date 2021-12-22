"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GUN = require('gun');
require('dotenv').config();
class Journal {
    constructor(name) {
        this.journal_addr = "";
        this.username = "";
        /*
        This assignment operation to peers will need be refactored
          once we have more than one peer. Because you can't format arrays
          in a .env file, you can separate multiple values using space as a
          delimiter. You'll have to parse that though before assigning it to peers.
        */
        this.peers = ["https://morning-taiga-84324.herokuapp.com/gun"];
        this.gun = GUN({ peers: this.peers });
        this.username = name;
        this.journal_addr = this.gun.get('journal');
    }
    static getDate() {
        const current_date = new Date();
        return current_date.toISOString();
    }
    checkUsername() {
        /*
          This will be used to check if the
          name provided through the constructor
          already has an entry in the database.
        */
        this.journal_addr.once((data, _) => {
            if (data.name == this.username) {
                console.log("Your name's on record.");
            }
            else {
                console.log("Name's not on record.");
            }
        });
    }
    insertEntry(message) {
        const date_str = Journal.getDate();
        this.gun.get('journal').get(this.username).put({
            [date_str]: message
        });
    }
    async viewEntries() {
        const user_addr = this.journal_addr.get(this.username);
        let entries = [];
        const grab_address = user_addr.once((data, _) => {
            for (const [key, value] of Object.entries(data)) {
                entries.push(`${key} : ${value} `);
            }
            //The first element is always metadata. Got to pop that using shift()
            entries.shift();
        });
        await grab_address;
        return entries;
    }
    clearEntries() {
        const user_addr = this.journal_addr.get(this.username);
        // This dereferences the entries from their date keys.
        user_addr.once((data, _) => {
            for (const [key, _] of Object.entries(data)) {
                user_addr.get(key).put(null);
            }
        });
        // Can we also completely dereference the entries themselves
        // from the User? 
        // user_addr.put(null) // This won't work. Need to investigate.
    }
}
exports.default = Journal;
