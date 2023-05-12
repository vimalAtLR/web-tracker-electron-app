const nodeAbi = require('node-abi')

nodeAbi.getAbi('7.2.0', 'node')
console.log('nodeAbi :: ', nodeAbi.getAbi('12.0.0', 'node'));
// '72'
console.log('electronAbi :: ', nodeAbi.getAbi('11.0.0', 'electron'));
// '85'

console.log("node v :: ", nodeAbi.getTarget('72', 'node') );
// 12.0.0
console.log("ele v :: ", nodeAbi.getTarget('87', 'electron') );
// 12.0.0