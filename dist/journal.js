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
        return String(current_date);
    }
    checkUsername() {
        /*
        INSERTING NEPETAR CATARIA.
        console.log(
          this.gun.get('plant').put({
            name: "nepeta cataria"
          })
        )
        */
        this.gun.get('plant').on((data, key) => {
            //console.log(key)
            //console.log(data)
            console.log(data);
        });
    }
}
exports.default = Journal;
