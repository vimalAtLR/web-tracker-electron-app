const nodeAbi = require('node-abi')

nodeAbi.getAbi('7.2.0', 'node')
console.log('nodeAbi :: ', nodeAbi.getAbi('12.22.12', 'node'));
// '51'
console.log('electronAbi :: ', nodeAbi.getAbi('12.0.0', 'electron'));
// '50'

console.log("ele v :: ", nodeAbi.getTarget('72', 'node') );
console.log("node v :: ", nodeAbi.getTarget('85', 'electron') );
