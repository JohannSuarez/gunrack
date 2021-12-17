const GUN = require('gun');

class Journal {
  username: string = "";
  peers: Array<string> = ["https://morning-taiga-84324.herokuapp.com/gun"];

  gun: any = GUN({ peers: this.peers });

  constructor(name: string) {
    this.username = name;

    /* Check if node exists, if it does, retrieve it. */

  }

  static getDate(): string {
    const current_date: Date = new Date();
    return String(current_date);
  }

  checkUsername(): void {
    /*
      This will be used to check if the 
      name provided through the constructor
      already has an entry in the database.
      For now we're testing the method using catnip
      as the entry.
    */
    /*
    INSERTING NEPETA CATARIA.
    console.log(
      this.gun.get('plant').put({
        name: "nepeta cataria"
      })
    )
    */

    // Checking nepeta cataria data
    this.gun.get('plant').on((data: any, key: any) => {
      //console.log(key)
      //console.log(data)
      console.log(data);
    });

  }

}

export default Journal;
