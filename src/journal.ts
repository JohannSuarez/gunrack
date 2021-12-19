const GUN = require('gun');

class Journal {
  username: string = "";
  peers: Array<string> = ["https://morning-taiga-84324.herokuapp.com/gun"];

  gun: any = GUN({ peers: this.peers });

  constructor(name: string) {
    this.username = name;
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
    this.gun.get('journal').once((data: any, key: any) => {
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

  viewEntries(): void {

    let entries: Array<string> = [];

    this.gun.get('journal').get(this.username).once((data: any, _: any) => {
      for (const [key, value] of Object.entries(data)) {
        entries.push(`${key} : ${value}`);
      }

      // The first element is always metadata. Got to pop that.
      entries.shift();
      entries.forEach(element => {
        console.log(element)
      })

    });
  }


}

export default Journal;
