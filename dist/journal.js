"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GUN = require('gun');
class Journal {
    constructor(name) {
        this.username = "";
        this.peers = ["https://morning-taiga-84324.herokuapp.com/gun"];
        this.gun = GUN({ peers: this.peers });
        this.username = name;
        /* Check if node exists, if it does, retrieve it. */
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
        // Inserting Data.
        this.gun.get('journal').once((data, key) => {
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
    viewEntries() {
        let entries = [];
        this.gun.get('journal').get(this.username).once((data, _) => {
            //console.log(data)
            for (const [key, value] of Object.entries(data)) {
                //console.log(value)
                //console.log("BOO!")
                entries.push(`${key} : ${value}`);
            }
            // The first element is always metadata. Got to pop that.
            entries.shift();
            entries.forEach(element => {
                console.log(element);
            });
        });
    }
}
exports.default = Journal;
