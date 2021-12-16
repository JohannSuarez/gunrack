const GUN = require('gun');
const gun = GUN(
  {
    peers: ['https://gunapp-johann.herokuapp.com/gun'],
  })

// Get the paste data.
gun.get('test').on((data, key) => {
  //console.log(key)
  //console.log(data)
  console.log(data.paste);
});

// Get the chat app data. Confirmed that this works.
gun.get('converse/').on((data, _) => {
  console.log(data)
});

