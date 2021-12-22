const GUN = require('gun');

require('dotenv').config()

class Journal {
  journal_addr: any = "";
  username: string = "";

  /* 
  This assignment operation to peers will need be refactored
    once we have more than one peer. Because you can't format arrays
    in a .env file, you can separate multiple values using space as a
    delimiter. You'll have to parse that though before assigning it to peers.
  */
  peers: Array<string> = ["https://morning-taiga-84324.herokuapp.com/gun"];
  gun: any = GUN({ peers: this.peers });

  constructor(name: string) {
    this.username = name;
    this.journal_addr = this.gun.get('journal');
  }

  static getDate(): string {
    const current_date: Date = new Date();
    return current_date.toISOString();
  }

  checkUsername(): void {
    /*
      This will be used to check if the 
      name provided through the constructor
      already has an entry in the database.
    */
    this.journal_addr.once((data: any, _: any) => {
      if (data.name == this.username) {
        console.log("Your name's on record.");
      } else {
        console.log("Name's not on record.");
      }
    });
  }


  insertEntry(message: string): void {
    const date_str: string = Journal.getDate()
    this.gun.get('journal').get(this.username).put({
      [date_str]: message
    });
  }

  async viewEntries(): Promise<any> {
    const user_addr = this.journal_addr.get(this.username)
    let entries: Array<string> = [];

    const grab_address = user_addr.once((data: any, _: any) => {
      for (const [key, value] of Object.entries(data)) {
        entries.push(`${key} : ${value} `);
      }

      //The first element is always metadata. Got to pop that using shift()
      entries.shift();
    });

    await grab_address;
    return entries;

  }

  clearEntries(): void {
    const user_addr = this.journal_addr.get(this.username)
    // This dereferences the entries from their date keys.
    user_addr.once((data: any, _: any) => {
      for (const [key, _] of Object.entries(data)) {
        user_addr.get(key).put(null)
      }
    })
    // Can we also completely dereference the entries themselves
    // from the User? 
    // user_addr.put(null) // This won't work. Need to investigate.
  }
}

export default Journal;
