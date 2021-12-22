import Journal from './journal.js'
require('dotenv').config()

const journal_user = process.env.JOURNALUSER;
//const journ = new Journal(journal_username);
const journ = new Journal(journal_user);

//console.log(Journal.getDate());
//console.log(journ.checkUsername());
//console.log(journ.insertEntry("You've been locked in here forever and you just can't say goodbye.."));
//console.log(journ.clearEntries());
journ.viewEntries().then(res => { console.log(res) })


