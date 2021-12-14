const GUN = require('gun');

const gun = GUN({ peers: ['https://gunapp-johann.herokuapp.com/gun', 'http://192.53.121.232:8765/gun'] })

/*
let daisuke = gun.get('Daisuke').put({
  name: "El Huervo"
});
*/


gun.get('Daisuke', res => {
  console.log(res);
});
