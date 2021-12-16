const GUN = require('gun');
const gun = GUN(
  {
    peers: ['https://gunapp-johann.herokuapp.com/gun'],
  })

/*
gun.get('plant').put({
  name: "nepeta cataria"
});
*/

/*
gun.get('person').put({
  age: 23
});
*/

/*
gun.get('plant', res => {
  console.log(res);
});
*/


// Get the paste data.
/*
gun.get('test').on((data, key) => {
  //console.log(key)
  //console.log(data)
  console.log(data.paste);
});
*/

let gun_chat_keys = []

// Get the chat app data. Confirmed that this works.
gun.get('converse/').on((data, _) => {
  console.log(data)
});

/*
gun.get('converse/').on((data, _) => {
  for (const [key, value] of Object.entries(data)) {
    //console.log(`${key} : ${value}`)
    console.log(data)
    // The line below nullifies data, but it creates duplicates
    // of the objects during the process.
    //gun.get('converse/').get(key).put(null)
  }
});
*/
