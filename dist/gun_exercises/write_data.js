const GUN = require('gun');
const gun = GUN(
  {
    peers: ['https://gunapp-johann.herokuapp.com/gun'],
  }
);

console.log(typeof (gun));
gun.get('plant').put({
  name: "nepeta cataria"
});

gun.get('person').put({
  age: 23
});
