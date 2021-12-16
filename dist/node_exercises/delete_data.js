const GUN = require('gun');
const gun = GUN(
  {
    peers: ['https://gunapp-johann.herokuapp.com/gun'],
  })

gun.get('converse/').on((data, _) => {
  for (const [key, value] of Object.entries(data)) {
    //console.log(`${key} : ${value}`)
    console.log(data)
    // The line below nullifies data, but it creates duplicates
    // of the objects during the process.
    gun.get('converse/').get(key).put(null)
  }
});
